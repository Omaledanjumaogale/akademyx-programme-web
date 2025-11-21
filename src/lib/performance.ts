// Performance monitoring utilities for enterprise-grade observability

export interface PerformanceMetric {
    name: string
    value: number
    timestamp: number
    metadata?: Record<string, unknown>
}

class PerformanceMonitor {
    private metrics: PerformanceMetric[] = []
    private readonly maxMetrics = 1000 // Prevent memory leaks

    /**
     * Record a custom performance metric
     */
    recordMetric(name: string, value: number, metadata?: Record<string, unknown>) {
        const metric: PerformanceMetric = {
            name,
            value,
            timestamp: Date.now(),
            metadata,
        }

        this.metrics.push(metric)

        // Keep only the most recent metrics
        if (this.metrics.length > this.maxMetrics) {
            this.metrics.shift()
        }

        // Log in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Performance] ${name}:`, value, metadata)
        }

        // TODO: Send to analytics service (e.g., Vercel Analytics, Google Analytics)
        // this.sendToAnalytics(metric)
    }

    /**
     * Measure the execution time of a function
     */
    async measureAsync<T>(
        name: string,
        fn: () => Promise<T>,
        metadata?: Record<string, unknown>
    ): Promise<T> {
        const startTime = performance.now()

        try {
            const result = await fn()
            const duration = performance.now() - startTime

            this.recordMetric(name, duration, {
                ...metadata,
                status: 'success',
            })

            return result
        } catch (error) {
            const duration = performance.now() - startTime

            this.recordMetric(name, duration, {
                ...metadata,
                status: 'error',
                error: error instanceof Error ? error.message : 'Unknown error',
            })

            throw error
        }
    }

    /**
     * Measure the execution time of a synchronous function
     */
    measure<T>(
        name: string,
        fn: () => T,
        metadata?: Record<string, unknown>
    ): T {
        const startTime = performance.now()

        try {
            const result = fn()
            const duration = performance.now() - startTime

            this.recordMetric(name, duration, {
                ...metadata,
                status: 'success',
            })

            return result
        } catch (error) {
            const duration = performance.now() - startTime

            this.recordMetric(name, duration, {
                ...metadata,
                status: 'error',
                error: error instanceof Error ? error.message : 'Unknown error',
            })

            throw error
        }
    }

    /**
     * Get all recorded metrics
     */
    getMetrics(): PerformanceMetric[] {
        return [...this.metrics]
    }

    /**
     * Get metrics by name
     */
    getMetricsByName(name: string): PerformanceMetric[] {
        return this.metrics.filter(m => m.name === name)
    }

    /**
     * Calculate average value for a metric
     */
    getAverageMetric(name: string): number | null {
        const metrics = this.getMetricsByName(name)

        if (metrics.length === 0) return null

        const sum = metrics.reduce((acc, m) => acc + m.value, 0)
        return sum / metrics.length
    }

    /**
     * Clear all metrics
     */
    clear() {
        this.metrics = []
    }

    /**
     * Report Web Vitals (Core Web Vitals)
     */
    reportWebVitals(metric: {
        id: string
        name: string
        value: number
        label: 'web-vital' | 'custom'
    }) {
        this.recordMetric(`web-vital:${metric.name}`, metric.value, {
            id: metric.id,
            label: metric.label,
        })

        // TODO: Send to analytics
        // Example for Vercel Analytics:
        // if (window.va) {
        //   window.va('event', {
        //     name: metric.name,
        //     value: metric.value,
        //   })
        // }
    }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor()

// Helper function to measure API calls
export async function measureApiCall<T>(
    endpoint: string,
    fn: () => Promise<T>
): Promise<T> {
    return performanceMonitor.measureAsync(`api:${endpoint}`, fn, {
        type: 'api-call',
        endpoint,
    })
}

// Helper function to measure component renders
export function measureRender(componentName: string, renderFn: () => void) {
    return performanceMonitor.measure(`render:${componentName}`, renderFn, {
        type: 'component-render',
        component: componentName,
    })
}

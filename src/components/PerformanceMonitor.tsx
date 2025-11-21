'use client'

import { useReportWebVitals } from 'next/web-vitals'
import { performanceMonitor } from '@/lib/performance'

export function PerformanceMonitor() {
    useReportWebVitals((metric) => {
        performanceMonitor.reportWebVitals(metric)
    })

    return null
}

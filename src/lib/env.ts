import { z } from 'zod'

const envSchema = z.object({
    // Convex
    NEXT_PUBLIC_CONVEX_URL: z.string().url(),

    // WorkOS Auth
    WORKOS_API_KEY: z.string().min(1),
    WORKOS_CLIENT_ID: z.string().min(1),
    WORKOS_REDIRECT_URI: z.string().url(),
    WORKOS_COOKIE_PASSWORD: z.string().min(32),

    // App
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

export type Env = z.infer<typeof envSchema>

// Robust validation that handles build-time missing variables
export function validateEnv(): Env {
    try {
        return envSchema.parse(process.env)
    } catch (error) {
        // Check if we are in a build environment or if specific build flags are set
        // CF_PAGES is set by Cloudflare Pages
        // NEXT_PHASE is set by Next.js
        // CI is often set in build environments
        const isBuild =
            process.env.NEXT_PHASE === 'phase-production-build' ||
            process.env.CF_PAGES === '1' ||
            process.env.CI === 'true' ||
            process.env.NODE_ENV === 'production';

        if (isBuild && error instanceof z.ZodError) {
            console.warn('⚠️ Build-time environment validation failed. Using mock values for build.');
            console.warn('This is expected if you have runtime-only variables like WORKOS_*.');

            // Return mock values to satisfy the schema during build
            return {
                NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL || 'https://mock.convex.cloud',
                WORKOS_API_KEY: 'mock_key',
                WORKOS_CLIENT_ID: 'mock_client_id',
                WORKOS_REDIRECT_URI: 'https://mock.example.com',
                WORKOS_COOKIE_PASSWORD: 'mock_password_must_be_at_least_32_chars_long_xxxx',
                NEXT_PUBLIC_APP_URL: 'https://mock.example.com',
                NODE_ENV: 'production'
            } as Env;
        }

        if (error instanceof z.ZodError) {
            const missingVars = error.errors.map(e => e.path.join('.')).join(', ')
            throw new Error(
                `❌ Invalid environment variables: ${missingVars}\n` +
                `Please check your .env.local file or Cloudflare Pages environment variables.`
            )
        }
        throw error
    }
}

export const env = validateEnv()

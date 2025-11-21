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

// Validate environment variables at build time
export function validateEnv(): Env {
    try {
        return envSchema.parse(process.env)
    } catch (error) {
        if (error instanceof z.ZodError) {
            const missingVars = error.errors.map(e => e.path.join('.')).join(', ')
            throw new Error(
                `❌ Invalid environment variables: ${missingVars}\n` +
                `Please check your .env.local file.`
            )
        }
        throw error
    }
}

// Export validated env (only call this in server-side code)
export const env = validateEnv()

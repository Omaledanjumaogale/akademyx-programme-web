import { z } from 'zod'

// Common validation schemas
export const emailSchema = z.string().email('Invalid email address')

export const phoneSchema = z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format')

export const ninSchema = z.string()
    .length(11, 'NIN must be exactly 11 digits')
    .regex(/^[0-9]+$/, 'NIN must contain only numbers')

export const nameSchema = z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')

export const ageSchema = z.number()
    .int('Age must be a whole number')
    .min(16, 'You must be at least 16 years old')
    .max(100, 'Please enter a valid age')

// Application form schema
export const applicationFormSchema = z.object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    age: ageSchema,
    occupation: z.string().min(2, 'Occupation is required'),
    location: z.string().min(2, 'Location is required'),
    ninNumber: ninSchema,
    stateOfResident: z.string().min(2, 'State of resident is required'),
    stateOfOrigin: z.string().min(2, 'State of origin is required'),
    motivation: z.string().min(50, 'Please provide at least 50 characters'),
    experience: z.string().min(20, 'Please provide at least 20 characters'),
    goals: z.string().min(50, 'Please provide at least 50 characters'),
    referralCode: z.string().optional(),
})

export type ApplicationFormData = z.infer<typeof applicationFormSchema>

// Referral partner schema
export const referralPartnerSchema = z.object({
    name: nameSchema,
    type: z.enum(['institution', 'individual']),
    email: emailSchema,
    phone: phoneSchema,
    ninNumber: ninSchema,
    stateOfResident: z.string().min(2),
    stateOfOrigin: z.string().min(2),
    referralCode: z.string().min(6).max(20),
    institutionName: z.string().optional(),
    studentUnionPresident: z.object({
        name: nameSchema,
        email: emailSchema,
        phone: phoneSchema,
    }).optional(),
    bankingDetails: z.object({
        bankName: z.string().min(2),
        accountNumber: z.string().regex(/^[0-9]{10}$/, 'Account number must be 10 digits'),
        accountName: z.string().min(2),
    }),
})

export type ReferralPartnerData = z.infer<typeof referralPartnerSchema>

// Payment form schema
export const paymentFormSchema = z.object({
    amount: z.number().min(1000, 'Minimum amount is 1000'),
    email: emailSchema,
    paymentMethod: z.enum(['card', 'transfer']),
    transactionReference: z.string().optional(), // For bank transfers
})

export type PaymentFormData = z.infer<typeof paymentFormSchema>

// Utility function to safely parse and validate data
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: z.ZodError } {
    const result = schema.safeParse(data)

    if (result.success) {
        return { success: true, data: result.data }
    }

    return { success: false, errors: result.error }
}

// Format validation errors for display
export function formatValidationErrors(error: z.ZodError): Record<string, string> {
    const formatted: Record<string, string> = {}

    error.errors.forEach((err) => {
        const path = err.path.join('.')
        formatted[path] = err.message
    })

    return formatted
}

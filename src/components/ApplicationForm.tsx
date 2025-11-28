'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { applicationFormSchema, type ApplicationFormData } from '@/lib/validation'
import { Loader2, User, Mail, Phone, MapPin, Briefcase, Hash, Calendar, Target, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export function ApplicationForm() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const createApplication = useMutation(api.crud.createApplication)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ApplicationFormData>({
        resolver: zodResolver(applicationFormSchema),
    })

    const onSubmit = async (data: ApplicationFormData) => {
        setIsSubmitting(true)
        setSubmitError(null)
        try {
            const applicationId = await createApplication(data)
            reset()
            router.push(`/checkout?applicationId=${applicationId}`)
        } catch (error) {
            console.error('Error submitting application:', error)
            setSubmitError('Failed to submit application. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-card p-8 rounded-2xl shadow-xl border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground">First Name</label>
                    <Input
                        {...register('firstName')}
                        placeholder="John"
                        icon={<User className="w-4 h-4" />}
                    />
                    {errors.firstName && <p className="text-destructive text-sm">{errors.firstName.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground">Last Name</label>
                    <Input
                        {...register('lastName')}
                        placeholder="Doe"
                        icon={<User className="w-4 h-4" />}
                    />
                    {errors.lastName && <p className="text-destructive text-sm">{errors.lastName.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                    <Input
                        {...register('email')}
                        type="email"
                        placeholder="john@example.com"
                        icon={<Mail className="w-4 h-4" />}
                    />
                    {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground">Phone Number</label>
                    <Input
                        {...register('phone')}
                        placeholder="+234..."
                        icon={<Phone className="w-4 h-4" />}
                    />
                    {errors.phone && <p className="text-destructive text-sm">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="age" className="block text-sm font-medium text-foreground">Age</label>
                    <Input
                        {...register('age', { valueAsNumber: true })}
                        type="number"
                        placeholder="25"
                        icon={<Calendar className="w-4 h-4" />}
                    />
                    {errors.age && <p className="text-destructive text-sm">{errors.age.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="ninNumber" className="block text-sm font-medium text-foreground">NIN Number</label>
                    <Input
                        {...register('ninNumber')}
                        placeholder="11-digit NIN"
                        icon={<Hash className="w-4 h-4" />}
                    />
                    {errors.ninNumber && <p className="text-destructive text-sm">{errors.ninNumber.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="stateOfOrigin" className="block text-sm font-medium text-foreground">State of Origin</label>
                    <Input
                        {...register('stateOfOrigin')}
                        placeholder="Lagos"
                        icon={<MapPin className="w-4 h-4" />}
                    />
                    {errors.stateOfOrigin && <p className="text-destructive text-sm">{errors.stateOfOrigin.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="stateOfResident" className="block text-sm font-medium text-foreground">State of Residence</label>
                    <Input
                        {...register('stateOfResident')}
                        placeholder="Abuja"
                        icon={<MapPin className="w-4 h-4" />}
                    />
                    {errors.stateOfResident && <p className="text-destructive text-sm">{errors.stateOfResident.message}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="occupation" className="block text-sm font-medium text-foreground">Current Occupation</label>
                <Input
                    {...register('occupation')}
                    placeholder="Student, Employed, etc."
                    icon={<Briefcase className="w-4 h-4" />}
                />
                {errors.occupation && <p className="text-destructive text-sm">{errors.occupation.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium text-foreground">Full Address</label>
                <Textarea
                    {...register('location')}
                    rows={2}
                    placeholder="Your residential address"
                    className="resize-none"
                />
                {errors.location && <p className="text-destructive text-sm">{errors.location.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="motivation" className="block text-sm font-medium text-foreground">Motivation</label>
                <Textarea
                    {...register('motivation')}
                    rows={3}
                    placeholder="Why do you want to join this programme?"
                    className="resize-none"
                />
                {errors.motivation && <p className="text-destructive text-sm">{errors.motivation.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="experience" className="block text-sm font-medium text-foreground">Previous Experience</label>
                <Textarea
                    {...register('experience')}
                    rows={3}
                    placeholder="Do you have any prior digital skills experience?"
                    className="resize-none"
                />
                {errors.experience && <p className="text-destructive text-sm">{errors.experience.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="goals" className="block text-sm font-medium text-foreground">Future Goals</label>
                <Textarea
                    {...register('goals')}
                    rows={3}
                    placeholder="What do you hope to achieve after this programme?"
                    className="resize-none"
                />
                {errors.goals && <p className="text-destructive text-sm">{errors.goals.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="referralCode" className="block text-sm font-medium text-foreground">Referral Code (Optional)</label>
                <Input
                    {...register('referralCode')}
                    placeholder="Enter code if you have one"
                    icon={<Target className="w-4 h-4" />}
                />
                {errors.referralCode && <p className="text-destructive text-sm">{errors.referralCode.message}</p>}
            </div>

            {submitError && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                    {submitError}
                </div>
            )}

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    'Submit Application'
                )}
            </Button>
        </form>
    )
}

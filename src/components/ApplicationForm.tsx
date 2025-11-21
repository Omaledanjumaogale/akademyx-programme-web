'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { applicationFormSchema, type ApplicationFormData } from '@/lib/validation'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export function ApplicationForm() {
    const [isMounted, setIsMounted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const createApplication = useMutation(api.crud.createApplication)

    useEffect(() => {
        setIsMounted(true)
    }, [])

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
        try {
            await createApplication(data)
            setSubmitSuccess(true)
            reset()
        } catch (error) {
            console.error('Error submitting application:', error)
            // TODO: Show error toast
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isMounted) {
        return <div className="animate-pulse bg-gray-100 h-96 rounded-lg"></div>
    }

    if (submitSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 p-8 rounded-lg text-center"
            >
                <h3 className="text-2xl font-bold text-green-800 mb-4">Application Received!</h3>
                <p className="text-green-700 mb-6">
                    Thank you for applying to the Akademyx Masterclass Programme. We will review your application and get back to you shortly.
                </p>
                <button
                    onClick={() => setSubmitSuccess(false)}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    Submit Another Application
                </button>
            </motion.div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        {...register('firstName')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="John"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        {...register('lastName')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Doe"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        {...register('email')}
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        {...register('phone')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="+234..."
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                    <input
                        {...register('age', { valueAsNumber: true })}
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="25"
                    />
                    {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="ninNumber" className="block text-sm font-medium text-gray-700">NIN Number</label>
                    <input
                        {...register('ninNumber')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="11-digit NIN"
                    />
                    {errors.ninNumber && <p className="text-red-500 text-sm">{errors.ninNumber.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="stateOfOrigin" className="block text-sm font-medium text-gray-700">State of Origin</label>
                    <input
                        {...register('stateOfOrigin')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Lagos"
                    />
                    {errors.stateOfOrigin && <p className="text-red-500 text-sm">{errors.stateOfOrigin.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="stateOfResident" className="block text-sm font-medium text-gray-700">State of Residence</label>
                    <input
                        {...register('stateOfResident')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Abuja"
                    />
                    {errors.stateOfResident && <p className="text-red-500 text-sm">{errors.stateOfResident.message}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">Current Occupation</label>
                <input
                    {...register('occupation')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Student, Employed, etc."
                />
                {errors.occupation && <p className="text-red-500 text-sm">{errors.occupation.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Full Address</label>
                <textarea
                    {...register('location')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={2}
                    placeholder="Your residential address"
                />
                {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="motivation" className="block text-sm font-medium text-gray-700">Motivation</label>
                <textarea
                    {...register('motivation')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    placeholder="Why do you want to join this programme?"
                />
                {errors.motivation && <p className="text-red-500 text-sm">{errors.motivation.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Previous Experience</label>
                <textarea
                    {...register('experience')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    placeholder="Do you have any prior digital skills experience?"
                />
                {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="goals" className="block text-sm font-medium text-gray-700">Future Goals</label>
                <textarea
                    {...register('goals')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    placeholder="What do you hope to achieve after this programme?"
                />
                {errors.goals && <p className="text-red-500 text-sm">{errors.goals.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700">Referral Code (Optional)</label>
                <input
                    {...register('referralCode')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter code if you have one"
                />
                {errors.referralCode && <p className="text-red-500 text-sm">{errors.referralCode.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    'Submit Application'
                )}
            </button>
        </form>
    )
}

'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { referralPartnerSchema, type ReferralPartnerData } from '@/lib/validation'
import { Loader2, Users, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'

export function ReferralSection() {
    const [isMounted, setIsMounted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const createReferralPartner = useMutation(api.crud.createReferralPartner)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<ReferralPartnerData>({
        resolver: zodResolver(referralPartnerSchema),
        defaultValues: {
            type: 'individual',
        },
    })

    const partnerType = watch('type')

    const onSubmit = async (data: ReferralPartnerData) => {
        setIsSubmitting(true)
        try {
            await createReferralPartner(data)
            setSubmitSuccess(true)
            reset()
        } catch (error) {
            console.error('Error submitting referral partner application:', error)
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
                <h3 className="text-2xl font-bold text-green-800 mb-4">Partner Application Received!</h3>
                <p className="text-green-700 mb-6">
                    Thank you for your interest in becoming a referral partner. We will review your application and contact you shortly.
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
        <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Become a Referral Partner</h2>
                    <p className="text-gray-600">Join our network and earn commissions by referring students to Akademyx.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Partner Type</label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className={`
                flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all
                ${partnerType === 'individual' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-200 hover:border-purple-200'}
              `}>
                                <input
                                    type="radio"
                                    value="individual"
                                    className="sr-only"
                                    {...register('type')}
                                />
                                <Users className="w-5 h-5 mr-2" />
                                Individual
                            </label>

                            <label className={`
                flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all
                ${partnerType === 'institution' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-200 hover:border-purple-200'}
              `}>
                                <input
                                    type="radio"
                                    value="institution"
                                    className="sr-only"
                                    {...register('type')}
                                />
                                <Building2 className="w-5 h-5 mr-2" />
                                Institution
                            </label>
                        </div>
                        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name / Organization Name</label>
                            <input
                                {...register('name')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Enter name"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                {...register('email')}
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="email@example.com"
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

                        <div className="space-y-2">
                            <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700">Desired Referral Code</label>
                            <input
                                {...register('referralCode')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="e.g. JOHN2024"
                            />
                            <p className="text-xs text-gray-500">Create a unique code (6-20 characters)</p>
                            {errors.referralCode && <p className="text-red-500 text-sm">{errors.referralCode.message}</p>}
                        </div>
                    </div>

                    {partnerType === 'institution' && (
                        <div className="border-t pt-6 mt-6">
                            <h3 className="text-lg font-semibold mb-4">Institution Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700">Institution Name</label>
                                    <input
                                        {...register('institutionName')}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="University of Lagos"
                                    />
                                    {errors.institutionName && <p className="text-red-500 text-sm">{errors.institutionName.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="border-t pt-6 mt-6">
                        <h3 className="text-lg font-semibold mb-4">Banking Details (For Commissions)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="bankingDetails.bankName" className="block text-sm font-medium text-gray-700">Bank Name</label>
                                <input
                                    {...register('bankingDetails.bankName')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="GTBank"
                                />
                                {errors.bankingDetails?.bankName && <p className="text-red-500 text-sm">{errors.bankingDetails.bankName.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="bankingDetails.accountNumber" className="block text-sm font-medium text-gray-700">Account Number</label>
                                <input
                                    {...register('bankingDetails.accountNumber')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="0123456789"
                                />
                                {errors.bankingDetails?.accountNumber && <p className="text-red-500 text-sm">{errors.bankingDetails.accountNumber.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="bankingDetails.accountName" className="block text-sm font-medium text-gray-700">Account Name</label>
                                <input
                                    {...register('bankingDetails.accountName')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="John Doe"
                                />
                                {errors.bankingDetails?.accountName && <p className="text-red-500 text-sm">{errors.bankingDetails.accountName.message}</p>}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Submitting Application...
                            </>
                        ) : (
                            'Submit Partner Application'
                        )}
                    </button>
                </form>
            </div>
        </section>
    )
}

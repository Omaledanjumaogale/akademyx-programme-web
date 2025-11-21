'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { referralPartnerSchema, type ReferralPartnerData } from '@/lib/validation'
import { Loader2, Users, Building2, CheckCircle2, User, Mail, Phone, Hash, MapPin, Target, CreditCard } from 'lucide-react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function ReferralSection() {
    const [isMounted, setIsMounted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
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
        setSubmitError(null)
        try {
            await createReferralPartner(data)
            setSubmitSuccess(true)
            reset()
        } catch (error) {
            console.error('Error submitting referral partner application:', error)
            setSubmitError('Failed to submit application. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isMounted) {
        return <div className="animate-pulse bg-muted h-96 rounded-xl"></div>
    }

    if (submitSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50/50 border border-emerald-100 p-12 rounded-2xl text-center max-w-2xl mx-auto"
            >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-3xl font-bold text-emerald-900 mb-4 font-heading">Partner Application Received!</h3>
                <p className="text-emerald-700 mb-8 text-lg">
                    Thank you for your interest in becoming a referral partner. We will review your application and contact you shortly.
                </p>
                <Button
                    onClick={() => setSubmitSuccess(false)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                    Submit Another Application
                </Button>
            </motion.div>
        )
    }

    return (
        <section className="py-20 bg-muted/30">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-6 font-heading">Become a Referral Partner</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Join our network and earn commissions by referring students to Akademyx. We offer competitive rewards for both individuals and institutions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-card p-8 rounded-2xl shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 group">
                        <div className="flex items-center mb-6">
                            <div className="p-4 bg-primary/10 rounded-xl mr-4 group-hover:bg-primary/20 transition-colors">
                                <Users className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground font-heading">Individual Partner</h3>
                        </div>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 mr-3 text-emerald-500 mt-0.5" />
                                <span>Earn <span className="font-bold text-primary">10% commission</span> per successful referral</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 mr-3 text-emerald-500 mt-0.5" />
                                <span>Flexible payout options</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 mr-3 text-emerald-500 mt-0.5" />
                                <span>Access to marketing materials</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-card p-8 rounded-2xl shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 group">
                        <div className="flex items-center mb-6">
                            <div className="p-4 bg-blue-500/10 rounded-xl mr-4 group-hover:bg-blue-500/20 transition-colors">
                                <Building2 className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground font-heading">Institution Partner</h3>
                        </div>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 mr-3 text-emerald-500 mt-0.5" />
                                <span>Earn <span className="font-bold text-primary">15% commission</span> per successful referral</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 mr-3 text-emerald-500 mt-0.5" />
                                <span>Volume bonuses for 50+ students</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 mr-3 text-emerald-500 mt-0.5" />
                                <span>Dedicated account manager</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-card p-10 rounded-2xl shadow-xl border border-border/50 space-y-8">
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-foreground">Partner Type</label>
                        <div className="grid grid-cols-2 gap-6">
                            <label className={`
                flex items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-300
                ${partnerType === 'individual'
                                    ? 'border-primary bg-primary/5 text-primary shadow-md'
                                    : 'border-border hover:border-primary/50 hover:bg-muted/50 text-muted-foreground'}
              `}>
                                <input
                                    type="radio"
                                    value="individual"
                                    className="sr-only"
                                    {...register('type')}
                                />
                                <Users className="w-6 h-6 mr-3" />
                                <span className="font-semibold">Individual</span>
                            </label>

                            <label className={`
                flex items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-300
                ${partnerType === 'institution'
                                    ? 'border-primary bg-primary/5 text-primary shadow-md'
                                    : 'border-border hover:border-primary/50 hover:bg-muted/50 text-muted-foreground'}
              `}>
                                <input
                                    type="radio"
                                    value="institution"
                                    className="sr-only"
                                    {...register('type')}
                                />
                                <Building2 className="w-6 h-6 mr-3" />
                                <span className="font-semibold">Institution</span>
                            </label>
                        </div>
                        {errors.type && <p className="text-destructive text-sm">{errors.type.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-foreground">Full Name / Organization Name</label>
                            <Input
                                {...register('name')}
                                placeholder="Enter name"
                                icon={<User className="w-4 h-4" />}
                            />
                            {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-foreground">Email Address</label>
                            <Input
                                {...register('email')}
                                type="email"
                                placeholder="email@example.com"
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

                        <div className="space-y-2">
                            <label htmlFor="referralCode" className="block text-sm font-medium text-foreground">Desired Referral Code</label>
                            <Input
                                {...register('referralCode')}
                                placeholder="e.g. JOHN2024"
                                icon={<Target className="w-4 h-4" />}
                            />
                            <p className="text-xs text-muted-foreground">Create a unique code (6-20 characters)</p>
                            {errors.referralCode && <p className="text-destructive text-sm">{errors.referralCode.message}</p>}
                        </div>
                    </div>

                    {partnerType === 'institution' && (
                        <div className="border-t border-border/50 pt-8 mt-8 animate-in fade-in slide-in-from-top-4">
                            <h3 className="text-lg font-semibold mb-6 font-heading">Institution Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="institutionName" className="block text-sm font-medium text-foreground">Institution Name</label>
                                    <Input
                                        {...register('institutionName')}
                                        placeholder="University of Lagos"
                                        icon={<Building2 className="w-4 h-4" />}
                                    />
                                    {errors.institutionName && <p className="text-destructive text-sm">{errors.institutionName.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="border-t border-border/50 pt-8 mt-8">
                        <h3 className="text-lg font-semibold mb-6 font-heading">Banking Details (For Commissions)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <label htmlFor="bankingDetails.bankName" className="block text-sm font-medium text-foreground">Bank Name</label>
                                <Input
                                    {...register('bankingDetails.bankName')}
                                    placeholder="GTBank"
                                    icon={<Building2 className="w-4 h-4" />}
                                />
                                {errors.bankingDetails?.bankName && <p className="text-destructive text-sm">{errors.bankingDetails.bankName.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="bankingDetails.accountNumber" className="block text-sm font-medium text-foreground">Account Number</label>
                                <Input
                                    {...register('bankingDetails.accountNumber')}
                                    placeholder="0123456789"
                                    icon={<Hash className="w-4 h-4" />}
                                />
                                {errors.bankingDetails?.accountNumber && <p className="text-destructive text-sm">{errors.bankingDetails.accountNumber.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="bankingDetails.accountName" className="block text-sm font-medium text-foreground">Account Name</label>
                                <Input
                                    {...register('bankingDetails.accountName')}
                                    placeholder="John Doe"
                                    icon={<CreditCard className="w-4 h-4" />}
                                />
                                {errors.bankingDetails?.accountName && <p className="text-destructive text-sm">{errors.bankingDetails.accountName.message}</p>}
                            </div>
                        </div>
                    </div>

                    {submitError && (
                        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm">
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
                                Submitting Application...
                            </>
                        ) : (
                            'Submit Partner Application'
                        )}
                    </Button>
                </form>
            </div>
        </section>
    )
}

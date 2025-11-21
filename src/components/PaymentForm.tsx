'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { paymentFormSchema, type PaymentFormData } from '@/lib/validation'
import { Loader2, CreditCard, Banknote } from 'lucide-react'
import { motion } from 'framer-motion'
import { Id } from '@/convex/_generated/dataModel'

interface PaymentFormProps {
    applicationId: Id<"applications">
    onSuccess?: () => void
}

export function PaymentForm({ applicationId, onSuccess }: PaymentFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const createPayment = useMutation(api.crud.createPayment)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<PaymentFormData>({
        resolver: zodResolver(paymentFormSchema),
        defaultValues: {
            amount: 10000, // Default amount
            paymentMethod: 'card',
        },
    })

    const paymentMethod = watch('paymentMethod')

    const onSubmit = async (data: PaymentFormData) => {
        setIsSubmitting(true)
        try {
            await createPayment({
                applicationId,
                amount: data.amount,
                currency: 'NGN',
                paymentMethod: data.paymentMethod,
            })
            setSubmitSuccess(true)
            reset()
            if (onSuccess) onSuccess()
        } catch (error) {
            console.error('Error submitting payment:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 p-8 rounded-lg text-center"
            >
                <h3 className="text-2xl font-bold text-green-800 mb-4">Payment Initiated!</h3>
                <p className="text-green-700 mb-6">
                    Your payment details have been recorded. Please check your email for further instructions.
                </p>
            </motion.div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">Complete Payment</h2>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <div className="grid grid-cols-2 gap-4">
                    <label className={`
            flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all
            ${paymentMethod === 'card' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-200 hover:border-purple-200'}
          `}>
                        <input
                            type="radio"
                            value="card"
                            className="sr-only"
                            {...register('paymentMethod')}
                        />
                        <CreditCard className="w-5 h-5 mr-2" />
                        Card Payment
                    </label>

                    <label className={`
            flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all
            ${paymentMethod === 'transfer' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-200 hover:border-purple-200'}
          `}>
                        <input
                            type="radio"
                            value="transfer"
                            className="sr-only"
                            {...register('paymentMethod')}
                        />
                        <Banknote className="w-5 h-5 mr-2" />
                        Bank Transfer
                    </label>
                </div>
                {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (NGN)</label>
                <input
                    {...register('amount', { valueAsNumber: true })}
                    type="number"
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                />
                {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
            </div>

            {paymentMethod === 'transfer' && (
                <div className="space-y-2">
                    <label htmlFor="transactionReference" className="block text-sm font-medium text-gray-700">Transaction Reference</label>
                    <input
                        {...register('transactionReference')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter bank transaction ref"
                    />
                    <p className="text-xs text-gray-500">Please make a transfer of NGN 10,000 to [Bank Details] and enter the reference here.</p>
                    {errors.transactionReference && <p className="text-red-500 text-sm">{errors.transactionReference.message}</p>}
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                    </>
                ) : (
                    'Proceed to Pay'
                )}
            </button>
        </form>
    )
}

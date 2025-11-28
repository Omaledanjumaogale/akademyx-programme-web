'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import Script from 'next/script'

interface RemitaPaymentProps {
    amount: number
    email: string
    firstName: string
    lastName: string
    phone: string
    onSuccess: (response: any) => void
    onClose: () => void
}

declare global {
    interface Window {
        RmPaymentEngine: any
    }
}

export function RemitaPayment({
    amount,
    email,
    firstName,
    lastName,
    phone,
    onSuccess,
    onClose
}: RemitaPaymentProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isPaying, setIsPaying] = useState(false)

    const merchantId = process.env.NEXT_PUBLIC_REMITA_MERCHANT_ID
    const serviceTypeId = process.env.NEXT_PUBLIC_REMITA_SERVICE_TYPE_ID
    const apiKey = process.env.NEXT_PUBLIC_REMITA_API_KEY
    const mode = process.env.NEXT_PUBLIC_REMITA_MODE || 'test'

    const scriptUrl = mode === 'live'
        ? 'https://login.remita.net/payment/v1/remita-pay-inline.bundle.js'
        : 'https://remitademo.net/payment/v1/remita-pay-inline.bundle.js'

    const handlePayment = () => {
        if (!window.RmPaymentEngine) {
            console.error('Remita script not loaded')
            return
        }

        setIsPaying(true)

        try {
            const paymentEngine = window.RmPaymentEngine.init({
                key: apiKey, // In inline mode, this is often the public key
                customerId: email,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phone,
                amount: amount,
                narration: 'Akademyx Programme Fee',
                onSuccess: (response: any) => {
                    setIsPaying(false)
                    onSuccess(response)
                },
                onError: (response: any) => {
                    setIsPaying(false)
                    console.error('Remita Error:', response)
                },
                onClose: () => {
                    setIsPaying(false)
                    onClose()
                }
            })
            paymentEngine.showPaymentWidget()
        } catch (error) {
            console.error('Error initializing Remita:', error)
            setIsPaying(false)
        }
    }

    return (
        <>
            <Script
                src={scriptUrl}
                onLoad={() => setIsLoaded(true)}
                strategy="lazyOnload"
            />
            <Button
                onClick={handlePayment}
                disabled={!isLoaded || isPaying}
                className="w-full h-12 bg-[#F47321] hover:bg-[#d66218] text-white font-bold"
            >
                {isPaying ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                    </>
                ) : (
                    'Pay with Remita'
                )}
            </Button>
        </>
    )
}

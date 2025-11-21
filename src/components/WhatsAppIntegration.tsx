'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'

interface WhatsAppIntegrationProps {
    phoneNumber: string
    defaultMessage?: string
    position?: 'bottom-right' | 'bottom-left'
    theme?: 'green' | 'dark'
    businessName?: string
    welcomeMessage?: string
    workingHours?: {
        start: string
        end: string
        timezone: string
    }
}

export default function WhatsAppIntegration({
    phoneNumber,
    defaultMessage = '',
    position = 'bottom-right',
}: WhatsAppIntegrationProps) {
    const handleClick = () => {
        const message = encodeURIComponent(defaultMessage)
        window.open(`https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`, '_blank')
    }

    return (
        <button
            onClick={handleClick}
            className={`
        fixed z-50 p-4 rounded-full shadow-lg transition-transform hover:scale-110
        ${position === 'bottom-right' ? 'bottom-6 right-6' : 'bottom-6 left-6'}
        bg-[#25D366] text-white
      `}
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-8 h-8" />
        </button>
    )
}

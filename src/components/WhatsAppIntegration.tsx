'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

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
        <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            className={`
        fixed z-50 p-4 rounded-full shadow-xl transition-all duration-300
        ${position === 'bottom-right' ? 'bottom-8 right-8' : 'bottom-8 left-8'}
        bg-[#25D366] text-white hover:shadow-2xl hover:shadow-green-500/30
      `}
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
        </motion.button>
    )
}

import { ConvexClientProvider } from "@/components/ConvexClientProvider"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { PerformanceMonitor } from "@/components/PerformanceMonitor"
import { Manrope, Plus_Jakarta_Sans } from 'next/font/google'
import "./globals.css"

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Akademyx Masterclass Programme',
  description: 'A 21-day intensive digital skills accelerator designed to empower African youths with futuristic career paths, multiple income streams, and real-world digital entrepreneurship.',
  manifest: '/manifest.json',
  themeColor: '#8B5CF6',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Akademyx',
  },
  openGraph: {
    title: 'Akademyx Masterclass Programme',
    description: 'Empowering African youths with digital skills.',
    url: 'https://akademyx.com',
    siteName: 'Akademyx',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akademyx Masterclass Programme',
    description: 'Empowering African youths with digital skills.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased selection:bg-primary selection:text-primary-foreground pb-16 lg:pb-0">
        <AuthProvider>
          <ConvexClientProvider>
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
            <PerformanceMonitor />
          </ConvexClientProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

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
      <body className="min-h-screen bg-background font-sans antialiased selection:bg-primary selection:text-primary-foreground">
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

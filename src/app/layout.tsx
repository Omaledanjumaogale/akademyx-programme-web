import { ConvexClientProvider } from "@/components/ConvexClientProvider"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { PerformanceMonitor } from "@/components/PerformanceMonitor"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-purple-50 via.white to-indigo-50">
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

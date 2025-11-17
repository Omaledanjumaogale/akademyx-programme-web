import { ConvexClientProvider } from "@/components/ConvexClientProvider"
import { AuthProvider } from "@/components/auth/AuthProvider"
import "./globals.css"

export const metadata = {
  title: 'Akademyx Masterclass Programme - Transform Your Digital Future',
  description: 'A 21-day intensive digital skills accelerator designed to empower African youths with futuristic career paths, multiple income streams and real-world digital entrepreneurship.',
  icons: {
    icon: '/favicon.svg',
  },
}

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
        <ConvexClientProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}

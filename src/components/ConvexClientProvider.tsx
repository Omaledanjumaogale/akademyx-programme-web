"use client"
import { ReactNode, useMemo } from "react"
import { ConvexReactClient, ConvexProviderWithAuth } from "convex/react"
import { useAuth } from "./auth/AuthProvider"

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convex = useMemo(() => new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string), [])
  const { isAuthenticated, isLoading, fetchAccessToken } = useAuth()

  return (
    <ConvexProviderWithAuth
      client={convex}
      useAuth={() => ({
        isLoading,
        isAuthenticated,
        fetchAccessToken,
      })}
    >
      {children}
    </ConvexProviderWithAuth>
  )
}

"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogIn, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/AuthProvider"

export default function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isLoading, isAuthenticated, login, logout } = useAuth()
  const router = useRouter()

  const handleLogin = (type: 'user' | 'admin') => {
    if (type === 'admin') {
      router.push('/dashboard/admin')
    } else {
      login()
    }
  }

  const handleSignup = () => {
    router.push('/application')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg font-heading">A</span>
            </div>
            <span className="text-2xl font-bold text-foreground font-heading tracking-tight">Akademyx</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Courses', 'Certifications', 'Refer & Earn', 'Contact'].map((item) => (
              <Link
                key={item}
                href={item === 'Refer & Earn' ? '/referral' : `/${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-primary font-medium transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Login Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoading ? (
              <div className="text-muted-foreground animate-pulse">Loading...</div>
            ) : isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                  Dashboard
                </Link>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="border-primary/20 text-primary hover:bg-primary/5 hover:text-primary hover:border-primary/50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => handleLogin('user')}
                  className="text-muted-foreground hover:text-primary hover:bg-primary/5"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button
                  onClick={handleSignup}
                  className="shadow-lg shadow-primary/25 hover:shadow-primary/40"
                >
                  Sign Up
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleLogin('admin')}
                  className="text-muted-foreground hover:text-primary hover:bg-primary/5"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-primary hover:bg-primary/5"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-6 bg-background/95 backdrop-blur-xl absolute left-0 right-0 px-4 shadow-2xl animate-in slide-in-from-top-5">
            <nav className="flex flex-col space-y-4 mb-8">
              {['Courses', 'Certifications', 'Refer & Earn', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Refer & Earn' ? '/referral' : `/${item.toLowerCase()}`}
                  className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col space-y-4">
              {isLoading ? (
                <div className="text-muted-foreground text-center">Loading...</div>
              ) : isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-center text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    className="w-full border-primary/20 text-primary"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLogin('user')
                      setIsMenuOpen(false)
                    }}
                    className="w-full border-primary/20 text-primary hover:bg-primary/5"
                  >
                    <User className="w-4 h-4 mr-2" />
                    User Login
                  </Button>
                  <Button
                    onClick={() => {
                      handleSignup()
                      setIsMenuOpen(false)
                    }}
                    className="w-full shadow-lg shadow-primary/25"
                  >
                    Sign Up
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogin('admin')
                      setIsMenuOpen(false)
                    }}
                    className="w-full text-muted-foreground hover:text-primary"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Admin Login
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
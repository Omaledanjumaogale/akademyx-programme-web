"use client"

import React, { createContext, useContext, useId, useState } from "react"

type TabsContextValue = {
  value: string
  setValue: (v: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string
  value?: string
  onValueChange?: (v: string) => void
}

export function Tabs({ defaultValue, value, onValueChange, className = "", children, ...props }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue)
  const current = value ?? internal
  const setValue = (v: string) => {
    if (onValueChange) onValueChange(v)
    else setInternal(v)
  }
  return (
    <TabsContext.Provider value={{ value: current, setValue }}>
      <div className={className} {...props}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`} {...props}>{children}</div>
  )
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export function TabsTrigger({ value, className = "", children, ...props }: TabsTriggerProps) {
  const ctx = useContext(TabsContext)
  if (!ctx) return null
  const active = ctx.value === value
  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={`px-3 py-2 rounded-lg border ${active ? "bg-purple-600 text-white border-purple-600" : "bg-white text-gray-800 border-gray-300"} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export function TabsContent({ value, className = "", children, ...props }: TabsContentProps) {
  const ctx = useContext(TabsContext)
  if (!ctx) return null
  if (ctx.value !== value) return null
  return (
    <div className={className} {...props}>{children}</div>
  )
}

export default Tabs

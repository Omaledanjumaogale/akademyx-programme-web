"use client"

import React from "react"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
}

export function Progress({ value = 0, className = "", ...props }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`} {...props}>
      <div
        className="h-2 bg-purple-600 transition-all"
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}

export default Progress

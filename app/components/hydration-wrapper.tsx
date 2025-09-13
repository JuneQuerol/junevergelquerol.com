'use client'

import { useEffect, useState } from 'react'

interface HydrationWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function HydrationWrapper({
  children,
  fallback = null
}: HydrationWrapperProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Mark as hydrated after component mounts
    setIsHydrated(true)

    // Add hydrated class to html element
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('hydrated')
    }
  }, [])

  // Show fallback or nothing until hydration is complete
  if (!isHydrated) {
    return fallback || (
      <div className="loading-skeleton h-screen w-full">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
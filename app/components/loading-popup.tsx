'use client'

import { useEffect, useState } from 'react'

export default function LoadingPopup() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 100)

    // Check if page is ready
    const checkReady = () => {
      try {
        // Check if CSS is loaded by testing a Tailwind class
        const testElement = document.createElement('div')
        testElement.className = 'hidden'
        document.body.appendChild(testElement)
        const computed = window.getComputedStyle(testElement)
        const isHidden = computed.display === 'none'
        document.body.removeChild(testElement)

        if (isHidden && document.readyState === 'complete') {
          setLoadingProgress(100)
          setTimeout(() => {
            setIsLoading(false)
          }, 300)
          return true
        }
      } catch (e) {
        // If there's any error, just hide the loader
        setIsLoading(false)
        return true
      }
      return false
    }

    // Initial check
    if (checkReady()) {
      clearInterval(progressInterval)
      return
    }

    // Set up listeners
    const handleLoad = () => {
      if (checkReady()) {
        clearInterval(progressInterval)
      }
    }

    window.addEventListener('load', handleLoad)
    document.addEventListener('DOMContentLoaded', handleLoad)

    // Fallback timeout
    const timeout = setTimeout(() => {
      setLoadingProgress(100)
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }, 3000)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timeout)
      window.removeEventListener('load', handleLoad)
      document.removeEventListener('DOMContentLoaded', handleLoad)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-md"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-2xl max-w-md w-[90%]">
        <div className="text-center">
          {/* Logo/Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              June Vergel Querol
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Loading Portfolio...
            </p>
          </div>

          {/* Loading Animation */}
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"
                style={{ animationDuration: '1.5s' }}
              />
              <div
                className="absolute inset-0 border-4 border-transparent border-r-purple-500 rounded-full animate-spin"
                style={{ animationDuration: '1.8s' }}
              />
              <div
                className="absolute inset-0 border-4 border-transparent border-b-green-500 rounded-full animate-spin"
                style={{ animationDuration: '2.1s' }}
              />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {loadingProgress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
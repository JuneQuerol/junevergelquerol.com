'use client'

import { useEffect, useState } from 'react'

export default function SimpleLoader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Hide loader after a short delay
    const timer = setTimeout(() => {
      setShow(false)
    }, 1500)

    // Also hide when page is fully loaded
    const handleLoad = () => {
      setShow(false)
    }

    if (document.readyState === 'complete') {
      setShow(false)
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Loading...</h2>
      </div>
    </div>
  )
}
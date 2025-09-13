'use client'

import { useEffect } from 'react'

export default function CSSLoader() {
  useEffect(() => {
    // Mark as hydrated once mounted
    document.documentElement.classList.add('hydrated')

    // Force a style recalculation to ensure CSS is applied
    const forceStyleRecalc = () => {
      const dummy = document.body.offsetHeight
      return dummy
    }

    // Give CSS time to load, then force recalculation
    requestAnimationFrame(() => {
      forceStyleRecalc()
    })
  }, [])

  return null
}
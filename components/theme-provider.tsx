'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      enableSystem
      disableTransitionOnChange
      storageKey="theme"
      defaultTheme="system"
      // Prevent hydration mismatch by forcing mount
      suppressHydrationWarning
    >
      {children}
    </NextThemesProvider>
  )
}

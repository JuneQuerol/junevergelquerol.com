import type React from "react"

export default function UtilitiesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
    </>
  )
}
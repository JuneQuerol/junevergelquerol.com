'use client'

import { useEffect } from 'react'

interface AdBannerProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
  className?: string
}

export default function AdBanner({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  style = { display: 'block' },
  className = ''
}: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-4225764258903216"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      ></ins>
    </div>
  )
}
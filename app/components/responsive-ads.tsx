import AdBanner from './ad-banner'

// Header/Top Banner Ad (728x90 on desktop, responsive on mobile)
export function HeaderAd() {
  return (
    <div className="w-full flex justify-center py-4 border-b border-gray-200 dark:border-gray-800">
      <AdBanner
        adSlot="1234567890" // Replace with your actual ad slot ID
        adFormat="auto"
        className="max-w-full"
        style={{ 
          display: 'block',
          width: '100%',
          maxWidth: '728px',
          height: '90px'
        }}
      />
    </div>
  )
}

// Sidebar Ad (300x250 rectangle)
export function SidebarAd() {
  return (
    <div className="w-full max-w-xs mx-auto mb-6">
      <div className="text-xs text-gray-500 text-center mb-2">Advertisement</div>
      <AdBanner
        adSlot="0987654321" // Replace with your actual ad slot ID
        adFormat="rectangle"
        style={{ 
          display: 'block',
          width: '300px',
          height: '250px'
        }}
      />
    </div>
  )
}

// In-Content Ad (responsive)
export function InContentAd() {
  return (
    <div className="w-full flex justify-center py-6 my-8">
      <div className="text-center">
        <div className="text-xs text-gray-500 mb-2">Advertisement</div>
        <AdBanner
          adSlot="1122334455" // Replace with your actual ad slot ID
          adFormat="auto"
          style={{ 
            display: 'block',
            width: '100%',
            maxWidth: '468px',
            height: '60px'
          }}
        />
      </div>
    </div>
  )
}

// Footer Ad (responsive banner)
export function FooterAd() {
  return (
    <div className="w-full flex justify-center py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="text-xs text-gray-500 mb-2">Advertisement</div>
        <AdBanner
          adSlot="5566778899" // Replace with your actual ad slot ID
          adFormat="auto"
          style={{ 
            display: 'block',
            width: '100%',
            maxWidth: '728px',
            height: '90px'
          }}
        />
      </div>
    </div>
  )
}

// Mobile-specific Ad (320x50)
export function MobileAd() {
  return (
    <div className="block md:hidden w-full flex justify-center py-2">
      <AdBanner
        adSlot="6677889900" // Replace with your actual ad slot ID
        adFormat="auto"
        style={{ 
          display: 'block',
          width: '320px',
          height: '50px'
        }}
      />
    </div>
  )
}
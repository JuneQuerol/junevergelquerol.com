import type { Metadata } from "next"
import { ColorPicker } from "../../components/color-picker"

export const metadata: Metadata = {
  title: "Color Picker - June Vergel Querol",
  description: "Free online color picker - Get color values in HEX, RGB, HSL formats",
}

export default function ColorPickerPage() {
  return (
    <main>
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-5 py-4">
          <div className="flex justify-between items-center">
            <a href="/" className="font-semibold text-lg hover:text-blue-600 transition-colors">
              June Vergel Querol
            </a>
            <div className="flex gap-3">
              <a 
                href="/utilities" 
                className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
              >
                ← Back to Utilities
              </a>
              <a 
                href="/journal" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                📝 Daily Journal
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-4">
            Color Picker
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pick colors and get their values in multiple formats: HEX, RGB, HSL, CSS, and Tailwind CSS.
          </p>
        </div>

        {/* Color Picker Component */}
        <ColorPicker />
      </div>
    </main>
  )
}
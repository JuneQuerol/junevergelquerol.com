import type { Metadata } from "next"
import StructuredData from "../components/structured-data"

export const metadata: Metadata = {
  title: "Free Online Utilities & Tools - June Vergel Querol | Web Development & Productivity Tools",
  description: "Comprehensive collection of 22 free online utilities and tools including Text Diff Checker, Markdown to HTML Converter, Website Tester, QR Generator, Password Generator, JSON Formatter, Base64 Converter, Picture Format Converter, and Educational Calculators. Perfect for developers, students, and professionals.",
  keywords: "free online tools, web utilities, text diff checker, markdown to html, markdown converter, text comparison, QR code generator, password generator, JSON formatter, Base64 converter, picture format converter, image converter, text tools, developer tools, productivity tools, educational tools, grade calculator, study timer, citation generator, media tools",
  openGraph: {
    title: "Free Online Utilities & Tools - Web Development & Productivity",
    description: "22 free online utilities including Text Diff Checker, Markdown to HTML Converter, Website Tester, QR Generator, JSON Formatter, Password Generator, Picture Format Converter, and Educational Calculators for developers and professionals.",
    images: ["/professional-id.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Utilities & Tools - Web Development & Productivity",
    description: "22 free online utilities including Text Diff Checker, Markdown to HTML Converter, Website Tester, QR Generator, JSON Formatter, Password Generator, Picture Format Converter, and Educational Calculators for developers and professionals."
  },
}

export default function UtilitiesPage() {
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
                href="/journal" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                📝 Daily Journal
              </a>
              <a 
                href="/utilities" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                🛠️ Utilities
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-4">
            🛠️ Utilities
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of useful tools and utilities for daily work, productivity, and development tasks.
          </p>
        </div>

        {/* Utilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Code Tools Section */}
          <div className="p-6 rounded-lg border bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold">Code Tools</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Development utilities and code-related tools for programming tasks.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• <a href="/utilities/base64-converter" className="text-blue-600 dark:text-blue-400 hover:underline">Base64 Encoder/Decoder</a></li>
              <li>• <a href="/utilities/json-formatter" className="text-blue-600 dark:text-blue-400 hover:underline">JSON Formatter</a></li>
              <li>• <a href="/utilities/url-encoder" className="text-blue-600 dark:text-blue-400 hover:underline">URL Encoder/Decoder</a></li>
              <li>• <a href="/utilities/hash-generator" className="text-blue-600 dark:text-blue-400 hover:underline">Hash Generator (MD5, SHA)</a></li>
            </ul>
          </div>

          {/* Text Processing */}
          <div className="p-6 rounded-lg border bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center">
                <span className="text-white text-xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold">Text Processing</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Text manipulation and processing utilities.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• <a href="/utilities/text-diff-checker" className="text-blue-600 dark:text-blue-400 hover:underline">Text Diff Checker</a></li>
              <li>• <a href="/utilities/md-to-html" className="text-blue-600 dark:text-blue-400 hover:underline">Markdown to HTML Converter</a></li>
              <li>• <a href="/utilities/word-counter" className="text-blue-600 dark:text-blue-400 hover:underline">Word Counter</a></li>
              <li>• <a href="/utilities/case-converter" className="text-blue-600 dark:text-blue-400 hover:underline">Case Converter</a></li>
              <li>• <a href="/utilities/text-cleaner" className="text-blue-600 dark:text-blue-400 hover:underline">Text Cleaner</a></li>
              <li>• <a href="/utilities/lorem-generator" className="text-blue-600 dark:text-blue-400 hover:underline">Lorem Ipsum Generator</a></li>
            </ul>
          </div>


          {/* Productivity Tools */}
          <div className="p-6 rounded-lg border bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-orange-600 flex items-center justify-center">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold">Productivity</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Tools to boost productivity and efficiency.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• <a href="/utilities/qr-generator" className="text-blue-600 dark:text-blue-400 hover:underline">QR Code Generator</a></li>
              <li>• <a href="/utilities/color-picker" className="text-blue-600 dark:text-blue-400 hover:underline">Color Picker</a></li>
              <li>• <a href="/utilities/password-generator" className="text-blue-600 dark:text-blue-400 hover:underline">Password Generator</a></li>
              <li>• <a href="/utilities/unit-converter" className="text-blue-600 dark:text-blue-400 hover:underline">Unit Converter</a></li>
            </ul>
          </div>


          {/* Educational Tools */}
          <div className="p-6 rounded-lg border bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white text-xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold">Educational</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Tools for educational and academic purposes.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• <a href="/utilities/grade-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">Grade Calculator</a></li>
              <li>• <a href="/utilities/study-timer" className="text-blue-600 dark:text-blue-400 hover:underline">Study Timer</a></li>
              <li>• <a href="/utilities/research-helper" className="text-blue-600 dark:text-blue-400 hover:underline">Research Helper</a></li>
              <li>• <a href="/utilities/citation-generator" className="text-blue-600 dark:text-blue-400 hover:underline">Citation Generator</a></li>
            </ul>
          </div>

          {/* Media & Graphics Tools */}
          <div className="p-6 rounded-lg border bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-rose-600 flex items-center justify-center">
                <span className="text-white text-xl">🖼️</span>
              </div>
              <h3 className="text-xl font-semibold">Media & Graphics</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Image processing and media conversion tools.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• <a href="/utilities/image-converter" className="text-blue-600 dark:text-blue-400 hover:underline">Picture Format Converter</a></li>
              <li>• <a href="/utilities/image-resizer" className="text-blue-600 dark:text-blue-400 hover:underline">Image Resizer</a></li>
              <li>• <a href="/utilities/image-compressor" className="text-blue-600 dark:text-blue-400 hover:underline">Image Compressor</a></li>
            </ul>
          </div>
        </div>

      </div>
      
      <StructuredData 
        type="software" 
        data={{
          name: "Free Online Utilities Collection",
          description: "Comprehensive collection of 22 free online utilities and tools for web development, text processing, productivity, education, and media processing",
          url: "https://junevergelquerol.com/utilities",
          screenshot: "https://junevergelquerol.com/professional-id.png",
          featureList: [
            "Text Diff Checker",
            "Markdown to HTML Converter",
            "QR Code Generator",
            "Password Generator", 
            "JSON Formatter",
            "Base64 Converter",
            "Text Processing Tools",
            "Hash Generator",
            "Unit Converter",
            "Grade Calculator",
            "Study Timer",
            "Citation Generator",
            "Picture Format Converter",
            "Image Resizer",
            "Image Compressor"
          ]
        }}
      />
    </main>
  )
}
import type { Metadata } from "next"
import { PasswordGenerator } from "../../components/password-generator"

export const metadata: Metadata = {
  title: "Password Generator - June Vergel Querol",
  description: "Free secure password generator - Create strong passwords with customizable options",
}

export default function PasswordGeneratorPage() {
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
            Password Generator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate secure, cryptographically strong passwords with customizable options for maximum security.
          </p>
        </div>

        {/* Password Generator Component */}
        <PasswordGenerator />
      </div>
    </main>
  )
}
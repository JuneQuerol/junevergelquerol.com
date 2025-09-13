'use client'

import { useState } from 'react'

export default function JsonFormatterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indentSize, setIndentSize] = useState(2)

  const formatJson = () => {
    try {
      setError('')
      if (!input.trim()) {
        setError('Please enter JSON to format')
        return
      }

      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, indentSize)
      setOutput(formatted)
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message)
      setOutput('')
    }
  }

  const minifyJson = () => {
    try {
      setError('')
      if (!input.trim()) {
        setError('Please enter JSON to minify')
        return
      }

      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message)
      setOutput('')
    }
  }

  const validateJson = () => {
    try {
      setError('')
      if (!input.trim()) {
        setError('Please enter JSON to validate')
        return
      }

      JSON.parse(input)
      setError('')
      setOutput('✅ Valid JSON')
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message)
      setOutput('')
    }
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const sampleJson = () => {
    const sample = {
      "name": "John Doe",
      "age": 30,
      "email": "john@example.com",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "zipcode": "10001"
      },
      "hobbies": ["reading", "swimming", "coding"],
      "isActive": true,
      "balance": 1500.75
    }
    setInput(JSON.stringify(sample))
  }

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
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                🛠️ Utilities
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

      <div className="container mx-auto px-5 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-4">
              JSON Formatter
            </h1>
            <p className="text-xl text-muted-foreground">
              Format, validate, and minify JSON data with ease
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Input JSON</h2>
                <button
                  onClick={sampleJson}
                  className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-1 rounded transition-colors"
                >
                  Load Sample
                </button>
              </div>
              
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here..."
                className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900"
              />

              {/* Controls */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium">Indent Size:</label>
                  <select
                    value={indentSize}
                    onChange={(e) => setIndentSize(Number(e.target.value))}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
                  >
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                    <option value={8}>8 spaces</option>
                  </select>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={formatJson}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors"
                  >
                    Format
                  </button>
                  <button
                    onClick={minifyJson}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors"
                  >
                    Minify
                  </button>
                  <button
                    onClick={validateJson}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-medium transition-colors"
                  >
                    Validate
                  </button>
                  <button
                    onClick={clearAll}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Output</h2>
                {output && (
                  <button
                    onClick={copyToClipboard}
                    className="text-sm bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 px-3 py-1 rounded transition-colors"
                  >
                    Copy
                  </button>
                )}
              </div>

              {error ? (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-700 dark:text-red-300 text-sm font-mono">{error}</p>
                </div>
              ) : (
                <textarea
                  value={output}
                  readOnly
                  placeholder="Formatted JSON will appear here..."
                  className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm resize-none bg-gray-50 dark:bg-gray-800"
                />
              )}
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-lg font-semibold mb-2">Format</h3>
              <p className="text-sm text-muted-foreground">
                Pretty-print JSON with customizable indentation for better readability
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">🗜️</div>
              <h3 className="text-lg font-semibold mb-2">Minify</h3>
              <p className="text-sm text-muted-foreground">
                Remove unnecessary whitespace to reduce file size for production
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-lg font-semibold mb-2">Validate</h3>
              <p className="text-sm text-muted-foreground">
                Check if your JSON syntax is valid and identify parsing errors
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">💡 Tips</h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Use the "Load Sample" button to test with example JSON data</li>
              <li>• All processing happens in your browser - your data never leaves your device</li>
              <li>• Choose different indent sizes based on your coding standards</li>
              <li>• Validate JSON before using it in your applications</li>
              <li>• Minify JSON for APIs and web applications to reduce bandwidth</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
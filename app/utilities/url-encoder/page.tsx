'use client'

import { useState } from 'react'

export default function UrlEncoderPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [encodingType, setEncodingType] = useState<'component' | 'uri'>('component')
  const [error, setError] = useState('')

  const processUrl = () => {
    try {
      setError('')
      if (!input.trim()) {
        setError('Please enter text to process')
        return
      }

      let result = ''
      
      if (mode === 'encode') {
        if (encodingType === 'component') {
          result = encodeURIComponent(input)
        } else {
          result = encodeURI(input)
        }
      } else {
        result = decodeURIComponent(input)
      }
      
      setOutput(result)
    } catch (err) {
      setError('Error processing URL: ' + (err as Error).message)
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

  const swapInputOutput = () => {
    if (output) {
      setInput(output)
      setOutput('')
      setMode(mode === 'encode' ? 'decode' : 'encode')
    }
  }

  const loadSample = () => {
    if (mode === 'encode') {
      setInput('https://example.com/search?q=hello world&category=web development')
    } else {
      setInput('https%3A//example.com/search%3Fq%3Dhello%20world%26category%3Dweb%20development')
    }
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-4">
              URL Encoder/Decoder
            </h1>
            <p className="text-xl text-muted-foreground">
              Encode and decode URLs for web development and API integration
            </p>
          </div>

          {/* Mode Selection */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <button
                onClick={() => setMode('encode')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  mode === 'encode'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Encode
              </button>
              <button
                onClick={() => setMode('decode')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  mode === 'decode'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Decode
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Input Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">
                  {mode === 'encode' ? 'Text to Encode' : 'Text to Decode'}
                </h2>
                <button
                  onClick={loadSample}
                  className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-1 rounded transition-colors"
                >
                  Load Sample
                </button>
              </div>
              
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter URL or text to encode...' : 'Enter encoded URL to decode...'}
                className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900"
              />

              {/* Controls */}
              <div className="space-y-4">
                {mode === 'encode' && (
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium">Encoding Type:</label>
                    <div className="flex gap-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="encodingType"
                          value="component"
                          checked={encodingType === 'component'}
                          onChange={(e) => setEncodingType(e.target.value as 'component' | 'uri')}
                        />
                        <span className="text-sm">Component (recommended)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="encodingType"
                          value="uri"
                          checked={encodingType === 'uri'}
                          onChange={(e) => setEncodingType(e.target.value as 'component' | 'uri')}
                        />
                        <span className="text-sm">URI</span>
                      </label>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={processUrl}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition-colors"
                  >
                    {mode === 'encode' ? 'Encode' : 'Decode'}
                  </button>
                  <button
                    onClick={swapInputOutput}
                    disabled={!output}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded font-medium transition-colors"
                  >
                    ⇄ Swap
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
                <h2 className="text-2xl font-semibold">
                  {mode === 'encode' ? 'Encoded Result' : 'Decoded Result'}
                </h2>
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
                  placeholder="Result will appear here..."
                  className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm resize-none bg-gray-50 dark:bg-gray-800"
                />
              )}
            </div>
          </div>

          {/* Information Cards */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">🔗</span>
                URL Encoding
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                URL encoding converts special characters into a format that can be safely transmitted over the internet.
              </p>
              <div className="text-sm space-y-1">
                <p><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">space</code> → <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">%20</code></p>
                <p><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">&</code> → <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">%26</code></p>
                <p><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">=</code> → <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">%3D</code></p>
              </div>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">⚙️</span>
                Encoding Types
              </h3>
              <div className="text-sm space-y-3">
                <div>
                  <p className="font-medium">Component Encoding</p>
                  <p className="text-muted-foreground">Encodes all special characters. Use for query parameters and form data.</p>
                </div>
                <div>
                  <p className="font-medium">URI Encoding</p>
                  <p className="text-muted-foreground">Preserves URL structure characters like :, /, ?, #. Use for complete URLs.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">💡 Common Use Cases</h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Encoding query parameters for API requests</li>
              <li>• Preparing form data for HTTP submissions</li>
              <li>• Handling special characters in URLs</li>
              <li>• Debugging URL-related issues in web applications</li>
              <li>• Creating safe URLs for email and messaging</li>
              <li>• Processing data from URL parameters</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
'use client'

import React, { useState, useEffect } from 'react'

export default function TextCleanerPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [options, setOptions] = useState({
    removeExtraSpaces: true,
    removeEmptyLines: true,
    trimLines: true,
    removeSpecialChars: false,
    removeNumbers: false,
    removePunctuation: false,
    removeEmails: false,
    removeUrls: false,
    removeHtmlTags: false,
    removeExtraLineBreaks: true,
    convertToAscii: false,
    removeDuplicateLines: false,
    sortLines: false,
    removeLeadingNumbers: false,
    normalizeSpaces: true
  })

  const cleanText = (text: string) => {
    if (!text) return ''

    let cleaned = text

    // Remove HTML tags
    if (options.removeHtmlTags) {
      cleaned = cleaned.replace(/<[^>]*>/g, '')
    }

    // Remove URLs
    if (options.removeUrls) {
      cleaned = cleaned.replace(/https?:\/\/[^\s]+/g, '')
      cleaned = cleaned.replace(/www\.[^\s]+/g, '')
    }

    // Remove email addresses
    if (options.removeEmails) {
      cleaned = cleaned.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '')
    }

    // Remove leading numbers (like "1. ", "2. ", etc.)
    if (options.removeLeadingNumbers) {
      cleaned = cleaned.replace(/^\d+\.?\s*/gm, '')
    }

    // Remove special characters (keep letters, numbers, basic punctuation, and spaces)
    if (options.removeSpecialChars) {
      cleaned = cleaned.replace(/[^\w\s.,!?;:'"()-]/g, '')
    }

    // Remove numbers
    if (options.removeNumbers) {
      cleaned = cleaned.replace(/\d+/g, '')
    }

    // Remove punctuation
    if (options.removePunctuation) {
      cleaned = cleaned.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      cleaned = cleaned.replace(/['"]/g, '')
    }

    // Convert to ASCII (remove non-ASCII characters)
    if (options.convertToAscii) {
      cleaned = cleaned.replace(/[^\x00-\x7F]/g, '')
    }

    // Normalize spaces (convert tabs, multiple spaces to single space)
    if (options.normalizeSpaces) {
      cleaned = cleaned.replace(/\t/g, ' ')
      cleaned = cleaned.replace(/[ ]+/g, ' ')
    }

    // Remove extra spaces
    if (options.removeExtraSpaces) {
      cleaned = cleaned.replace(/ +/g, ' ')
    }

    // Trim each line
    if (options.trimLines) {
      cleaned = cleaned.split('\n').map(line => line.trim()).join('\n')
    }

    // Remove empty lines
    if (options.removeEmptyLines) {
      cleaned = cleaned.split('\n').filter(line => line.trim() !== '').join('\n')
    }

    // Remove extra line breaks (more than 2 consecutive)
    if (options.removeExtraLineBreaks) {
      cleaned = cleaned.replace(/\n{3,}/g, '\n\n')
    }

    // Remove duplicate lines
    if (options.removeDuplicateLines) {
      const lines = cleaned.split('\n')
      const uniqueLines = [...new Set(lines)]
      cleaned = uniqueLines.join('\n')
    }

    // Sort lines alphabetically
    if (options.sortLines) {
      const lines = cleaned.split('\n')
      const sortedLines = lines.sort((a, b) => a.localeCompare(b))
      cleaned = sortedLines.join('\n')
    }

    return cleaned.trim()
  }

  useEffect(() => {
    setOutput(cleanText(input))
  }, [input, options])

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
  }

  const loadSample = () => {
    const sample = `    This is a sample text with extra    spaces.

<p>Some HTML tags</p> and http://example.com URLs.

1. First item with leading number
2. Second item  

Contact us at email@example.com for more info!!!

Some special characters: @#$%^&*()

    Another line with    multiple   spaces...


Extra empty lines above and below.

Duplicate line
Duplicate line
Another line
`
    setInput(sample)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const swapInputOutput = () => {
    setInput(output)
  }

  const resetOptions = () => {
    setOptions({
      removeExtraSpaces: true,
      removeEmptyLines: true,
      trimLines: true,
      removeSpecialChars: false,
      removeNumbers: false,
      removePunctuation: false,
      removeEmails: false,
      removeUrls: false,
      removeHtmlTags: false,
      removeExtraLineBreaks: true,
      convertToAscii: false,
      removeDuplicateLines: false,
      sortLines: false,
      removeLeadingNumbers: false,
      normalizeSpaces: true
    })
  }

  const presets = {
    basic: {
      removeExtraSpaces: true,
      removeEmptyLines: true,
      trimLines: true,
      removeExtraLineBreaks: true,
      normalizeSpaces: true
    },
    webContent: {
      removeHtmlTags: true,
      removeUrls: true,
      removeEmails: true,
      removeExtraSpaces: true,
      removeEmptyLines: true,
      trimLines: true
    },
    textOnly: {
      removeSpecialChars: true,
      removeNumbers: true,
      removePunctuation: true,
      removeExtraSpaces: true,
      removeEmptyLines: true,
      trimLines: true
    }
  }

  const applyPreset = (preset: keyof typeof presets) => {
    setOptions(prev => ({
      ...prev,
      ...Object.keys(prev).reduce((acc, key) => {
        acc[key as keyof typeof prev] = false
        return acc
      }, {} as typeof prev),
      ...presets[preset]
    }))
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-4">
              Text Cleaner
            </h1>
            <p className="text-xl text-muted-foreground">
              Clean and format your text with advanced filtering and processing options
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Options Panel */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Cleaning Options</h2>
                
                {/* Presets */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Quick Presets</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => applyPreset('basic')}
                      className="w-full text-left text-xs bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-800/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded transition-colors"
                    >
                      Basic Cleanup
                    </button>
                    <button
                      onClick={() => applyPreset('webContent')}
                      className="w-full text-left text-xs bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-800/30 text-green-700 dark:text-green-300 px-2 py-1 rounded transition-colors"
                    >
                      Web Content
                    </button>
                    <button
                      onClick={() => applyPreset('textOnly')}
                      className="w-full text-left text-xs bg-purple-100 dark:bg-purple-900/20 hover:bg-purple-200 dark:hover:bg-purple-800/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded transition-colors"
                    >
                      Text Only
                    </button>
                    <button
                      onClick={resetOptions}
                      className="w-full text-left text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded transition-colors"
                    >
                      Reset All
                    </button>
                  </div>
                </div>

                {/* Individual Options */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {Object.entries(options).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleOptionChange(key as keyof typeof options)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Input Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Input Text</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={loadSample}
                      className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-1 rounded transition-colors"
                    >
                      Load Sample
                    </button>
                    <button
                      onClick={clearAll}
                      className="text-sm bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-800/30 text-red-700 dark:text-red-300 px-3 py-1 rounded transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste your text here to clean and format..."
                  className="w-full h-48 p-4 border border-gray-300 dark:border-gray-600 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 font-mono"
                />
              </div>

              {/* Output Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Cleaned Text</h2>
                  <div className="flex gap-2">
                    {output && (
                      <>
                        <button
                          onClick={swapInputOutput}
                          className="text-sm bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-800/30 text-green-700 dark:text-green-300 px-3 py-1 rounded transition-colors"
                        >
                          ↑ Use as Input
                        </button>
                        <button
                          onClick={copyToClipboard}
                          className="text-sm bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 px-3 py-1 rounded transition-colors"
                        >
                          Copy
                        </button>
                      </>
                    )}
                  </div>
                </div>
                
                <textarea
                  value={output}
                  readOnly
                  placeholder="Cleaned text will appear here..."
                  className="w-full h-48 p-4 border border-gray-300 dark:border-gray-600 rounded-lg text-sm resize-none bg-gray-50 dark:bg-gray-800 font-mono"
                />

                {/* Statistics */}
                {input && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-lg font-semibold text-blue-600">{input.length}</div>
                      <div className="text-xs text-muted-foreground">Original Chars</div>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-lg font-semibold text-green-600">{output.length}</div>
                      <div className="text-xs text-muted-foreground">Cleaned Chars</div>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-lg font-semibold text-purple-600">
                        {input.length - output.length}
                      </div>
                      <div className="text-xs text-muted-foreground">Removed Chars</div>
                    </div>
                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-lg font-semibold text-orange-600">
                        {input.length > 0 ? Math.round(((input.length - output.length) / input.length) * 100) : 0}%
                      </div>
                      <div className="text-xs text-muted-foreground">Reduction</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Features Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">🧹</div>
              <h3 className="text-lg font-semibold mb-2">Smart Cleaning</h3>
              <p className="text-sm text-muted-foreground">
                15+ cleaning options including HTML tags, URLs, emails, and formatting
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Real-time Processing</h3>
              <p className="text-sm text-muted-foreground">
                Instant results as you type or change cleaning options
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-2">Quick Presets</h3>
              <p className="text-sm text-muted-foreground">
                Pre-configured settings for common use cases
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">💡 Common Use Cases</h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• <strong>Basic Cleanup:</strong> Remove extra spaces, empty lines, and trim text</li>
              <li>• <strong>Web Content:</strong> Clean HTML tags, URLs, and email addresses from copied web text</li>
              <li>• <strong>Text Only:</strong> Extract plain text by removing all special characters and numbers</li>
              <li>• <strong>Data Processing:</strong> Remove duplicates, sort lines, and normalize formatting</li>
              <li>• <strong>Document Formatting:</strong> Clean up copied text from PDFs or documents</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
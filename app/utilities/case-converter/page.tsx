'use client'

import React, { useState } from 'react'

export default function CaseConverterPage() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState({
    lowercase: '',
    uppercase: '',
    titleCase: '',
    sentenceCase: '',
    camelCase: '',
    pascalCase: '',
    snakeCase: '',
    kebabCase: '',
    constantCase: '',
    dotCase: '',
    pathCase: '',
    alternatingCase: ''
  })

  const convertText = (text: string) => {
    if (!text) {
      setResults({
        lowercase: '',
        uppercase: '',
        titleCase: '',
        sentenceCase: '',
        camelCase: '',
        pascalCase: '',
        snakeCase: '',
        kebabCase: '',
        constantCase: '',
        dotCase: '',
        pathCase: '',
        alternatingCase: ''
      })
      return
    }

    // Helper function to convert to camelCase
    const toCamelCase = (str: string): string => {
      return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase()
        })
        .replace(/\s+/g, '')
        .replace(/[^a-zA-Z0-9]/g, '')
    }

    // Helper function to convert to PascalCase
    const toPascalCase = (str: string): string => {
      return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
          return word.toUpperCase()
        })
        .replace(/\s+/g, '')
        .replace(/[^a-zA-Z0-9]/g, '')
    }

    // Helper function to convert to snake_case
    const toSnakeCase = (str: string): string => {
      return str
        .replace(/\W+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join('_')
        .replace(/_{2,}/g, '_')
        .replace(/^_|_$/g, '')
    }

    // Helper function to convert to kebab-case
    const toKebabCase = (str: string): string => {
      return str
        .replace(/\W+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join('-')
        .replace(/-{2,}/g, '-')
        .replace(/^-|-$/g, '')
    }

    // Helper function for Title Case
    const toTitleCase = (str: string): string => {
      const smallWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet']
      
      return str.toLowerCase().split(' ').map((word, index) => {
        if (index === 0 || !smallWords.includes(word)) {
          return word.charAt(0).toUpperCase() + word.slice(1)
        }
        return word
      }).join(' ')
    }

    // Helper function for Sentence Case
    const toSentenceCase = (str: string): string => {
      return str.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase())
    }

    // Helper function for Alternating Case
    const toAlternatingCase = (str: string): string => {
      return str.split('').map((char, index) => {
        if (char.match(/[a-zA-Z]/)) {
          return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        }
        return char
      }).join('')
    }

    setResults({
      lowercase: text.toLowerCase(),
      uppercase: text.toUpperCase(),
      titleCase: toTitleCase(text),
      sentenceCase: toSentenceCase(text),
      camelCase: toCamelCase(text),
      pascalCase: toPascalCase(text),
      snakeCase: toSnakeCase(text),
      kebabCase: toKebabCase(text),
      constantCase: toSnakeCase(text).toUpperCase(),
      dotCase: toSnakeCase(text).replace(/_/g, '.'),
      pathCase: toKebabCase(text).replace(/-/g, '/'),
      alternatingCase: toAlternatingCase(text)
    })
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    convertText(value)
  }

  const clearAll = () => {
    setInput('')
    convertText('')
  }

  const loadSample = () => {
    const sample = 'Hello World Example Text'
    setInput(sample)
    convertText(sample)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const copyResult = (text: string) => {
    setInput(text)
    convertText(text)
  }

  const caseTypes = [
    { key: 'lowercase', name: 'lowercase', description: 'All letters in lowercase', example: 'hello world' },
    { key: 'uppercase', name: 'UPPERCASE', description: 'All letters in uppercase', example: 'HELLO WORLD' },
    { key: 'titleCase', name: 'Title Case', description: 'First letter of each major word capitalized', example: 'Hello World' },
    { key: 'sentenceCase', name: 'Sentence case', description: 'First letter of sentences capitalized', example: 'Hello world. Second sentence.' },
    { key: 'camelCase', name: 'camelCase', description: 'First word lowercase, subsequent words capitalized, no spaces', example: 'helloWorld' },
    { key: 'pascalCase', name: 'PascalCase', description: 'All words capitalized, no spaces', example: 'HelloWorld' },
    { key: 'snakeCase', name: 'snake_case', description: 'All lowercase with underscores', example: 'hello_world' },
    { key: 'kebabCase', name: 'kebab-case', description: 'All lowercase with hyphens', example: 'hello-world' },
    { key: 'constantCase', name: 'CONSTANT_CASE', description: 'All uppercase with underscores', example: 'HELLO_WORLD' },
    { key: 'dotCase', name: 'dot.case', description: 'All lowercase with dots', example: 'hello.world' },
    { key: 'pathCase', name: 'path/case', description: 'All lowercase with forward slashes', example: 'hello/world' },
    { key: 'alternatingCase', name: 'aLtErNaTiNg CaSe', description: 'Alternating between lowercase and uppercase', example: 'hElLo WoRlD' }
  ]

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
              Case Converter
            </h1>
            <p className="text-xl text-muted-foreground">
              Convert text between different case styles for programming and writing
            </p>
          </div>

          {/* Input Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
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
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter your text here to convert between different cases..."
              className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900"
            />
          </div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseTypes.map(({ key, name, description, example }) => {
              const result = results[key as keyof typeof results]
              return (
                <div key={key} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{description}</p>
                    </div>
                    <div className="flex gap-1">
                      {result && (
                        <>
                          <button
                            onClick={() => copyToClipboard(result)}
                            className="text-xs bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-1 rounded transition-colors"
                            title="Copy to clipboard"
                          >
                            Copy
                          </button>
                          <button
                            onClick={() => copyResult(result)}
                            className="text-xs bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded transition-colors"
                            title="Use as input"
                          >
                            ↑
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded border min-h-[60px] flex items-center">
                    <code className="text-sm font-mono break-all">
                      {result || <span className="text-muted-foreground italic">Result will appear here...</span>}
                    </code>
                  </div>
                  
                  <div className="mt-2 text-xs text-muted-foreground">
                    <span className="font-medium">Example:</span> {example}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Use Cases */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">💻</span>
                Programming Cases
              </h3>
              <div className="text-sm space-y-2">
                <p><strong>camelCase:</strong> JavaScript variables, functions</p>
                <p><strong>PascalCase:</strong> Classes, components, types</p>
                <p><strong>snake_case:</strong> Python variables, database fields</p>
                <p><strong>kebab-case:</strong> CSS classes, URLs, file names</p>
                <p><strong>CONSTANT_CASE:</strong> Constants, environment variables</p>
              </div>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">📝</span>
                Writing Cases
              </h3>
              <div className="text-sm space-y-2">
                <p><strong>Title Case:</strong> Headings, book titles, articles</p>
                <p><strong>Sentence case:</strong> Regular paragraphs, descriptions</p>
                <p><strong>UPPERCASE:</strong> Emphasis, headings, alerts</p>
                <p><strong>lowercase:</strong> Informal text, tags, keywords</p>
                <p><strong>aLtErNaTiNg:</strong> Memes, sarcastic text</p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">💡 Tips & Features</h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• <strong>Real-time conversion:</strong> Results update as you type</li>
              <li>• <strong>Copy button:</strong> Click "Copy" to copy any result to clipboard</li>
              <li>• <strong>Use as input:</strong> Click "↑" to use any result as new input for chaining conversions</li>
              <li>• <strong>Smart title case:</strong> Properly handles articles and prepositions</li>
              <li>• <strong>Programming-friendly:</strong> Handles special characters and numbers correctly</li>
              <li>• <strong>Multiple formats:</strong> 12 different case conversion options available</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
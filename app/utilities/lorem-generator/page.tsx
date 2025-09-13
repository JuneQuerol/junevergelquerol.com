'use client'

import React, { useState, useEffect } from 'react'

export default function LoremGeneratorPage() {
  const [output, setOutput] = useState('')
  const [options, setOptions] = useState({
    type: 'paragraphs' as 'words' | 'sentences' | 'paragraphs',
    count: 5,
    startWithLorem: true,
    format: 'plain' as 'plain' | 'html' | 'markdown',
    includeLineNumbers: false
  })

  // Classic Lorem Ipsum text
  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
    'accusamus', 'accusantium', 'doloremque', 'laudantium', 'totam', 'rem',
    'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore', 'veritatis',
    'et', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta', 'sunt', 'explicabo',
    'nemo', 'ipsam', 'quia', 'voluptas', 'aspernatur', 'aut', 'odit', 'fugit',
    'sed', 'quia', 'consequuntur', 'magni', 'dolores', 'ratione', 'sequi',
    'nesciunt', 'neque', 'porro', 'quisquam', 'dolorem', 'adipisci', 'numquam',
    'eius', 'modi', 'tempora', 'incidunt', 'magnam', 'quaerat', 'voluptatem',
    'aliquam', 'quam', 'nihil', 'molestiae', 'illum', 'fugiat', 'quo', 'blanditiis',
    'praesentium', 'voluptatum', 'deleniti', 'atque', 'corrupti', 'quos',
    'quidem', 'rerum', 'facilis', 'expedita', 'distinctio', 'nam', 'libero',
    'tempore', 'cum', 'soluta', 'nobis', 'eligendi', 'optio', 'cumque', 'impedit',
    'minus', 'quod', 'maxime', 'placeat', 'facere', 'possimus', 'omnis',
    'assumenda', 'repellendus', 'temporibus', 'autem', 'officiis', 'debitis',
    'necessitatibus', 'saepe', 'eveniet', 'voluptates', 'repudiandae', 'recusandae',
    'itaque', 'earum', 'hic', 'tenetur', 'sapiente', 'delectus', 'reiciendis',
    'maiores', 'alias', 'perferendis', 'doloribus', 'asperiores', 'repellat'
  ]

  const getRandomWord = () => {
    return loremWords[Math.floor(Math.random() * loremWords.length)]
  }

  const generateWords = (count: number, startWithLorem: boolean = false) => {
    const words: string[] = []
    
    if (startWithLorem && count > 0) {
      words.push('Lorem')
      count--
    }
    
    for (let i = 0; i < count; i++) {
      words.push(getRandomWord())
    }
    
    return words
  }

  const generateSentence = (minWords: number = 6, maxWords: number = 15, startWithLorem: boolean = false) => {
    const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords
    const words = generateWords(wordCount, startWithLorem)
    
    // Capitalize first word
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
    
    return words.join(' ') + '.'
  }

  const generateParagraph = (minSentences: number = 3, maxSentences: number = 7, startWithLorem: boolean = false) => {
    const sentenceCount = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences
    const sentences: string[] = []
    
    for (let i = 0; i < sentenceCount; i++) {
      const isFirstSentence = i === 0 && startWithLorem
      sentences.push(generateSentence(6, 15, isFirstSentence))
    }
    
    return sentences.join(' ')
  }

  const generateLorem = () => {
    let result = ''
    const { type, count, startWithLorem, format, includeLineNumbers } = options
    
    if (type === 'words') {
      const words = generateWords(count, startWithLorem)
      if (words.length > 0) {
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
      }
      result = words.join(' ') + '.'
      
    } else if (type === 'sentences') {
      const sentences: string[] = []
      for (let i = 0; i < count; i++) {
        const isFirstSentence = i === 0 && startWithLorem
        sentences.push(generateSentence(6, 15, isFirstSentence))
      }
      result = sentences.join(' ')
      
    } else if (type === 'paragraphs') {
      const paragraphs: string[] = []
      for (let i = 0; i < count; i++) {
        const isFirstParagraph = i === 0 && startWithLorem
        paragraphs.push(generateParagraph(3, 7, isFirstParagraph))
      }
      
      if (format === 'html') {
        result = paragraphs.map((p, i) => {
          const content = includeLineNumbers ? `${i + 1}. ${p}` : p
          return `<p>${content}</p>`
        }).join('\n')
      } else if (format === 'markdown') {
        result = paragraphs.map((p, i) => {
          return includeLineNumbers ? `${i + 1}. ${p}` : p
        }).join('\n\n')
      } else {
        result = paragraphs.map((p, i) => {
          return includeLineNumbers ? `${i + 1}. ${p}` : p
        }).join('\n\n')
      }
    }
    
    return result
  }

  useEffect(() => {
    setOutput(generateLorem())
  }, [options])

  const handleOptionChange = (key: string, value: any) => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const regenerate = () => {
    setOutput(generateLorem())
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  const getSentenceCount = (text: string) => {
    return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length
  }

  const getParagraphCount = (text: string) => {
    if (options.format === 'html') {
      return (text.match(/<p>/g) || []).length
    }
    return text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0).length
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
              Lorem Ipsum Generator
            </h1>
            <p className="text-xl text-muted-foreground">
              Generate classic Lorem Ipsum placeholder text for your designs and layouts
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Options Panel */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Generator Options</h2>
                
                {/* Type Selection */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium">Generate:</label>
                  <div className="space-y-2">
                    {(['words', 'sentences', 'paragraphs'] as const).map(type => (
                      <label key={type} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="type"
                          value={type}
                          checked={options.type === type}
                          onChange={(e) => handleOptionChange('type', e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Count Input */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium">
                    Number of {options.type}:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={options.count}
                    onChange={(e) => handleOptionChange('count', Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900"
                  />
                </div>

                {/* Format Selection */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium">Format:</label>
                  <select
                    value={options.format}
                    onChange={(e) => handleOptionChange('format', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900"
                  >
                    <option value="plain">Plain Text</option>
                    <option value="html">HTML</option>
                    <option value="markdown">Markdown</option>
                  </select>
                </div>

                {/* Additional Options */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={options.startWithLorem}
                      onChange={(e) => handleOptionChange('startWithLorem', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Start with "Lorem ipsum"</span>
                  </label>
                  
                  {options.type === 'paragraphs' && (
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={options.includeLineNumbers}
                        onChange={(e) => handleOptionChange('includeLineNumbers', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">Include line numbers</span>
                    </label>
                  )}
                </div>

                {/* Generate Button */}
                <button
                  onClick={regenerate}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors"
                >
                  🎲 Generate New
                </button>
              </div>

              {/* Statistics */}
              {output && (
                <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <h3 className="font-semibold mb-3">Statistics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Characters:</span>
                      <span className="font-medium">{output.length.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Words:</span>
                      <span className="font-medium">{getWordCount(output).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sentences:</span>
                      <span className="font-medium">{getSentenceCount(output).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Paragraphs:</span>
                      <span className="font-medium">{getParagraphCount(output).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Output Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Generated Text</h2>
                {output && (
                  <button
                    onClick={copyToClipboard}
                    className="bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 px-4 py-2 rounded font-medium transition-colors"
                  >
                    📋 Copy
                  </button>
                )}
              </div>
              
              <textarea
                value={output}
                readOnly
                placeholder="Generated Lorem Ipsum will appear here..."
                className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg text-sm resize-none bg-gray-50 dark:bg-gray-800 font-mono"
              />

              {/* Format Preview */}
              {options.format === 'html' && output && (
                <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">HTML Preview:</h3>
                  <div 
                    className="prose prose-sm dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: output }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Features Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">📝</div>
              <h3 className="text-lg font-semibold mb-2">Classic Lorem Ipsum</h3>
              <p className="text-sm text-muted-foreground">
                Authentic Latin-based placeholder text from Cicero's works
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-2">Multiple Formats</h3>
              <p className="text-sm text-muted-foreground">
                Generate plain text, HTML paragraphs, or Markdown format
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">🎲</div>
              <h3 className="text-lg font-semibold mb-2">Customizable Output</h3>
              <p className="text-sm text-muted-foreground">
                Choose words, sentences, or paragraphs with various options
              </p>
            </div>
          </div>

          {/* About Lorem Ipsum */}
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">📚 About Lorem Ipsum</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the 
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley 
                of type and scrambled it to make a type specimen book.
              </p>
              <p>
                <strong>Why use Lorem Ipsum?</strong> It has a more-or-less normal distribution of letters, 
                making it look like readable English, while keeping the focus on design rather than content.
              </p>
              <p>
                <strong>Common use cases:</strong> Website mockups, design layouts, typography testing, 
                content management systems, and any situation requiring placeholder text.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
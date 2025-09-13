'use client'

import React, { useState, useMemo } from 'react'

export default function WordCounterPage() {
  const [text, setText] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const stats = useMemo(() => {
    if (!text) {
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0,
        mostCommonWords: [],
        readingTime: 0,
        speakingTime: 0,
        averageWordsPerSentence: 0,
        averageSentencesPerParagraph: 0
      }
    }

    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    
    // Words: split by whitespace and filter out empty strings
    const wordsArray = text.trim().split(/\s+/).filter(word => word.length > 0)
    const words = wordsArray.length
    
    // Sentences: split by sentence endings
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length
    
    // Paragraphs: split by double newlines or more
    const paragraphs = text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0).length
    
    // Lines: split by single newlines
    const lines = text.split('\n').length
    
    // Most common words (excluding common stop words)
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'])
    
    const wordCounts: { [key: string]: number } = {}
    wordsArray.forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, '')
      if (cleanWord.length > 2 && !stopWords.has(cleanWord)) {
        wordCounts[cleanWord] = (wordCounts[cleanWord] || 0) + 1
      }
    })
    
    const mostCommonWords = Object.entries(wordCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([word, count]) => ({ word, count }))
    
    // Reading time (average 200 words per minute)
    const readingTime = Math.ceil(words / 200)
    
    // Speaking time (average 130 words per minute)
    const speakingTime = Math.ceil(words / 130)
    
    // Averages
    const averageWordsPerSentence = sentences > 0 ? Math.round(words / sentences * 10) / 10 : 0
    const averageSentencesPerParagraph = paragraphs > 0 ? Math.round(sentences / paragraphs * 10) / 10 : 0

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      mostCommonWords,
      readingTime,
      speakingTime,
      averageWordsPerSentence,
      averageSentencesPerParagraph
    }
  }, [text])

  const clearText = () => {
    setText('')
  }

  const loadSample = () => {
    setText(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`)
  }

  const copyStats = async () => {
    const statsText = `Text Statistics:
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Words: ${stats.words}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Lines: ${stats.lines}
Reading time: ${stats.readingTime} minute${stats.readingTime !== 1 ? 's' : ''}
Speaking time: ${stats.speakingTime} minute${stats.speakingTime !== 1 ? 's' : ''}`

    try {
      await navigator.clipboard.writeText(statsText)
    } catch (err) {
      console.error('Failed to copy:', err)
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-4">
              Word Counter
            </h1>
            <p className="text-xl text-muted-foreground">
              Analyze your text with detailed statistics and insights
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Text Input</h2>
                <div className="flex gap-2">
                  <button
                    onClick={loadSample}
                    className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-1 rounded transition-colors"
                  >
                    Load Sample
                  </button>
                  <button
                    onClick={clearText}
                    className="text-sm bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-800/30 text-red-700 dark:text-red-300 px-3 py-1 rounded transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
              
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here to analyze..."
                className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900"
              />

              {/* Real-time counter below textarea */}
              <div className="flex justify-between text-sm text-muted-foreground bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <span>Characters: {stats.characters}</span>
                <span>Words: {stats.words}</span>
                <span>Lines: {stats.lines}</span>
              </div>
            </div>

            {/* Statistics Panel */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Statistics</h2>
                {stats.words > 0 && (
                  <button
                    onClick={copyStats}
                    className="text-sm bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 px-3 py-1 rounded transition-colors"
                  >
                    Copy Stats
                  </button>
                )}
              </div>

              {/* Basic Stats */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.characters.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Characters</div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.words.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Words</div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">{stats.sentences.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Sentences</div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-600">{stats.paragraphs.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Paragraphs</div>
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-sm">Characters (no spaces)</span>
                    <span className="text-sm font-medium">{stats.charactersNoSpaces.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Lines</span>
                    <span className="text-sm font-medium">{stats.lines.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Reading time</span>
                    <span className="text-sm font-medium">{stats.readingTime} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Speaking time</span>
                    <span className="text-sm font-medium">{stats.speakingTime} min</span>
                  </div>
                </div>

                {/* Advanced Stats Toggle */}
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {showAdvanced ? '▼' : '▶'} Advanced Statistics
                </button>

                {showAdvanced && (
                  <div className="space-y-4">
                    {/* Averages */}
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <h4 className="font-semibold mb-2">Averages</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Words per sentence</span>
                          <span className="font-medium">{stats.averageWordsPerSentence}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sentences per paragraph</span>
                          <span className="font-medium">{stats.averageSentencesPerParagraph}</span>
                        </div>
                      </div>
                    </div>

                    {/* Most Common Words */}
                    {stats.mostCommonWords.length > 0 && (
                      <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <h4 className="font-semibold mb-2">Most Common Words</h4>
                        <div className="space-y-1">
                          {stats.mostCommonWords.map(({ word, count }, index) => (
                            <div key={word} className="flex justify-between text-sm">
                              <span className="capitalize">{index + 1}. {word}</span>
                              <span className="font-medium">{count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Features Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Real-time Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Get instant statistics as you type or paste your text
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2">Detailed Metrics</h3>
              <p className="text-sm text-muted-foreground">
                Characters, words, sentences, paragraphs, and reading time
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-2">Advanced Insights</h3>
              <p className="text-sm text-muted-foreground">
                Common words, averages, and writing pattern analysis
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">💡 Usage Tips</h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Perfect for essays, articles, blog posts, and social media content</li>
              <li>• Reading time is calculated at 200 words per minute (average adult)</li>
              <li>• Speaking time is calculated at 130 words per minute (presentation pace)</li>
              <li>• Common stop words are excluded from the most frequent words analysis</li>
              <li>• Use the "Copy Stats" button to share your text statistics</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
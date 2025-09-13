'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface DiffResult {
  line: number
  type: 'added' | 'removed' | 'unchanged' | 'modified'
  leftContent: string
  rightContent: string
  leftLineNumber?: number
  rightLineNumber?: number
}

export default function TextDiffCheckerPage() {
  const [leftText, setLeftText] = useState<string>('')
  const [rightText, setRightText] = useState<string>('')
  const [diffResults, setDiffResults] = useState<DiffResult[]>([])
  const [compareMode, setCompareMode] = useState<'words' | 'lines' | 'characters'>('lines')
  const [ignoreWhitespace, setIgnoreWhitespace] = useState<boolean>(false)
  const [ignoreCase, setIgnoreCase] = useState<boolean>(false)
  const [showLineNumbers, setShowLineNumbers] = useState<boolean>(true)
  const [isComparing, setIsComparing] = useState<boolean>(false)
  
  const leftTextareaRef = useRef<HTMLTextAreaElement>(null)
  const rightTextareaRef = useRef<HTMLTextAreaElement>(null)

  // Simple diff algorithm implementation
  const createDiff = () => {
    setIsComparing(true)
    
    setTimeout(() => {
      let leftLines = leftText.split('\n')
      let rightLines = rightText.split('\n')
      
      // Apply preprocessing based on settings
      if (ignoreWhitespace) {
        leftLines = leftLines.map(line => line.trim())
        rightLines = rightLines.map(line => line.trim())
      }
      
      if (ignoreCase) {
        leftLines = leftLines.map(line => line.toLowerCase())
        rightLines = rightLines.map(line => line.toLowerCase())
      }
      
      const results: DiffResult[] = []
      const maxLines = Math.max(leftLines.length, rightLines.length)
      
      for (let i = 0; i < maxLines; i++) {
        const leftLine = i < leftLines.length ? leftLines[i] : ''
        const rightLine = i < rightLines.length ? rightLines[i] : ''
        const originalLeftLine = i < leftText.split('\n').length ? leftText.split('\n')[i] : ''
        const originalRightLine = i < rightText.split('\n').length ? rightText.split('\n')[i] : ''
        
        let type: DiffResult['type'] = 'unchanged'
        
        if (leftLine === '' && rightLine !== '') {
          type = 'added'
        } else if (leftLine !== '' && rightLine === '') {
          type = 'removed'
        } else if (leftLine !== rightLine) {
          type = 'modified'
        }
        
        results.push({
          line: i + 1,
          type,
          leftContent: originalLeftLine,
          rightContent: originalRightLine,
          leftLineNumber: i < leftText.split('\n').length ? i + 1 : undefined,
          rightLineNumber: i < rightText.split('\n').length ? i + 1 : undefined
        })
      }
      
      setDiffResults(results)
      setIsComparing(false)
    }, 100)
  }

  const clearTexts = () => {
    setLeftText('')
    setRightText('')
    setDiffResults([])
  }

  const swapTexts = () => {
    const temp = leftText
    setLeftText(rightText)
    setRightText(temp)
  }

  const copyDiffToClipboard = () => {
    const diffText = generateDiffReport()
    navigator.clipboard.writeText(diffText).then(() => {
      alert('Diff report copied to clipboard!')
    })
  }

  const generateDiffReport = (): string => {
    let report = `Text Diff Report\n`
    report += `Generated on: ${new Date().toLocaleString()}\n`
    report += `Compare Mode: ${compareMode}\n`
    report += `Ignore Whitespace: ${ignoreWhitespace}\n`
    report += `Ignore Case: ${ignoreCase}\n\n`
    
    const stats = getDiffStats()
    report += `Statistics:\n`
    report += `- Total Lines: ${stats.totalLines}\n`
    report += `- Added Lines: ${stats.addedLines}\n`
    report += `- Removed Lines: ${stats.removedLines}\n`
    report += `- Modified Lines: ${stats.modifiedLines}\n`
    report += `- Unchanged Lines: ${stats.unchangedLines}\n\n`
    
    report += `Detailed Diff:\n`
    report += `${'='.repeat(50)}\n\n`
    
    diffResults.forEach((result) => {
      if (result.type !== 'unchanged') {
        report += `Line ${result.line}: ${result.type.toUpperCase()}\n`
        if (result.type === 'removed' || result.type === 'modified') {
          report += `- ${result.leftContent}\n`
        }
        if (result.type === 'added' || result.type === 'modified') {
          report += `+ ${result.rightContent}\n`
        }
        report += '\n'
      }
    })
    
    return report
  }

  const getDiffStats = () => {
    const stats = {
      totalLines: diffResults.length,
      addedLines: 0,
      removedLines: 0,
      modifiedLines: 0,
      unchangedLines: 0
    }
    
    diffResults.forEach(result => {
      switch (result.type) {
        case 'added':
          stats.addedLines++
          break
        case 'removed':
          stats.removedLines++
          break
        case 'modified':
          stats.modifiedLines++
          break
        case 'unchanged':
          stats.unchangedLines++
          break
      }
    })
    
    return stats
  }

  const loadSampleTexts = () => {
    const sampleLeft = `Welcome to our website!
We offer the best services.
Our team is experienced.
Contact us for more information.
Thank you for visiting.`

    const sampleRight = `Welcome to our amazing website!
We offer the best quality services.
Our team is highly experienced.
Please contact us for more details.
Thank you for your visit.`

    setLeftText(sampleLeft)
    setRightText(sampleRight)
  }

  const getLineClass = (type: DiffResult['type']) => {
    switch (type) {
      case 'added':
        return 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500'
      case 'removed':
        return 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500'
      case 'modified':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500'
      default:
        return 'bg-gray-50 dark:bg-gray-800'
    }
  }

  const stats = getDiffStats()

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-5 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/utilities" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-violet-600 transition-colors mb-6"
          >
            ← Back to Utilities
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center">
              <span className="text-white text-2xl">🔍</span>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
                Text Diff Checker
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Compare two texts and find differences side by side
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-violet-200 dark:border-violet-800 mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ignoreWhitespace"
                  checked={ignoreWhitespace}
                  onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                />
                <label htmlFor="ignoreWhitespace" className="text-sm font-medium">
                  Ignore whitespace
                </label>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ignoreCase"
                  checked={ignoreCase}
                  onChange={(e) => setIgnoreCase(e.target.checked)}
                />
                <label htmlFor="ignoreCase" className="text-sm font-medium">
                  Ignore case
                </label>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showLineNumbers"
                  checked={showLineNumbers}
                  onChange={(e) => setShowLineNumbers(e.target.checked)}
                />
                <label htmlFor="showLineNumbers" className="text-sm font-medium">
                  Show line numbers
                </label>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={createDiff}
                disabled={isComparing || (!leftText.trim() && !rightText.trim())}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-2 px-6 rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed"
              >
                {isComparing ? 'Comparing...' : 'Compare Texts'}
              </button>
              
              <button
                onClick={swapTexts}
                className="border border-violet-300 dark:border-violet-600 text-violet-600 dark:text-violet-400 py-2 px-4 rounded-lg font-medium hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
              >
                ↔ Swap
              </button>
              
              <button
                onClick={clearTexts}
                className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Clear All
              </button>
              
              <button
                onClick={loadSampleTexts}
                className="border border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 py-2 px-4 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                Load Sample
              </button>
              
              {diffResults.length > 0 && (
                <button
                  onClick={copyDiffToClipboard}
                  className="border border-green-300 dark:border-green-600 text-green-600 dark:text-green-400 py-2 px-4 rounded-lg font-medium hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                >
                  Copy Report
                </button>
              )}
            </div>
          </div>

          {/* Input Areas */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-violet-200 dark:border-violet-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Original Text</h3>
                <span className="text-sm text-muted-foreground">
                  {leftText.split('\n').length} lines
                </span>
              </div>
              <textarea
                ref={leftTextareaRef}
                value={leftText}
                onChange={(e) => setLeftText(e.target.value)}
                placeholder="Paste or type your original text here..."
                className="w-full h-64 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                spellCheck={false}
              />
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-violet-200 dark:border-violet-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Modified Text</h3>
                <span className="text-sm text-muted-foreground">
                  {rightText.split('\n').length} lines
                </span>
              </div>
              <textarea
                ref={rightTextareaRef}
                value={rightText}
                onChange={(e) => setRightText(e.target.value)}
                placeholder="Paste or type your modified text here..."
                className="w-full h-64 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Statistics */}
          {diffResults.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-violet-200 dark:border-violet-800 mb-8">
              <h3 className="text-lg font-semibold mb-4">Comparison Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600 dark:text-gray-300">{stats.totalLines}</div>
                  <div className="text-sm text-muted-foreground">Total Lines</div>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.addedLines}</div>
                  <div className="text-sm text-muted-foreground">Added</div>
                </div>
                <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{stats.removedLines}</div>
                  <div className="text-sm text-muted-foreground">Removed</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{stats.modifiedLines}</div>
                  <div className="text-sm text-muted-foreground">Modified</div>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.unchangedLines}</div>
                  <div className="text-sm text-muted-foreground">Unchanged</div>
                </div>
              </div>
            </div>
          )}

          {/* Diff Results */}
          {diffResults.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-violet-200 dark:border-violet-800">
              <h3 className="text-lg font-semibold mb-4">Side-by-Side Comparison</h3>
              
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Left Side (Original) */}
                <div>
                  <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-t-lg font-medium text-sm">
                    Original Text
                  </div>
                  <div className="border border-t-0 rounded-b-lg max-h-96 overflow-y-auto">
                    {diffResults.map((result, index) => (
                      <div
                        key={`left-${index}`}
                        className={`flex ${getLineClass(result.type)} ${
                          result.type === 'added' ? 'opacity-40' : ''
                        }`}
                      >
                        {showLineNumbers && (
                          <div className="w-12 flex-shrink-0 text-xs text-muted-foreground p-2 text-right border-r">
                            {result.leftLineNumber || ''}
                          </div>
                        )}
                        <div className="flex-1 p-2 font-mono text-sm whitespace-pre-wrap break-words">
                          {result.leftContent || (result.type === 'added' ? ' ' : '')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side (Modified) */}
                <div>
                  <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-t-lg font-medium text-sm">
                    Modified Text
                  </div>
                  <div className="border border-t-0 rounded-b-lg max-h-96 overflow-y-auto">
                    {diffResults.map((result, index) => (
                      <div
                        key={`right-${index}`}
                        className={`flex ${getLineClass(result.type)} ${
                          result.type === 'removed' ? 'opacity-40' : ''
                        }`}
                      >
                        {showLineNumbers && (
                          <div className="w-12 flex-shrink-0 text-xs text-muted-foreground p-2 text-right border-r">
                            {result.rightLineNumber || ''}
                          </div>
                        )}
                        <div className="flex-1 p-2 font-mono text-sm whitespace-pre-wrap break-words">
                          {result.rightContent || (result.type === 'removed' ? ' ' : '')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-200 border-l-4 border-green-500 rounded-sm"></div>
                  <span>Added lines</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-200 border-l-4 border-red-500 rounded-sm"></div>
                  <span>Removed lines</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-200 border-l-4 border-yellow-500 rounded-sm"></div>
                  <span>Modified lines</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded-sm"></div>
                  <span>Unchanged lines</span>
                </div>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-violet-200 dark:border-violet-800 mt-8">
            <h3 className="text-lg font-semibold mb-4">💡 How to Use</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-medium mb-2">Getting Started</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Paste your original text in the left panel</li>
                  <li>• Paste your modified text in the right panel</li>
                  <li>• Click "Compare Texts" to see differences</li>
                  <li>• Use "Load Sample" to try with example texts</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Features</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Side-by-side comparison view</li>
                  <li>• Line-by-line difference highlighting</li>
                  <li>• Statistics showing changes summary</li>
                  <li>• Export comparison report to clipboard</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
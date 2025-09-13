'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function MdToHtmlPage() {
  const [markdownInput, setMarkdownInput] = useState<string>('')
  const [htmlOutput, setHtmlOutput] = useState<string>('')
  const [viewMode, setViewMode] = useState<'split' | 'preview' | 'code'>('split')
  const [isConverting, setIsConverting] = useState<boolean>(false)
  const [autoConvert, setAutoConvert] = useState<boolean>(true)
  
  const markdownTextareaRef = useRef<HTMLTextAreaElement>(null)
  const htmlTextareaRef = useRef<HTMLTextAreaElement>(null)

  // Simple markdown to HTML converter
  const convertMarkdownToHtml = (markdown: string): string => {
    if (!markdown.trim()) return ''
    
    let html = markdown
    
    // Headers (h1-h6)
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>')
    html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>')
    
    // Code blocks (```code```)
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    
    // Inline code (`code`)
    html = html.replace(/`([^`]*)`/g, '<code>$1</code>')
    
    // Bold (**text** or __text__)
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>')
    
    // Italic (*text* or _text_)
    html = html.replace(/\*((?!\*).+?)\*/g, '<em>$1</em>')
    html = html.replace(/_((?!_).+?)_/g, '<em>$1</em>')
    
    // Strikethrough (~~text~~)
    html = html.replace(/~~(.*?)~~/g, '<del>$1</del>')
    
    // Links [text](url)
    html = html.replace(/\[([^\]]*)\]\(([^)]*)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // Images ![alt](url)
    html = html.replace(/!\[([^\]]*)\]\(([^)]*)\)/g, '<img src="$2" alt="$1" />')
    
    // Horizontal rules (--- or ***)
    html = html.replace(/^---$/gim, '<hr>')
    html = html.replace(/^\*\*\*$/gim, '<hr>')
    
    // Blockquotes (> text)
    html = html.replace(/^> (.*)$/gim, '<blockquote>$1</blockquote>')
    
    // Unordered lists (- item or * item)
    const lines = html.split('\n')
    let inList = false
    let processedLines: string[] = []
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const isListItem = /^[\s]*[-*] (.*)/.test(line)
      
      if (isListItem && !inList) {
        processedLines.push('<ul>')
        inList = true
      } else if (!isListItem && inList) {
        processedLines.push('</ul>')
        inList = false
      }
      
      if (isListItem) {
        processedLines.push(line.replace(/^[\s]*[-*] (.*)/, '<li>$1</li>'))
      } else {
        processedLines.push(line)
      }
    }
    
    if (inList) {
      processedLines.push('</ul>')
    }
    
    html = processedLines.join('\n')
    
    // Ordered lists (1. item)
    const orderedLines = html.split('\n')
    inList = false
    processedLines = []
    
    for (let i = 0; i < orderedLines.length; i++) {
      const line = orderedLines[i]
      const isOrderedItem = /^[\s]*\d+\. (.*)/.test(line)
      
      if (isOrderedItem && !inList) {
        processedLines.push('<ol>')
        inList = true
      } else if (!isOrderedItem && inList) {
        processedLines.push('</ol>')
        inList = false
      }
      
      if (isOrderedItem) {
        processedLines.push(line.replace(/^[\s]*\d+\. (.*)/, '<li>$1</li>'))
      } else {
        processedLines.push(line)
      }
    }
    
    if (inList) {
      processedLines.push('</ol>')
    }
    
    html = processedLines.join('\n')
    
    // Tables (| col1 | col2 |)
    const tableLines = html.split('\n')
    processedLines = []
    let inTable = false
    
    for (let i = 0; i < tableLines.length; i++) {
      const line = tableLines[i]
      const isTableRow = /^\|(.+)\|$/.test(line.trim())
      const isTableSeparator = /^\|[\s-:]+\|$/.test(line.trim())
      
      if (isTableRow && !inTable) {
        processedLines.push('<table>')
        processedLines.push('<thead>')
        inTable = true
      }
      
      if (isTableSeparator && inTable) {
        processedLines.push('</thead>')
        processedLines.push('<tbody>')
      }
      
      if (isTableRow && !isTableSeparator) {
        const cells = line.trim().slice(1, -1).split('|').map(cell => cell.trim())
        const tag = i === 0 || !inTable ? 'th' : 'td'
        processedLines.push(`<tr>${cells.map(cell => `<${tag}>${cell}</${tag}>`).join('')}</tr>`)
      } else if (!isTableRow && !isTableSeparator && inTable) {
        processedLines.push('</tbody>')
        processedLines.push('</table>')
        processedLines.push(line)
        inTable = false
      } else if (!isTableSeparator) {
        processedLines.push(line)
      }
    }
    
    if (inTable) {
      processedLines.push('</tbody>')
      processedLines.push('</table>')
    }
    
    html = processedLines.join('\n')
    
    // Line breaks (convert double newlines to paragraphs)
    html = html.replace(/\n\n/g, '</p><p>')
    html = html.replace(/^\s*/, '<p>').replace(/\s*$/, '</p>')
    
    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, '')
    html = html.replace(/<p>(<h[1-6]>)/g, '$1')
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1')
    html = html.replace(/<p>(<ul>|<ol>|<blockquote>|<pre>|<table>)/g, '$1')
    html = html.replace(/(<\/ul>|<\/ol>|<\/blockquote>|<\/pre>|<\/table>)<\/p>/g, '$1')
    html = html.replace(/<p>(<hr>)<\/p>/g, '$1')
    
    return html.trim()
  }

  // Auto-convert when markdown changes
  useEffect(() => {
    if (autoConvert) {
      const timeoutId = setTimeout(() => {
        setIsConverting(true)
        const html = convertMarkdownToHtml(markdownInput)
        setHtmlOutput(html)
        setIsConverting(false)
      }, 300) // 300ms debounce
      
      return () => clearTimeout(timeoutId)
    }
  }, [markdownInput, autoConvert])

  const handleManualConvert = () => {
    setIsConverting(true)
    setTimeout(() => {
      const html = convertMarkdownToHtml(markdownInput)
      setHtmlOutput(html)
      setIsConverting(false)
    }, 100)
  }

  const copyHtmlToClipboard = () => {
    navigator.clipboard.writeText(htmlOutput).then(() => {
      alert('HTML code copied to clipboard!')
    })
  }

  const downloadHtml = () => {
    const blob = new Blob([htmlOutput], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'converted.html'
    link.click()
    URL.revokeObjectURL(url)
  }

  const downloadFullHtml = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Converted Markdown</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        h1, h2, h3, h4, h5, h6 { color: #333; }
        code { background: #f4f4f4; padding: 2px 4px; border-radius: 4px; }
        pre { background: #f4f4f4; padding: 15px; border-radius: 8px; overflow-x: auto; }
        blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 20px; color: #666; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
        th { background-color: #f8f9fa; }
        img { max-width: 100%; height: auto; }
        a { color: #007bff; }
        hr { border: none; height: 1px; background: #ddd; }
    </style>
</head>
<body>
${htmlOutput}
</body>
</html>`
    
    const blob = new Blob([fullHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'converted-full.html'
    link.click()
    URL.revokeObjectURL(url)
  }

  const loadSampleMarkdown = () => {
    const sampleMd = `# Markdown to HTML Converter

Welcome to our **powerful** and *easy-to-use* Markdown to HTML converter!

## Features

- **Real-time conversion** with live preview
- Support for all major markdown syntax
- Copy and download functionality
- Clean, semantic HTML output

### Supported Syntax

1. Headers (H1-H6)
2. **Bold** and *italic* text
3. ~~Strikethrough~~ text
4. \`Inline code\` and code blocks
5. [Links](https://example.com) and images
6. Lists (ordered and unordered)
7. Tables and blockquotes

#### Code Example

\`\`\`javascript
function convertMarkdown(text) {
  return markdownToHtml(text);
}
\`\`\`

#### Blockquote

> This is a blockquote example.
> It can span multiple lines.

#### Table Example

| Feature | Supported |
|---------|-----------|
| Headers | ✅ |
| Lists | ✅ |
| Tables | ✅ |
| Links | ✅ |

---

**Try it out!** Edit this markdown and see the HTML output update in real-time.

![Sample Image](https://via.placeholder.com/300x200?text=Sample+Image)`

    setMarkdownInput(sampleMd)
  }

  const clearAll = () => {
    setMarkdownInput('')
    setHtmlOutput('')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-5 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/utilities" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-600 transition-colors mb-6"
          >
            ← Back to Utilities
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center">
              <span className="text-white text-2xl">📝</span>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
                Markdown to HTML Converter
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Convert Markdown syntax to clean, semantic HTML code
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-cyan-200 dark:border-cyan-800 mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="autoConvert"
                  checked={autoConvert}
                  onChange={(e) => setAutoConvert(e.target.checked)}
                />
                <label htmlFor="autoConvert" className="text-sm font-medium">
                  Auto-convert
                </label>
              </div>
              
              <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                {[
                  { value: 'split', label: 'Split', icon: '⚏' },
                  { value: 'preview', label: 'Preview', icon: '👁️' },
                  { value: 'code', label: 'Code', icon: '💻' }
                ].map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => setViewMode(mode.value as any)}
                    className={`flex items-center gap-2 py-1 px-3 rounded-md font-medium text-sm transition-colors ${
                      viewMode === mode.value
                        ? 'bg-white dark:bg-gray-600 text-cyan-600 shadow-sm'
                        : 'text-gray-600 dark:text-gray-300 hover:text-cyan-600'
                    }`}
                  >
                    <span>{mode.icon}</span>
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {!autoConvert && (
                <button
                  onClick={handleManualConvert}
                  disabled={isConverting || !markdownInput.trim()}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-2 px-6 rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed"
                >
                  {isConverting ? 'Converting...' : 'Convert to HTML'}
                </button>
              )}
              
              <button
                onClick={loadSampleMarkdown}
                className="border border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 py-2 px-4 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                Load Sample
              </button>
              
              <button
                onClick={clearAll}
                className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Clear All
              </button>
              
              {htmlOutput && (
                <>
                  <button
                    onClick={copyHtmlToClipboard}
                    className="border border-green-300 dark:border-green-600 text-green-600 dark:text-green-400 py-2 px-4 rounded-lg font-medium hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                  >
                    Copy HTML
                  </button>
                  
                  <button
                    onClick={downloadHtml}
                    className="border border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 py-2 px-4 rounded-lg font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                  >
                    Download HTML
                  </button>
                  
                  <button
                    onClick={downloadFullHtml}
                    className="border border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 py-2 px-4 rounded-lg font-medium hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
                  >
                    Download Full HTML
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Editor and Preview */}
          <div className={`grid gap-6 ${viewMode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
            {/* Markdown Input */}
            {(viewMode === 'split' || viewMode === 'code') && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-cyan-200 dark:border-cyan-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Markdown Input</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{markdownInput.split('\n').length} lines</span>
                    <span>{markdownInput.length} chars</span>
                  </div>
                </div>
                <textarea
                  ref={markdownTextareaRef}
                  value={markdownInput}
                  onChange={(e) => setMarkdownInput(e.target.value)}
                  placeholder="# Enter your Markdown here...

**Bold text** and *italic text*

- List item 1
- List item 2

[Link](https://example.com)

```code
Code block
```"
                  className="w-full h-96 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 font-mono text-sm"
                  spellCheck={false}
                />
              </div>
            )}

            {/* HTML Output */}
            {(viewMode === 'split' || viewMode === 'code') && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-cyan-200 dark:border-cyan-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">HTML Output</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{htmlOutput.split('\n').length} lines</span>
                    <span>{htmlOutput.length} chars</span>
                    {isConverting && <span className="text-cyan-600">Converting...</span>}
                  </div>
                </div>
                <textarea
                  ref={htmlTextareaRef}
                  value={htmlOutput}
                  readOnly
                  placeholder="HTML output will appear here..."
                  className="w-full h-96 p-4 border rounded-lg resize-none bg-gray-50 dark:bg-gray-700 font-mono text-sm"
                />
              </div>
            )}

            {/* Live Preview */}
            {(viewMode === 'split' || viewMode === 'preview') && (
              <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-cyan-200 dark:border-cyan-800 ${
                viewMode === 'preview' ? 'col-span-1' : ''
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Live Preview</h3>
                  <span className="text-sm text-muted-foreground">
                    Rendered HTML
                  </span>
                </div>
                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700 h-96 overflow-y-auto">
                  {htmlOutput ? (
                    <div 
                      className="prose prose-sm max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: htmlOutput }}
                      style={{
                        fontSize: '14px',
                        lineHeight: '1.6'
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <div className="text-center">
                        <span className="text-4xl mb-4 block">📄</span>
                        <p>Preview will appear here</p>
                        <p className="text-sm">Enter markdown text to see the rendered HTML</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Syntax Guide */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-cyan-200 dark:border-cyan-800 mt-8">
            <h3 className="text-lg font-semibold mb-4">📖 Markdown Syntax Guide</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-medium mb-2">Headers</h4>
                <div className="font-mono text-xs space-y-1 text-muted-foreground">
                  <div># H1 Header</div>
                  <div>## H2 Header</div>
                  <div>### H3 Header</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Text Formatting</h4>
                <div className="font-mono text-xs space-y-1 text-muted-foreground">
                  <div>**Bold text**</div>
                  <div>*Italic text*</div>
                  <div>~~Strikethrough~~</div>
                  <div>`Inline code`</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Lists</h4>
                <div className="font-mono text-xs space-y-1 text-muted-foreground">
                  <div>- Unordered item</div>
                  <div>* Another item</div>
                  <div>1. Ordered item</div>
                  <div>2. Second item</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Links & Images</h4>
                <div className="font-mono text-xs space-y-1 text-muted-foreground">
                  <div>[Link](URL)</div>
                  <div>![Image](URL)</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Code Blocks</h4>
                <div className="font-mono text-xs space-y-1 text-muted-foreground">
                  <div>```</div>
                  <div>Code here</div>
                  <div>```</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Other</h4>
                <div className="font-mono text-xs space-y-1 text-muted-foreground">
                  <div>> Blockquote</div>
                  <div>| Table | Cell |</div>
                  <div>---</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
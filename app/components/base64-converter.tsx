'use client'

import { useState, useRef } from 'react'

export function Base64Converter() {
  const [textInput, setTextInput] = useState('')
  const [base64Output, setBase64Output] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number; type: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const encodeText = (text: string) => {
    try {
      return btoa(unescape(encodeURIComponent(text)))
    } catch (error) {
      throw new Error('Failed to encode text')
    }
  }

  const decodeText = (base64: string) => {
    try {
      return decodeURIComponent(escape(atob(base64)))
    } catch (error) {
      throw new Error('Invalid Base64 string')
    }
  }

  const handleTextConversion = () => {
    try {
      if (mode === 'encode') {
        const encoded = encodeText(textInput)
        setBase64Output(encoded)
      } else {
        const decoded = decodeText(textInput)
        setBase64Output(decoded)
      }
    } catch (error) {
      setBase64Output(`Error: ${(error as Error).message}`)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setFileInfo({
      name: file.name,
      size: file.size,
      type: file.type
    })

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (mode === 'encode') {
        // For files, we get a data URL, extract the base64 part
        const base64 = result.split(',')[1]
        setBase64Output(base64)
      }
    }
    
    if (mode === 'encode') {
      reader.readAsDataURL(file)
    }
  }

  const downloadAsFile = () => {
    if (!base64Output) return

    try {
      let content = base64Output
      let filename = 'converted-file'
      let mimeType = 'text/plain'

      if (mode === 'decode') {
        // Try to determine if it's a file or text
        if (base64Output.includes('data:')) {
          // It's a data URL
          content = base64Output
          filename = 'decoded-file'
        } else {
          // It's decoded text
          content = base64Output
          filename = 'decoded-text.txt'
          mimeType = 'text/plain'
        }
        
        const blob = new Blob([content], { type: mimeType })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.click()
        URL.revokeObjectURL(url)
      } else {
        // For encoded data, save as .b64 file
        const blob = new Blob([content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${fileInfo?.name || 'encoded'}.b64`
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      // Fallback
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
  }

  const clearAll = () => {
    setTextInput('')
    setBase64Output('')
    setFileInfo(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const swapMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode'
    setMode(newMode)
    
    // Swap input and output
    const temp = textInput
    setTextInput(base64Output)
    setBase64Output(temp)
    
    clearFileInfo()
  }

  const clearFileInfo = () => {
    setFileInfo(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Base64 Encoder/Decoder</h2>
        <p className="text-sm text-muted-foreground">
          Encode text and files to Base64 or decode Base64 back to original format
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1 flex">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              mode === 'encode'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              mode === 'decode'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
            }`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {mode === 'encode' ? 'Input (Text/File)' : 'Input (Base64)'}
          </h3>
          
          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
            </label>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={
                mode === 'encode' 
                  ? 'Enter text to encode to Base64...' 
                  : 'Enter Base64 string to decode...'
              }
              className="w-full h-40 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm"
            />
          </div>

          {/* File Input (only for encoding) */}
          {mode === 'encode' && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Or Upload File to Encode
              </label>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {fileInfo && (
                <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
                  <div><strong>File:</strong> {fileInfo.name}</div>
                  <div><strong>Size:</strong> {formatFileSize(fileInfo.size)}</div>
                  <div><strong>Type:</strong> {fileInfo.type || 'Unknown'}</div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleTextConversion}
              disabled={!textInput.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
            </button>
            <button
              onClick={swapMode}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              title="Swap encode/decode mode"
            >
              ⇄
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {mode === 'encode' ? 'Output (Base64)' : 'Output (Decoded)'}
          </h3>
          
          <div>
            <label className="block text-sm font-medium mb-2">Result</label>
            <textarea
              value={base64Output}
              readOnly
              placeholder={
                mode === 'encode' 
                  ? 'Base64 encoded result will appear here...' 
                  : 'Decoded result will appear here...'
              }
              className="w-full h-40 p-3 border rounded-lg resize-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm"
            />
          </div>

          {/* Output Actions */}
          {base64Output && (
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(base64Output)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={downloadAsFile}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                Download
              </button>
            </div>
          )}

          <button
            onClick={clearAll}
            className="w-full text-sm px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="text-sm font-semibold mb-2">📋 About Base64 Encoding</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Converts binary data to ASCII text format</li>
            <li>• Safe for transmission over text-based protocols</li>
            <li>• Increases data size by approximately 33%</li>
            <li>• Uses A-Z, a-z, 0-9, +, / characters</li>
          </ul>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h4 className="text-sm font-semibold mb-2">🔧 Usage Tips</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Use for encoding images, files, or text</li>
            <li>• Perfect for embedding data in JSON/XML</li>
            <li>• Decode to retrieve original content</li>
            <li>• All processing happens in your browser</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
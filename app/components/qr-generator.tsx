'use client'

import { useState, useRef, useCallback, useMemo } from 'react'
import QRCode from 'qrcode'

export function QRGenerator() {
  const [text, setText] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Memoize QR code options for performance
  const qrOptions = useMemo(() => ({
    width: 300,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  }), [])

  const generateQRCode = useCallback(async () => {
    if (!text.trim()) return

    setIsGenerating(true)
    try {
      // Generate QR code as data URL
      const url = await QRCode.toDataURL(text, qrOptions)
      setQrCodeUrl(url)
    } catch (error) {
      console.error('Error generating QR code:', error)
    } finally {
      setIsGenerating(false)
    }
  }, [text, qrOptions])

  const downloadQRCode = useCallback(() => {
    if (!qrCodeUrl) return

    const link = document.createElement('a')
    link.download = `qrcode-${Date.now()}.png`
    link.href = qrCodeUrl
    link.click()
  }, [qrCodeUrl])

  const clearQRCode = useCallback(() => {
    setText('')
    setQrCodeUrl('')
  }, [])

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }, [])

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">QR Code Generator</h2>
        <p className="text-sm text-muted-foreground">
          Enter text or URL to generate a QR code
        </p>
      </div>

      <div className="space-y-4">
        {/* Input Section */}
        <div>
          <label htmlFor="qr-text" className="block text-sm font-medium mb-2">
            Text or URL
          </label>
          <textarea
            id="qr-text"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text, URL, or any content..."
            className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
            rows={3}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={generateQRCode}
            disabled={!text.trim() || isGenerating}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {isGenerating ? 'Generating...' : 'Generate QR Code'}
          </button>
          {qrCodeUrl && (
            <button
              onClick={clearQRCode}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* QR Code Display */}
        {qrCodeUrl && (
          <div className="text-center space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <img 
                src={qrCodeUrl} 
                alt="Generated QR Code" 
                className="mx-auto max-w-full"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={downloadQRCode}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Download PNG
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(qrCodeUrl)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                Copy Image
              </button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Right-click the QR code to save or copy
            </p>
          </div>
        )}

        {/* Quick Examples */}
        {!qrCodeUrl && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">Quick Examples:</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <button
                onClick={() => setText('https://junevergelquerol.com')}
                className="block text-left hover:text-blue-600 dark:hover:text-blue-400"
              >
                • Your portfolio website
              </button>
              <button
                onClick={() => setText('june@junevergelquerol.com')}
                className="block text-left hover:text-blue-600 dark:hover:text-blue-400"
              >
                • Email contact
              </button>
              <button
                onClick={() => setText('Hello, this is a QR code test!')}
                className="block text-left hover:text-blue-600 dark:hover:text-blue-400"
              >
                • Simple text message
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
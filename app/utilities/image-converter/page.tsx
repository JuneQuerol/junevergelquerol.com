'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

export default function ImageConverterPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [outputFormat, setOutputFormat] = useState<string>('png')
  const [quality, setQuality] = useState<number>(0.9)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedImageUrl, setProcessedImageUrl] = useState<string>('')
  const [originalImageUrl, setOriginalImageUrl] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const supportedFormats = [
    { value: 'png', label: 'PNG', description: 'Lossless compression, supports transparency' },
    { value: 'jpeg', label: 'JPEG', description: 'Lossy compression, smaller file size' },
    { value: 'webp', label: 'WebP', description: 'Modern format, excellent compression' },
    { value: 'bmp', label: 'BMP', description: 'Uncompressed bitmap format' }
  ]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setOriginalImageUrl(url)
      setProcessedImageUrl('') // Clear previous result
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const files = event.dataTransfer.files
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      const file = files[0]
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setOriginalImageUrl(url)
      setProcessedImageUrl('') // Clear previous result
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const convertImage = async () => {
    if (!selectedFile || !canvasRef.current) return

    setIsProcessing(true)

    try {
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current!
        const ctx = canvas.getContext('2d')!
        
        // Set canvas dimensions to match image
        canvas.width = img.width
        canvas.height = img.height
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0)
        
        // Convert to desired format
        const mimeType = outputFormat === 'jpeg' ? 'image/jpeg' : 
                        outputFormat === 'webp' ? 'image/webp' : 
                        outputFormat === 'bmp' ? 'image/bmp' : 'image/png'
        
        const dataURL = canvas.toDataURL(mimeType, quality)
        setProcessedImageUrl(dataURL)
        setIsProcessing(false)
      }
      
      img.onerror = () => {
        setIsProcessing(false)
        alert('Error loading image. Please try again.')
      }
      
      img.src = originalImageUrl
    } catch (error) {
      setIsProcessing(false)
      alert('Error converting image. Please try again.')
    }
  }

  const downloadImage = () => {
    if (!processedImageUrl) return

    const link = document.createElement('a')
    link.download = `converted-image.${outputFormat}`
    link.href = processedImageUrl
    link.click()
  }

  const resetConverter = () => {
    setSelectedFile(null)
    setOriginalImageUrl('')
    setProcessedImageUrl('')
    setIsProcessing(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getFileSize = (dataUrl: string): string => {
    const base64 = dataUrl.split(',')[1]
    const bytes = (base64.length * 3) / 4
    if (bytes < 1024) return `${bytes.toFixed(0)} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-5 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/utilities" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-rose-600 transition-colors mb-6"
          >
            ← Back to Utilities
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 flex items-center justify-center">
              <span className="text-white text-2xl">🖼️</span>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
                Picture Format Converter
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Convert images between PNG, JPEG, WebP, and BMP formats
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {/* File Upload */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-rose-200 dark:border-rose-800">
                <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
                
                {!selectedFile ? (
                  <div 
                    className="border-2 border-dashed border-rose-300 dark:border-rose-700 rounded-lg p-8 text-center cursor-pointer hover:border-rose-400 transition-colors"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-100 dark:bg-rose-900 flex items-center justify-center">
                      <span className="text-2xl">📁</span>
                    </div>
                    <p className="text-lg font-medium mb-2">Drop your image here</p>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
                    <p className="text-xs text-muted-foreground">Supports: PNG, JPEG, WebP, BMP, GIF</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🖼️</span>
                        <div>
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={resetConverter}
                        className="text-rose-600 hover:text-rose-800 font-medium text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    
                    {originalImageUrl && (
                      <div className="border rounded-lg overflow-hidden">
                        <img 
                          src={originalImageUrl} 
                          alt="Original" 
                          className="w-full h-48 object-contain bg-gray-50 dark:bg-gray-700"
                        />
                      </div>
                    )}
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Format Selection */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-rose-200 dark:border-rose-800">
                <h2 className="text-xl font-semibold mb-4">Output Format</h2>
                <div className="space-y-3">
                  {supportedFormats.map((format) => (
                    <label key={format.value} className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
                      <input
                        type="radio"
                        name="format"
                        value={format.value}
                        checked={outputFormat === format.value}
                        onChange={(e) => setOutputFormat(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{format.label}</p>
                        <p className="text-sm text-muted-foreground">{format.description}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Quality Slider for JPEG/WebP */}
                {(outputFormat === 'jpeg' || outputFormat === 'webp') && (
                  <div className="mt-6 pt-4 border-t">
                    <label className="block text-sm font-medium mb-2">
                      Quality: {Math.round(quality * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                )}
              </div>

              {/* Convert Button */}
              <button
                onClick={convertImage}
                disabled={!selectedFile || isProcessing}
                className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Converting...' : 'Convert Image'}
              </button>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-rose-200 dark:border-rose-800">
                <h2 className="text-xl font-semibold mb-4">Converted Image</h2>
                
                {!processedImageUrl ? (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-2xl">⏳</span>
                    </div>
                    <p className="text-lg font-medium mb-2">Converted image will appear here</p>
                    <p className="text-sm text-muted-foreground">Upload an image and click convert to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                      <img 
                        src={processedImageUrl} 
                        alt="Converted" 
                        className="w-full h-48 object-contain bg-gray-50 dark:bg-gray-700"
                      />
                    </div>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Converted to {outputFormat.toUpperCase()}</span>
                        <span className="text-sm text-muted-foreground">
                          {getFileSize(processedImageUrl)}
                        </span>
                      </div>
                      <button
                        onClick={downloadImage}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                      >
                        Download Image
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Format Information */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-rose-200 dark:border-rose-800">
                <h3 className="text-lg font-semibold mb-4">Format Guide</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium">PNG</p>
                    <p className="text-muted-foreground">Best for images with transparency, logos, and graphics</p>
                  </div>
                  <div>
                    <p className="font-medium">JPEG</p>
                    <p className="text-muted-foreground">Best for photographs and images with many colors</p>
                  </div>
                  <div>
                    <p className="font-medium">WebP</p>
                    <p className="text-muted-foreground">Modern format with excellent compression for web use</p>
                  </div>
                  <div>
                    <p className="font-medium">BMP</p>
                    <p className="text-muted-foreground">Uncompressed format for maximum quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </main>
  )
}
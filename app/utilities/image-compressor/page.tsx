'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

export default function ImageCompressorPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [originalImageUrl, setOriginalImageUrl] = useState<string>('')
  const [compressedImageUrl, setCompressedImageUrl] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [compressionMode, setCompressionMode] = useState<'quality' | 'size' | 'custom'>('quality')
  
  // Compression options
  const [quality, setQuality] = useState<number>(80)
  const [targetSize, setTargetSize] = useState<number>(500) // KB
  const [outputFormat, setOutputFormat] = useState<string>('jpeg')
  const [maxWidth, setMaxWidth] = useState<number>(1920)
  const [maxHeight, setMaxHeight] = useState<number>(1080)
  const [enableResize, setEnableResize] = useState<boolean>(false)
  
  // File info
  const [originalSize, setOriginalSize] = useState<number>(0)
  const [compressedSize, setCompressedSize] = useState<number>(0)
  const [originalDimensions, setOriginalDimensions] = useState<{width: number, height: number} | null>(null)
  const [compressedDimensions, setCompressedDimensions] = useState<{width: number, height: number} | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const qualityPresets = [
    { value: 95, label: 'Maximum', description: 'Highest quality, larger file' },
    { value: 85, label: 'High', description: 'Great quality, good balance' },
    { value: 75, label: 'Medium', description: 'Good quality, smaller file' },
    { value: 60, label: 'Low', description: 'Acceptable quality, very small' },
    { value: 40, label: 'Minimum', description: 'Poor quality, tiny file' }
  ]

  const sizeTargets = [
    { value: 100, label: '100 KB', description: 'Ultra compressed' },
    { value: 250, label: '250 KB', description: 'Highly compressed' },
    { value: 500, label: '500 KB', description: 'Well compressed' },
    { value: 1024, label: '1 MB', description: 'Moderately compressed' },
    { value: 2048, label: '2 MB', description: 'Lightly compressed' }
  ]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const files = event.dataTransfer.files
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      processFile(files[0])
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const processFile = (file: File) => {
    setSelectedFile(file)
    setOriginalSize(file.size)
    const url = URL.createObjectURL(file)
    setOriginalImageUrl(url)
    setCompressedImageUrl('')
    
    // Get original dimensions
    const img = new Image()
    img.onload = () => {
      setOriginalDimensions({ width: img.width, height: img.height })
      // Auto-adjust max dimensions based on original size
      if (img.width > 1920 || img.height > 1080) {
        setEnableResize(true)
      }
    }
    img.src = url
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const getFileSizeFromDataUrl = (dataUrl: string): number => {
    const base64 = dataUrl.split(',')[1]
    return (base64.length * 3) / 4
  }

  const compressToTargetSize = async (img: HTMLImageElement, targetBytes: number): Promise<string> => {
    let currentQuality = 90
    let result = ''
    let attempts = 0
    const maxAttempts = 10

    while (attempts < maxAttempts) {
      const canvas = canvasRef.current!
      const ctx = canvas.getContext('2d')!
      
      // Calculate dimensions
      let { width, height } = originalDimensions!
      if (enableResize && (width > maxWidth || height > maxHeight)) {
        const aspectRatio = width / height
        if (width > height) {
          width = Math.min(width, maxWidth)
          height = width / aspectRatio
        } else {
          height = Math.min(height, maxHeight)
          width = height * aspectRatio
        }
      }
      
      canvas.width = width
      canvas.height = height
      
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, 0, 0, width, height)
      
      const mimeType = outputFormat === 'png' ? 'image/png' : 'image/jpeg'
      result = canvas.toDataURL(mimeType, currentQuality / 100)
      
      const currentSize = getFileSizeFromDataUrl(result)
      
      if (currentSize <= targetBytes || currentQuality <= 10) {
        break
      }
      
      // Reduce quality for next attempt
      currentQuality -= 10
      attempts++
    }
    
    return result
  }

  const compressImage = async () => {
    if (!selectedFile || !canvasRef.current || !originalDimensions) return

    setIsProcessing(true)

    try {
      const img = new Image()
      img.onload = async () => {
        const canvas = canvasRef.current!
        const ctx = canvas.getContext('2d')!
        
        let result = ''
        let finalWidth = originalDimensions.width
        let finalHeight = originalDimensions.height
        
        // Calculate final dimensions
        if (enableResize && (finalWidth > maxWidth || finalHeight > maxHeight)) {
          const aspectRatio = finalWidth / finalHeight
          if (finalWidth > finalHeight) {
            finalWidth = Math.min(finalWidth, maxWidth)
            finalHeight = finalWidth / aspectRatio
          } else {
            finalHeight = Math.min(finalHeight, maxHeight)
            finalWidth = finalHeight * aspectRatio
          }
        }
        
        canvas.width = finalWidth
        canvas.height = finalHeight
        setCompressedDimensions({ width: finalWidth, height: finalHeight })
        
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, finalWidth, finalHeight)
        
        const mimeType = outputFormat === 'png' ? 'image/png' : 'image/jpeg'
        
        if (compressionMode === 'size') {
          // Compress to target file size
          result = await compressToTargetSize(img, targetSize * 1024)
        } else {
          // Compress by quality
          const finalQuality = compressionMode === 'quality' ? quality / 100 : quality / 100
          result = canvas.toDataURL(mimeType, finalQuality)
        }
        
        setCompressedImageUrl(result)
        setCompressedSize(getFileSizeFromDataUrl(result))
        setIsProcessing(false)
      }
      
      img.onerror = () => {
        setIsProcessing(false)
        alert('Error loading image. Please try again.')
      }
      
      img.src = originalImageUrl
    } catch (error) {
      setIsProcessing(false)
      alert('Error compressing image. Please try again.')
    }
  }

  const downloadImage = () => {
    if (!compressedImageUrl) return

    const link = document.createElement('a')
    const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1)
    link.download = `compressed-${compressionRatio}%-${selectedFile?.name || 'image.jpg'}`
    link.href = compressedImageUrl
    link.click()
  }

  const resetCompressor = () => {
    setSelectedFile(null)
    setOriginalImageUrl('')
    setCompressedImageUrl('')
    setOriginalSize(0)
    setCompressedSize(0)
    setOriginalDimensions(null)
    setCompressedDimensions(null)
    setIsProcessing(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const compressionRatio = originalSize > 0 && compressedSize > 0 
    ? ((originalSize - compressedSize) / originalSize * 100).toFixed(1)
    : '0'

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-5 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/utilities" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-amber-600 transition-colors mb-6"
          >
            ← Back to Utilities
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center">
              <span className="text-white text-2xl">🗜️</span>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
                Image Compressor
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Reduce image file size while maintaining quality
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* File Upload */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-amber-800">
                <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
                
                {!selectedFile ? (
                  <div 
                    className="border-2 border-dashed border-amber-300 dark:border-amber-700 rounded-lg p-8 text-center cursor-pointer hover:border-amber-400 transition-colors"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                      <span className="text-2xl">📁</span>
                    </div>
                    <p className="text-lg font-medium mb-2">Drop your image here</p>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
                    <p className="text-xs text-muted-foreground">Supports: PNG, JPEG, WebP, GIF</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🖼️</span>
                        <div>
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {originalDimensions && `${originalDimensions.width} × ${originalDimensions.height}`} • {formatFileSize(originalSize)}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={resetCompressor}
                        className="text-amber-600 hover:text-amber-800 font-medium text-sm"
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

              {/* Compression Options */}
              {selectedFile && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-amber-800">
                  <h2 className="text-xl font-semibold mb-4">Compression Settings</h2>
                  
                  {/* Compression Mode Tabs */}
                  <div className="flex space-x-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg mb-6">
                    {[
                      { value: 'quality', label: 'By Quality', icon: '⭐' },
                      { value: 'size', label: 'Target Size', icon: '📦' },
                      { value: 'custom', label: 'Custom', icon: '⚙️' }
                    ].map((mode) => (
                      <button
                        key={mode.value}
                        onClick={() => setCompressionMode(mode.value as any)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${
                          compressionMode === mode.value
                            ? 'bg-white dark:bg-gray-600 text-amber-600 shadow-sm'
                            : 'text-gray-600 dark:text-gray-300 hover:text-amber-600'
                        }`}
                      >
                        <span>{mode.icon}</span>
                        {mode.label}
                      </button>
                    ))}
                  </div>

                  {/* Output Format */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-3">Output Format</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="jpeg"
                          checked={outputFormat === 'jpeg'}
                          onChange={(e) => setOutputFormat(e.target.value)}
                        />
                        <span className="text-sm">JPEG (Better compression)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="png"
                          checked={outputFormat === 'png'}
                          onChange={(e) => setOutputFormat(e.target.value)}
                        />
                        <span className="text-sm">PNG (Preserve transparency)</span>
                      </label>
                    </div>
                  </div>

                  {/* Quality Mode */}
                  {compressionMode === 'quality' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                        {qualityPresets.map((preset) => (
                          <label key={preset.value} className="flex flex-col p-3 border rounded-lg cursor-pointer hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors">
                            <input
                              type="radio"
                              name="qualityPreset"
                              value={preset.value}
                              checked={quality === preset.value}
                              onChange={() => setQuality(preset.value)}
                              className="mb-2"
                            />
                            <span className="font-medium text-sm">{preset.label}</span>
                            <span className="text-xs text-muted-foreground">{preset.value}%</span>
                            <span className="text-xs text-muted-foreground mt-1">{preset.description}</span>
                          </label>
                        ))}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Custom Quality: {quality}%
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          step="5"
                          value={quality}
                          onChange={(e) => setQuality(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>10% (Smallest)</span>
                          <span>100% (Original)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Target Size Mode */}
                  {compressionMode === 'size' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                        {sizeTargets.map((target) => (
                          <label key={target.value} className="flex flex-col p-3 border rounded-lg cursor-pointer hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors">
                            <input
                              type="radio"
                              name="sizeTarget"
                              value={target.value}
                              checked={targetSize === target.value}
                              onChange={() => setTargetSize(target.value)}
                              className="mb-2"
                            />
                            <span className="font-medium text-sm">{target.label}</span>
                            <span className="text-xs text-muted-foreground mt-1">{target.description}</span>
                          </label>
                        ))}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Target Size: {targetSize} KB
                        </label>
                        <input
                          type="range"
                          min="50"
                          max="5000"
                          step="50"
                          value={targetSize}
                          onChange={(e) => setTargetSize(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>50 KB</span>
                          <span>5 MB</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Custom Mode */}
                  {compressionMode === 'custom' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Quality: {quality}%
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          step="1"
                          value={quality}
                          onChange={(e) => setQuality(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <input
                            type="checkbox"
                            id="enableResize"
                            checked={enableResize}
                            onChange={(e) => setEnableResize(e.target.checked)}
                          />
                          <label htmlFor="enableResize" className="text-sm font-medium">
                            Resize image to reduce file size
                          </label>
                        </div>
                        
                        {enableResize && (
                          <div className="grid grid-cols-2 gap-4 pl-6">
                            <div>
                              <label className="block text-sm font-medium mb-2">Max Width</label>
                              <input
                                type="number"
                                value={maxWidth}
                                onChange={(e) => setMaxWidth(Number(e.target.value))}
                                className="w-full p-2 border rounded-lg"
                                min="100"
                                max="4000"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Max Height</label>
                              <input
                                type="number"
                                value={maxHeight}
                                onChange={(e) => setMaxHeight(Number(e.target.value))}
                                className="w-full p-2 border rounded-lg"
                                min="100"
                                max="4000"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Compress Button */}
                  <button
                    onClick={compressImage}
                    disabled={isProcessing}
                    className="w-full mt-6 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Compressing...' : 'Compress Image'}
                  </button>
                </div>
              )}
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-amber-800">
                <h2 className="text-xl font-semibold mb-4">Compressed Image</h2>
                
                {!compressedImageUrl ? (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-2xl">⏳</span>
                    </div>
                    <p className="text-lg font-medium mb-2">Compressed image will appear here</p>
                    <p className="text-sm text-muted-foreground">Upload an image and adjust compression settings</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                      <img 
                        src={compressedImageUrl} 
                        alt="Compressed" 
                        className="w-full h-48 object-contain bg-gray-50 dark:bg-gray-700"
                      />
                    </div>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span>Original:</span>
                          <span className="font-medium">{formatFileSize(originalSize)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Compressed:</span>
                          <span className="font-medium">{formatFileSize(compressedSize)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Savings:</span>
                          <span className="font-medium text-green-600">{compressionRatio}%</span>
                        </div>
                        {compressedDimensions && (
                          <div className="flex justify-between text-sm">
                            <span>Dimensions:</span>
                            <span className="font-medium">{compressedDimensions.width} × {compressedDimensions.height}</span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={downloadImage}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                      >
                        Download Compressed Image
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Compression Tips */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-amber-800">
                <h3 className="text-lg font-semibold mb-4">💡 Compression Tips</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">JPEG vs PNG</p>
                    <p className="text-muted-foreground">Use JPEG for photos, PNG for graphics with transparency</p>
                  </div>
                  <div>
                    <p className="font-medium">Quality Balance</p>
                    <p className="text-muted-foreground">70-85% quality offers good balance of size and quality</p>
                  </div>
                  <div>
                    <p className="font-medium">Web Optimization</p>
                    <p className="text-muted-foreground">Target under 500KB for web images, 100KB for thumbnails</p>
                  </div>
                  <div>
                    <p className="font-medium">Resize First</p>
                    <p className="text-muted-foreground">Reducing dimensions dramatically decreases file size</p>
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
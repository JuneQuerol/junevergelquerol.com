'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

export default function ImageResizerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [originalImageUrl, setOriginalImageUrl] = useState<string>('')
  const [resizedImageUrl, setResizedImageUrl] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [resizeMode, setResizeMode] = useState<'percentage' | 'pixels' | 'preset'>('percentage')
  
  // Resize options
  const [percentage, setPercentage] = useState<number>(50)
  const [targetWidth, setTargetWidth] = useState<number>(800)
  const [targetHeight, setTargetHeight] = useState<number>(600)
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true)
  const [selectedPreset, setSelectedPreset] = useState<string>('hd')
  
  // Image info
  const [originalDimensions, setOriginalDimensions] = useState<{width: number, height: number} | null>(null)
  const [resizedDimensions, setResizedDimensions] = useState<{width: number, height: number} | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const presetSizes = [
    { value: 'thumbnail', label: 'Thumbnail', width: 150, height: 150 },
    { value: 'small', label: 'Small', width: 320, height: 240 },
    { value: 'medium', label: 'Medium', width: 640, height: 480 },
    { value: 'large', label: 'Large', width: 1024, height: 768 },
    { value: 'hd', label: 'HD (720p)', width: 1280, height: 720 },
    { value: 'fhd', label: 'Full HD (1080p)', width: 1920, height: 1080 },
    { value: 'instagram_square', label: 'Instagram Square', width: 1080, height: 1080 },
    { value: 'instagram_story', label: 'Instagram Story', width: 1080, height: 1920 },
    { value: 'facebook_cover', label: 'Facebook Cover', width: 1200, height: 630 },
    { value: 'twitter_header', label: 'Twitter Header', width: 1500, height: 500 }
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
    const url = URL.createObjectURL(file)
    setOriginalImageUrl(url)
    setResizedImageUrl('')
    
    // Get original dimensions
    const img = new Image()
    img.onload = () => {
      setOriginalDimensions({ width: img.width, height: img.height })
      // Auto-adjust target dimensions based on aspect ratio
      if (maintainAspectRatio && resizeMode === 'pixels') {
        const aspectRatio = img.width / img.height
        if (targetWidth / targetHeight !== aspectRatio) {
          setTargetHeight(Math.round(targetWidth / aspectRatio))
        }
      }
    }
    img.src = url
  }

  const calculateDimensions = () => {
    if (!originalDimensions) return { width: 0, height: 0 }

    switch (resizeMode) {
      case 'percentage':
        return {
          width: Math.round(originalDimensions.width * (percentage / 100)),
          height: Math.round(originalDimensions.height * (percentage / 100))
        }
      
      case 'pixels':
        if (maintainAspectRatio) {
          const aspectRatio = originalDimensions.width / originalDimensions.height
          const newWidth = targetWidth
          const newHeight = Math.round(newWidth / aspectRatio)
          return { width: newWidth, height: newHeight }
        }
        return { width: targetWidth, height: targetHeight }
      
      case 'preset':
        const preset = presetSizes.find(p => p.value === selectedPreset)
        if (!preset) return { width: 0, height: 0 }
        
        if (maintainAspectRatio) {
          const aspectRatio = originalDimensions.width / originalDimensions.height
          const presetAspectRatio = preset.width / preset.height
          
          if (aspectRatio > presetAspectRatio) {
            // Wider image - fit to width
            return {
              width: preset.width,
              height: Math.round(preset.width / aspectRatio)
            }
          } else {
            // Taller image - fit to height
            return {
              width: Math.round(preset.height * aspectRatio),
              height: preset.height
            }
          }
        }
        return { width: preset.width, height: preset.height }
      
      default:
        return { width: 0, height: 0 }
    }
  }

  const resizeImage = async () => {
    if (!selectedFile || !canvasRef.current || !originalDimensions) return

    setIsProcessing(true)

    try {
      const dimensions = calculateDimensions()
      setResizedDimensions(dimensions)
      
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current!
        const ctx = canvas.getContext('2d')!
        
        // Set canvas dimensions
        canvas.width = dimensions.width
        canvas.height = dimensions.height
        
        // Enable image smoothing for better quality
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        
        // Draw resized image
        ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height)
        
        // Convert to data URL
        const dataURL = canvas.toDataURL('image/png', 0.9)
        setResizedImageUrl(dataURL)
        setIsProcessing(false)
      }
      
      img.onerror = () => {
        setIsProcessing(false)
        alert('Error loading image. Please try again.')
      }
      
      img.src = originalImageUrl
    } catch (error) {
      setIsProcessing(false)
      alert('Error resizing image. Please try again.')
    }
  }

  const downloadImage = () => {
    if (!resizedImageUrl) return

    const link = document.createElement('a')
    const dimensions = calculateDimensions()
    link.download = `resized-${dimensions.width}x${dimensions.height}-${selectedFile?.name || 'image.png'}`
    link.href = resizedImageUrl
    link.click()
  }

  const resetResizer = () => {
    setSelectedFile(null)
    setOriginalImageUrl('')
    setResizedImageUrl('')
    setOriginalDimensions(null)
    setResizedDimensions(null)
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

  // Auto-update height when width changes and aspect ratio is maintained
  const handleWidthChange = (width: number) => {
    setTargetWidth(width)
    if (maintainAspectRatio && originalDimensions) {
      const aspectRatio = originalDimensions.width / originalDimensions.height
      setTargetHeight(Math.round(width / aspectRatio))
    }
  }

  const handleHeightChange = (height: number) => {
    setTargetHeight(height)
    if (maintainAspectRatio && originalDimensions) {
      const aspectRatio = originalDimensions.width / originalDimensions.height
      setTargetWidth(Math.round(height * aspectRatio))
    }
  }

  const previewDimensions = calculateDimensions()

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-5 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/utilities" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-600 transition-colors mb-6"
          >
            ← Back to Utilities
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center">
              <span className="text-white text-2xl">📏</span>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
                Image Resizer
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Resize images by percentage, pixels, or preset dimensions
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* File Upload */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-emerald-200 dark:border-emerald-800">
                <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
                
                {!selectedFile ? (
                  <div 
                    className="border-2 border-dashed border-emerald-300 dark:border-emerald-700 rounded-lg p-8 text-center cursor-pointer hover:border-emerald-400 transition-colors"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                      <span className="text-2xl">📁</span>
                    </div>
                    <p className="text-lg font-medium mb-2">Drop your image here</p>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
                    <p className="text-xs text-muted-foreground">Supports: PNG, JPEG, WebP, GIF</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🖼️</span>
                        <div>
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {originalDimensions && `${originalDimensions.width} × ${originalDimensions.height}`} • {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={resetResizer}
                        className="text-emerald-600 hover:text-emerald-800 font-medium text-sm"
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

              {/* Resize Options */}
              {selectedFile && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-emerald-200 dark:border-emerald-800">
                  <h2 className="text-xl font-semibold mb-4">Resize Options</h2>
                  
                  {/* Resize Mode Tabs */}
                  <div className="flex space-x-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg mb-6">
                    {[
                      { value: 'percentage', label: 'Percentage', icon: '%' },
                      { value: 'pixels', label: 'Custom', icon: '📐' },
                      { value: 'preset', label: 'Preset', icon: '📱' }
                    ].map((mode) => (
                      <button
                        key={mode.value}
                        onClick={() => setResizeMode(mode.value as any)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${
                          resizeMode === mode.value
                            ? 'bg-white dark:bg-gray-600 text-emerald-600 shadow-sm'
                            : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600'
                        }`}
                      >
                        <span>{mode.icon}</span>
                        {mode.label}
                      </button>
                    ))}
                  </div>

                  {/* Percentage Mode */}
                  {resizeMode === 'percentage' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Scale: {percentage}%
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="200"
                          step="5"
                          value={percentage}
                          onChange={(e) => setPercentage(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>10%</span>
                          <span>200%</span>
                        </div>
                      </div>
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <p className="text-sm">
                          <strong>New size:</strong> {previewDimensions.width} × {previewDimensions.height} px
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Custom Pixels Mode */}
                  {resizeMode === 'pixels' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <input
                          type="checkbox"
                          id="maintainAspect"
                          checked={maintainAspectRatio}
                          onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                        />
                        <label htmlFor="maintainAspect" className="text-sm font-medium">
                          Maintain aspect ratio
                        </label>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Width (px)</label>
                          <input
                            type="number"
                            value={targetWidth}
                            onChange={(e) => handleWidthChange(Number(e.target.value))}
                            className="w-full p-2 border rounded-lg"
                            min="1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Height (px)</label>
                          <input
                            type="number"
                            value={targetHeight}
                            onChange={(e) => handleHeightChange(Number(e.target.value))}
                            className="w-full p-2 border rounded-lg"
                            min="1"
                            disabled={maintainAspectRatio}
                          />
                        </div>
                      </div>
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <p className="text-sm">
                          <strong>New size:</strong> {previewDimensions.width} × {previewDimensions.height} px
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Preset Mode */}
                  {resizeMode === 'preset' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <input
                          type="checkbox"
                          id="maintainAspectPreset"
                          checked={maintainAspectRatio}
                          onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                        />
                        <label htmlFor="maintainAspectPreset" className="text-sm font-medium">
                          Maintain aspect ratio (fit within preset)
                        </label>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {presetSizes.map((preset) => (
                          <label key={preset.value} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                            <input
                              type="radio"
                              name="preset"
                              value={preset.value}
                              checked={selectedPreset === preset.value}
                              onChange={(e) => setSelectedPreset(e.target.value)}
                              className="mr-3"
                            />
                            <div>
                              <p className="font-medium text-sm">{preset.label}</p>
                              <p className="text-xs text-muted-foreground">{preset.width} × {preset.height}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <p className="text-sm">
                          <strong>New size:</strong> {previewDimensions.width} × {previewDimensions.height} px
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Resize Button */}
                  <button
                    onClick={resizeImage}
                    disabled={isProcessing}
                    className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Resizing...' : 'Resize Image'}
                  </button>
                </div>
              )}
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-emerald-200 dark:border-emerald-800">
                <h2 className="text-xl font-semibold mb-4">Resized Image</h2>
                
                {!resizedImageUrl ? (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-2xl">⏳</span>
                    </div>
                    <p className="text-lg font-medium mb-2">Resized image will appear here</p>
                    <p className="text-sm text-muted-foreground">Upload an image and set your resize options</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                      <img 
                        src={resizedImageUrl} 
                        alt="Resized" 
                        className="w-full h-48 object-contain bg-gray-50 dark:bg-gray-700"
                      />
                    </div>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span>Dimensions:</span>
                          <span className="font-medium">{resizedDimensions?.width} × {resizedDimensions?.height}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>File Size:</span>
                          <span className="font-medium">{getFileSize(resizedImageUrl)}</span>
                        </div>
                      </div>
                      <button
                        onClick={downloadImage}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                      >
                        Download Resized Image
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Resize Tips */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-emerald-200 dark:border-emerald-800">
                <h3 className="text-lg font-semibold mb-4">💡 Resize Tips</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">Maintain Quality</p>
                    <p className="text-muted-foreground">Use PNG format for images with transparency or sharp edges</p>
                  </div>
                  <div>
                    <p className="font-medium">Web Optimization</p>
                    <p className="text-muted-foreground">Resize to 1920px width max for web images</p>
                  </div>
                  <div>
                    <p className="font-medium">Social Media</p>
                    <p className="text-muted-foreground">Use preset sizes for perfect social media dimensions</p>
                  </div>
                  <div>
                    <p className="font-medium">Aspect Ratio</p>
                    <p className="text-muted-foreground">Keep aspect ratio locked to avoid image distortion</p>
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
'use client'

import { useState } from 'react'

export function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#3b82f6')
  const [colorHistory, setColorHistory] = useState<string[]>(['#3b82f6'])

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  // Convert hex to HSL
  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return null
    
    const r = rgb.r / 255
    const g = rgb.g / 255
    const b = rgb.b / 255
    
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2
    
    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
        default: h = 0
      }
      h /= 6
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  const rgb = hexToRgb(selectedColor)
  const hsl = hexToHsl(selectedColor)

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    if (!colorHistory.includes(color)) {
      setColorHistory(prev => [color, ...prev.slice(0, 19)]) // Keep last 20 colors
    }
  }

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const predefinedColors = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
    '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
    '#8b5cf6', '#a855f7', '#c084fc', '#d946ef', '#ec4899', '#f43f5e',
    '#000000', '#374151', '#6b7280', '#9ca3af', '#d1d5db', '#ffffff'
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Color Picker</h2>
        <p className="text-sm text-muted-foreground">
          Pick colors and get their values in different formats
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Color Picker Section */}
        <div className="space-y-6">
          {/* Main Color Picker */}
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div 
                className="w-32 h-32 rounded-lg border-4 border-gray-200 dark:border-gray-600 shadow-lg cursor-pointer relative"
                style={{ backgroundColor: selectedColor }}
              >
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="hex-input" className="block text-sm font-medium mb-2">
                Hex Color
              </label>
              <input
                id="hex-input"
                type="text"
                value={selectedColor}
                onChange={(e) => {
                  const value = e.target.value
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                    setSelectedColor(value)
                  }
                }}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
                placeholder="#3b82f6"
              />
            </div>
          </div>

          {/* Predefined Colors */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Quick Colors</h4>
            <div className="grid grid-cols-6 gap-2">
              {predefinedColors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => handleColorChange(color)}
                  className="w-8 h-8 rounded border-2 border-gray-200 dark:border-gray-600 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Color History */}
          {colorHistory.length > 1 && (
            <div>
              <h4 className="text-sm font-semibold mb-3">Recent Colors</h4>
              <div className="flex flex-wrap gap-2">
                {colorHistory.slice(0, 10).map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Color Values Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Color Values</h4>
          
          {/* Hex */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">HEX</span>
              <button
                onClick={() => copyToClipboard(selectedColor, 'HEX')}
                className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Copy
              </button>
            </div>
            <code className="text-lg font-mono">{selectedColor.toUpperCase()}</code>
          </div>

          {/* RGB */}
          {rgb && (
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">RGB</span>
                <button
                  onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'RGB')}
                  className="text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Copy
                </button>
              </div>
              <code className="text-lg font-mono">rgb({rgb.r}, {rgb.g}, {rgb.b})</code>
              <div className="text-xs text-muted-foreground mt-1">
                R: {rgb.r} | G: {rgb.g} | B: {rgb.b}
              </div>
            </div>
          )}

          {/* HSL */}
          {hsl && (
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">HSL</span>
                <button
                  onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'HSL')}
                  className="text-xs px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                >
                  Copy
                </button>
              </div>
              <code className="text-lg font-mono">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</code>
              <div className="text-xs text-muted-foreground mt-1">
                H: {hsl.h}° | S: {hsl.s}% | L: {hsl.l}%
              </div>
            </div>
          )}

          {/* CSS Variables */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">CSS Custom Property</span>
              <button
                onClick={() => copyToClipboard(`--color: ${selectedColor};`, 'CSS')}
                className="text-xs px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
              >
                Copy
              </button>
            </div>
            <code className="text-sm font-mono">--color: {selectedColor};</code>
          </div>

          {/* Tailwind */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Tailwind CSS</span>
              <button
                onClick={() => copyToClipboard(`[${selectedColor}]`, 'Tailwind')}
                className="text-xs px-2 py-1 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors"
              >
                Copy
              </button>
            </div>
            <code className="text-sm font-mono">bg-[{selectedColor}]</code>
            <div className="text-xs text-muted-foreground mt-1">
              text-[{selectedColor}] | border-[{selectedColor}]
            </div>
          </div>
        </div>
      </div>

      {/* Color Accessibility Section */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="text-sm font-semibold mb-2">Preview</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded text-white text-center" style={{ backgroundColor: selectedColor }}>
            White text on color
          </div>
          <div className="p-3 rounded text-black text-center bg-white border" style={{ color: selectedColor }}>
            Color text on white
          </div>
        </div>
      </div>
    </div>
  )
}
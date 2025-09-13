'use client'

import { useState, useEffect } from 'react'

export function UnitConverter() {
  const [selectedCategory, setSelectedCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState('')
  const [toUnit, setToUnit] = useState('')
  const [fromValue, setFromValue] = useState('')
  const [toValue, setToValue] = useState('')

  const categories = {
    length: {
      name: 'Length',
      icon: '📏',
      units: {
        mm: { name: 'Millimeters', factor: 0.001 },
        cm: { name: 'Centimeters', factor: 0.01 },
        m: { name: 'Meters', factor: 1 },
        km: { name: 'Kilometers', factor: 1000 },
        in: { name: 'Inches', factor: 0.0254 },
        ft: { name: 'Feet', factor: 0.3048 },
        yd: { name: 'Yards', factor: 0.9144 },
        mi: { name: 'Miles', factor: 1609.34 }
      }
    },
    weight: {
      name: 'Weight',
      icon: '⚖️',
      units: {
        mg: { name: 'Milligrams', factor: 0.000001 },
        g: { name: 'Grams', factor: 0.001 },
        kg: { name: 'Kilograms', factor: 1 },
        oz: { name: 'Ounces', factor: 0.0283495 },
        lb: { name: 'Pounds', factor: 0.453592 },
        stone: { name: 'Stone', factor: 6.35029 },
        ton: { name: 'Metric Tons', factor: 1000 }
      }
    },
    temperature: {
      name: 'Temperature',
      icon: '🌡️',
      units: {
        c: { name: 'Celsius', factor: 1 },
        f: { name: 'Fahrenheit', factor: 1 },
        k: { name: 'Kelvin', factor: 1 }
      }
    },
    area: {
      name: 'Area',
      icon: '🗺️',
      units: {
        sqmm: { name: 'Square Millimeters', factor: 0.000001 },
        sqcm: { name: 'Square Centimeters', factor: 0.0001 },
        sqm: { name: 'Square Meters', factor: 1 },
        sqkm: { name: 'Square Kilometers', factor: 1000000 },
        sqin: { name: 'Square Inches', factor: 0.00064516 },
        sqft: { name: 'Square Feet', factor: 0.092903 },
        acre: { name: 'Acres', factor: 4046.86 },
        hectare: { name: 'Hectares', factor: 10000 }
      }
    },
    volume: {
      name: 'Volume',
      icon: '🧪',
      units: {
        ml: { name: 'Milliliters', factor: 0.001 },
        l: { name: 'Liters', factor: 1 },
        gal_us: { name: 'Gallons (US)', factor: 3.78541 },
        gal_uk: { name: 'Gallons (UK)', factor: 4.54609 },
        qt: { name: 'Quarts', factor: 0.946353 },
        pt: { name: 'Pints', factor: 0.473176 },
        cup: { name: 'Cups', factor: 0.236588 },
        floz: { name: 'Fluid Ounces', factor: 0.0295735 }
      }
    },
    time: {
      name: 'Time',
      icon: '⏰',
      units: {
        ms: { name: 'Milliseconds', factor: 0.001 },
        s: { name: 'Seconds', factor: 1 },
        min: { name: 'Minutes', factor: 60 },
        hr: { name: 'Hours', factor: 3600 },
        day: { name: 'Days', factor: 86400 },
        week: { name: 'Weeks', factor: 604800 },
        month: { name: 'Months', factor: 2629746 },
        year: { name: 'Years', factor: 31556952 }
      }
    },
    speed: {
      name: 'Speed',
      icon: '🚗',
      units: {
        mps: { name: 'Meters per Second', factor: 1 },
        kph: { name: 'Kilometers per Hour', factor: 0.277778 },
        mph: { name: 'Miles per Hour', factor: 0.44704 },
        fps: { name: 'Feet per Second', factor: 0.3048 },
        knot: { name: 'Knots', factor: 0.514444 }
      }
    },
    data: {
      name: 'Data Storage',
      icon: '💾',
      units: {
        b: { name: 'Bytes', factor: 1 },
        kb: { name: 'Kilobytes', factor: 1024 },
        mb: { name: 'Megabytes', factor: 1048576 },
        gb: { name: 'Gigabytes', factor: 1073741824 },
        tb: { name: 'Terabytes', factor: 1099511627776 },
        pb: { name: 'Petabytes', factor: 1125899906842624 }
      }
    }
  }

  // Temperature conversion functions
  const convertTemperature = (value: number, from: string, to: string) => {
    if (from === to) return value

    // Convert to Celsius first
    let celsius = value
    if (from === 'f') celsius = (value - 32) * 5/9
    if (from === 'k') celsius = value - 273.15

    // Convert from Celsius to target
    if (to === 'f') return celsius * 9/5 + 32
    if (to === 'k') return celsius + 273.15
    return celsius
  }

  // General unit conversion
  const convertUnits = (value: number, fromUnit: string, toUnit: string, category: string) => {
    if (category === 'temperature') {
      return convertTemperature(value, fromUnit, toUnit)
    }

    const units = categories[category as keyof typeof categories].units
    const fromFactor = units[fromUnit as keyof typeof units].factor
    const toFactor = units[toUnit as keyof typeof units].factor

    return (value * fromFactor) / toFactor
  }

  // Initialize default units when category changes
  useEffect(() => {
    const units = Object.keys(categories[selectedCategory as keyof typeof categories].units)
    setFromUnit(units[0])
    setToUnit(units[1] || units[0])
    setFromValue('')
    setToValue('')
  }, [selectedCategory])

  // Convert values when inputs change
  useEffect(() => {
    if (fromValue !== '' && fromUnit && toUnit) {
      const numValue = parseFloat(fromValue)
      if (!isNaN(numValue)) {
        const result = convertUnits(numValue, fromUnit, toUnit, selectedCategory)
        setToValue(result.toFixed(8).replace(/\.?0+$/, ''))
      } else {
        setToValue('')
      }
    }
  }, [fromValue, fromUnit, toUnit, selectedCategory])

  const handleFromValueChange = (value: string) => {
    setFromValue(value)
  }

  const handleToValueChange = (value: string) => {
    setToValue(value)
    if (value !== '' && fromUnit && toUnit) {
      const numValue = parseFloat(value)
      if (!isNaN(numValue)) {
        const result = convertUnits(numValue, toUnit, fromUnit, selectedCategory)
        setFromValue(result.toFixed(8).replace(/\.?0+$/, ''))
      } else {
        setFromValue('')
      }
    }
  }

  const swapUnits = () => {
    const tempUnit = fromUnit
    const tempValue = fromValue
    setFromUnit(toUnit)
    setToUnit(tempUnit)
    setFromValue(toValue)
    setToValue(tempValue)
  }

  const clearAll = () => {
    setFromValue('')
    setToValue('')
  }

  const currentCategory = categories[selectedCategory as keyof typeof categories]
  const units = Object.entries(currentCategory.units)

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Unit Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert between different units of measurement
        </p>
      </div>

      {/* Category Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Select Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`p-3 rounded-lg border text-center transition-all ${
                selectedCategory === key
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600'
              }`}
            >
              <div className="text-2xl mb-1">{category.icon}</div>
              <div className="text-sm font-medium">{category.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Conversion Interface */}
      <div className="space-y-6">
        <div className="flex items-center justify-center">
          <h4 className="text-lg font-semibold">
            {currentCategory.icon} {currentCategory.name} Converter
          </h4>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* From Unit */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
              {units.map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={fromValue}
              onChange={(e) => handleFromValueChange(e.target.value)}
              placeholder="Enter value"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          {/* Swap Button */}
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={swapUnits}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title="Swap units"
            >
              ⇄
            </button>
            <button
              onClick={clearAll}
              className="text-xs px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
            >
              Clear
            </button>
          </div>

          {/* To Unit */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
              {units.map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={toValue}
              onChange={(e) => handleToValueChange(e.target.value)}
              placeholder="Converted value"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Result Display */}
        {fromValue && toValue && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
            <div className="text-lg">
              <span className="font-semibold">{fromValue}</span> {units.find(([key]) => key === fromUnit)?.[1].name.toLowerCase()} = 
              <span className="font-semibold text-blue-600 dark:text-blue-400"> {toValue}</span> {units.find(([key]) => key === toUnit)?.[1].name.toLowerCase()}
            </div>
          </div>
        )}

        {/* Quick Reference */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="text-sm font-semibold mb-3">Quick Reference - Common {currentCategory.name} Units</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            {units.slice(0, 6).map(([key, unit]) => (
              <div key={key} className="flex justify-between">
                <span>{unit.name}:</span>
                <code className="text-xs bg-gray-200 dark:bg-gray-600 px-1 rounded">{key}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
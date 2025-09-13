'use client'

import { useState, useCallback } from 'react'

export function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false
  })
  const [passwordHistory, setPasswordHistory] = useState<string[]>([])
  const [strength, setStrength] = useState(0)

  const characters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    similar: 'il1Lo0O',
    ambiguous: '{}[]()/\\\'"`~,;.<>'
  }

  const calculateStrength = useCallback((pwd: string) => {
    let score = 0
    
    // Length scoring
    if (pwd.length >= 8) score += 1
    if (pwd.length >= 12) score += 1
    if (pwd.length >= 16) score += 1
    
    // Character variety
    if (/[a-z]/.test(pwd)) score += 1
    if (/[A-Z]/.test(pwd)) score += 1
    if (/[0-9]/.test(pwd)) score += 1
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1
    
    // Bonus for very long passwords
    if (pwd.length >= 20) score += 1
    
    return Math.min(score, 8)
  }, [])

  const generatePassword = useCallback(() => {
    let charset = ''
    
    if (options.uppercase) charset += characters.uppercase
    if (options.lowercase) charset += characters.lowercase
    if (options.numbers) charset += characters.numbers
    if (options.symbols) charset += characters.symbols
    
    if (options.excludeSimilar) {
      charset = charset.split('').filter(char => !characters.similar.includes(char)).join('')
    }
    
    if (options.excludeAmbiguous) {
      charset = charset.split('').filter(char => !characters.ambiguous.includes(char)).join('')
    }
    
    if (charset === '') {
      alert('Please select at least one character type!')
      return
    }
    
    let result = ''
    const array = new Uint32Array(length)
    crypto.getRandomValues(array)
    
    for (let i = 0; i < length; i++) {
      result += charset.charAt(array[i] % charset.length)
    }
    
    setPassword(result)
    setStrength(calculateStrength(result))
    
    // Add to history (keep last 10)
    setPasswordHistory(prev => [result, ...prev.slice(0, 9)])
  }, [length, options, calculateStrength])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
  }

  const getStrengthLabel = (score: number) => {
    if (score <= 2) return { label: 'Weak', color: 'text-red-600', bgColor: 'bg-red-500' }
    if (score <= 4) return { label: 'Fair', color: 'text-orange-600', bgColor: 'bg-orange-500' }
    if (score <= 6) return { label: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-500' }
    return { label: 'Strong', color: 'text-green-600', bgColor: 'bg-green-500' }
  }

  const strengthInfo = getStrengthLabel(strength)

  const presetConfigs = [
    { name: 'High Security', length: 20, uppercase: true, lowercase: true, numbers: true, symbols: true, excludeSimilar: true, excludeAmbiguous: false },
    { name: 'Standard', length: 16, uppercase: true, lowercase: true, numbers: true, symbols: true, excludeSimilar: false, excludeAmbiguous: false },
    { name: 'Simple', length: 12, uppercase: true, lowercase: true, numbers: true, symbols: false, excludeSimilar: false, excludeAmbiguous: false },
    { name: 'PIN Code', length: 6, uppercase: false, lowercase: false, numbers: true, symbols: false, excludeSimilar: false, excludeAmbiguous: false }
  ]

  const applyPreset = (preset: typeof presetConfigs[0]) => {
    setLength(preset.length)
    setOptions({
      uppercase: preset.uppercase,
      lowercase: preset.lowercase,
      numbers: preset.numbers,
      symbols: preset.symbols,
      excludeSimilar: preset.excludeSimilar,
      excludeAmbiguous: preset.excludeAmbiguous
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Password Generator</h2>
        <p className="text-sm text-muted-foreground">
          Generate secure passwords with customizable options
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Generator Settings */}
        <div className="space-y-6">
          {/* Password Length */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Password Length: {length}
            </label>
            <input
              type="range"
              min="4"
              max="50"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>4</span>
              <span>50</span>
            </div>
          </div>

          {/* Character Options */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Include Characters</h4>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={options.uppercase}
                onChange={(e) => setOptions(prev => ({ ...prev, uppercase: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">Uppercase Letters (A-Z)</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={options.lowercase}
                onChange={(e) => setOptions(prev => ({ ...prev, lowercase: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">Lowercase Letters (a-z)</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={options.numbers}
                onChange={(e) => setOptions(prev => ({ ...prev, numbers: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">Numbers (0-9)</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={options.symbols}
                onChange={(e) => setOptions(prev => ({ ...prev, symbols: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">Symbols (!@#$%^&*)</span>
            </label>
          </div>

          {/* Advanced Options */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Advanced Options</h4>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={options.excludeSimilar}
                onChange={(e) => setOptions(prev => ({ ...prev, excludeSimilar: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">Exclude Similar Characters (il1Lo0O)</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={options.excludeAmbiguous}
                onChange={(e) => setOptions(prev => ({ ...prev, excludeAmbiguous: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">Exclude Ambiguous Characters ({}[]())</span>
            </label>
          </div>

          {/* Preset Configurations */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Quick Presets</h4>
            <div className="grid grid-cols-2 gap-2">
              {presetConfigs.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => applyPreset(preset)}
                  className="p-2 text-xs border rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePassword}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Generate Password
          </button>
        </div>

        {/* Password Output */}
        <div className="space-y-6">
          {/* Generated Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Generated Password</label>
            <div className="relative">
              <input
                type="text"
                value={password}
                readOnly
                placeholder="Click 'Generate Password' to create a new password"
                className="w-full p-4 pr-12 border rounded-lg bg-gray-50 dark:bg-gray-700 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {password && (
                <button
                  onClick={() => copyToClipboard(password)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  title="Copy to clipboard"
                >
                  📋
                </button>
              )}
            </div>
          </div>

          {/* Password Strength */}
          {password && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Password Strength</span>
                <span className={`text-sm font-semibold ${strengthInfo.color}`}>
                  {strengthInfo.label}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${strengthInfo.bgColor}`}
                  style={{ width: `${(strength / 8) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Password History */}
          {passwordHistory.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-3">Recent Passwords</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {passwordHistory.map((pwd, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm">
                    <code className="flex-1 font-mono truncate">{pwd}</code>
                    <button
                      onClick={() => copyToClipboard(pwd)}
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-2"
                      title="Copy"
                    >
                      📋
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tips */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">🔒 Security Tips</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Use unique passwords for each account</li>
              <li>• Consider using a password manager</li>
              <li>• Enable two-factor authentication when available</li>
              <li>• Avoid using personal information in passwords</li>
              <li>• Update passwords regularly for sensitive accounts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
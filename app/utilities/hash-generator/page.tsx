'use client'

import React, { useState } from 'react'

export default function HashGeneratorPage() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState({
    md5: '',
    sha1: '',
    sha256: '',
    sha512: ''
  })
  const [isFile, setIsFile] = useState(false)
  const [fileName, setFileName] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  // MD5 implementation using a lightweight pure JS version
  const generateMD5 = async (text: string): Promise<string> => {
    // Simple MD5 implementation
    function md5(str: string): string {
      function rotateLeft(value: number, amount: number): number {
        return (value << amount) | (value >>> (32 - amount));
      }

      function addUnsigned(x: number, y: number): number {
        const lsw = (x & 0xFFFF) + (y & 0xFFFF);
        const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
      }

      function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
        return addUnsigned(rotateLeft(addUnsigned(addUnsigned(a, q), addUnsigned(x, t)), s), b);
      }

      function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
        return md5cmn((b & c) | ((~b) & d), a, b, x, s, t);
      }

      function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
        return md5cmn((b & d) | (c & (~d)), a, b, x, s, t);
      }

      function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
        return md5cmn(b ^ c ^ d, a, b, x, s, t);
      }

      function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
        return md5cmn(c ^ (b | (~d)), a, b, x, s, t);
      }

      function coreMD5(x: number[], len: number): number[] {
        x[len >> 5] |= 0x80 << (len % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        let a = 1732584193;
        let b = -271733879;
        let c = -1732584194;
        let d = 271733878;

        for (let i = 0; i < x.length; i += 16) {
          const olda = a;
          const oldb = b;
          const oldc = c;
          const oldd = d;

          a = md5ff(a, b, c, d, x[i], 7, -680876936);
          d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
          c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
          b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
          a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
          d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
          c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
          b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
          a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
          d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
          c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
          b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
          a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
          d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
          c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
          b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

          a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
          d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
          c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
          b = md5gg(b, c, d, a, x[i], 20, -373897302);
          a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
          d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
          c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
          b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
          a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
          d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
          c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
          b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
          a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
          d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
          c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
          b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

          a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
          d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
          c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
          b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
          a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
          d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
          c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
          b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
          a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
          d = md5hh(d, a, b, c, x[i], 11, -358537222);
          c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
          b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
          a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
          d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
          c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
          b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);

          a = md5ii(a, b, c, d, x[i], 6, -198630844);
          d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
          c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
          b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
          a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
          d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
          c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
          b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
          a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
          d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
          c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
          b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
          a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
          d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
          c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
          b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);

          a = addUnsigned(a, olda);
          b = addUnsigned(b, oldb);
          c = addUnsigned(c, oldc);
          d = addUnsigned(d, oldd);
        }
        return [a, b, c, d];
      }

      function binl2hex(binarray: number[]): string {
        const hexTab = '0123456789abcdef';
        let str = '';
        for (let i = 0; i < binarray.length * 4; i++) {
          str += hexTab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                 hexTab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
        }
        return str;
      }

      function str2binl(str: string): number[] {
        const bin = [];
        const mask = (1 << 8) - 1;
        for (let i = 0; i < str.length * 8; i += 8) {
          bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << (i % 32);
        }
        return bin;
      }

      return binl2hex(coreMD5(str2binl(str), str.length * 8));
    }

    return md5(text);
  }

  const generateSHA = async (text: string, algorithm: string): Promise<string> => {
    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(text)
      const hashBuffer = await crypto.subtle.digest(algorithm, data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    } catch (error) {
      return 'Error generating hash'
    }
  }

  const generateHashes = async () => {
    if (!input.trim()) {
      setHashes({
        md5: '',
        sha1: '',
        sha256: '',
        sha512: ''
      })
      return
    }

    setIsGenerating(true)
    
    try {
      const [md5Hash, sha1Hash, sha256Hash, sha512Hash] = await Promise.all([
        generateMD5(input),
        generateSHA(input, 'SHA-1'),
        generateSHA(input, 'SHA-256'),
        generateSHA(input, 'SHA-512')
      ])

      setHashes({
        md5: md5Hash,
        sha1: sha1Hash,
        sha256: sha256Hash,
        sha512: sha512Hash
      })
    } catch (error) {
      console.error('Error generating hashes:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInput(content)
        setIsFile(true)
      }
      reader.readAsText(file)
    }
  }

  const clearAll = () => {
    setInput('')
    setHashes({
      md5: '',
      sha1: '',
      sha256: '',
      sha512: ''
    })
    setIsFile(false)
    setFileName('')
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const loadSample = () => {
    setInput('Hello, World!')
    setIsFile(false)
    setFileName('')
  }

  // Auto-generate hashes when input changes
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateHashes()
    }, 300) // Debounce for 300ms

    return () => clearTimeout(timeoutId)
  }, [input])

  return (
    <main>
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-5 py-4">
          <div className="flex justify-between items-center">
            <a href="/" className="font-semibold text-lg hover:text-blue-600 transition-colors">
              June Vergel Querol
            </a>
            <div className="flex gap-3">
              <a 
                href="/utilities" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                🛠️ Utilities
              </a>
              <a 
                href="/journal" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                📝 Daily Journal
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-4">
              Hash Generator
            </h1>
            <p className="text-xl text-muted-foreground">
              Generate MD5, SHA-1, SHA-256, and SHA-512 hashes for text and files
            </p>
          </div>

          <div className="space-y-8">
            {/* Input Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Input</h2>
                <div className="flex gap-2">
                  <button
                    onClick={loadSample}
                    className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-1 rounded transition-colors"
                  >
                    Load Sample
                  </button>
                  <label className="text-sm bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 px-3 py-1 rounded transition-colors cursor-pointer">
                    Upload File
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".txt,.json,.xml,.csv,.js,.ts,.html,.css,.md"
                    />
                  </label>
                </div>
              </div>

              {fileName && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    📄 File loaded: {fileName}
                  </p>
                </div>
              )}
              
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  setIsFile(false)
                  setFileName('')
                }}
                placeholder="Enter text to generate hashes, or upload a file..."
                className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900"
              />

              <div className="flex gap-3">
                <button
                  onClick={generateHashes}
                  disabled={isGenerating}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded font-medium transition-colors"
                >
                  {isGenerating ? 'Generating...' : 'Generate Hashes'}
                </button>
                <button
                  onClick={clearAll}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Hash Results */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Hash Results</h2>
              
              <div className="grid gap-4">
                {/* MD5 */}
                <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-red-600">MD5 (128-bit)</h3>
                    {hashes.md5 && (
                      <button
                        onClick={() => copyToClipboard(hashes.md5)}
                        className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded transition-colors"
                      >
                        Copy
                      </button>
                    )}
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded font-mono text-sm break-all">
                    {hashes.md5 || 'Hash will appear here...'}
                  </div>
                  <p className="text-xs text-red-500 mt-1">⚠️ MD5 is deprecated for security purposes</p>
                </div>

                {/* SHA-1 */}
                <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-orange-600">SHA-1 (160-bit)</h3>
                    {hashes.sha1 && (
                      <button
                        onClick={() => copyToClipboard(hashes.sha1)}
                        className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded transition-colors"
                      >
                        Copy
                      </button>
                    )}
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded font-mono text-sm break-all">
                    {hashes.sha1 || 'Hash will appear here...'}
                  </div>
                  <p className="text-xs text-orange-500 mt-1">⚠️ SHA-1 is deprecated for cryptographic use</p>
                </div>

                {/* SHA-256 */}
                <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-green-600">SHA-256 (256-bit)</h3>
                    {hashes.sha256 && (
                      <button
                        onClick={() => copyToClipboard(hashes.sha256)}
                        className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded transition-colors"
                      >
                        Copy
                      </button>
                    )}
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded font-mono text-sm break-all">
                    {hashes.sha256 || 'Hash will appear here...'}
                  </div>
                  <p className="text-xs text-green-600 mt-1">✅ Recommended for most applications</p>
                </div>

                {/* SHA-512 */}
                <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-blue-600">SHA-512 (512-bit)</h3>
                    {hashes.sha512 && (
                      <button
                        onClick={() => copyToClipboard(hashes.sha512)}
                        className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded transition-colors"
                      >
                        Copy
                      </button>
                    )}
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded font-mono text-sm break-all">
                    {hashes.sha512 || 'Hash will appear here...'}
                  </div>
                  <p className="text-xs text-blue-600 mt-1">✅ Highest security, slower computation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Information Cards */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">🔐</span>
                Hash Functions
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Hash functions convert input data into fixed-size strings. They're one-way functions - you can't reverse them to get the original input.
              </p>
              <div className="text-sm space-y-2">
                <p><strong>Uses:</strong> Data integrity, password storage, digital signatures</p>
                <p><strong>Properties:</strong> Deterministic, fast computation, avalanche effect</p>
              </div>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                Security Levels
              </h3>
              <div className="text-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span>MD5, SHA-1: Deprecated (vulnerable to attacks)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span>SHA-256: Current standard (secure)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span>SHA-512: Maximum security (future-proof)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">💡 Common Use Cases</h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Verify file integrity and detect corruption</li>
              <li>• Generate unique identifiers for data</li>
              <li>• Check if files have been modified</li>
              <li>• Create checksums for downloads</li>
              <li>• Generate cache keys for applications</li>
              <li>• Verify data hasn't been tampered with</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
"use client"

import { useState } from "react"
import { Copy, Book, FileText, Globe, Users } from "lucide-react"

type CitationStyle = "apa" | "mla" | "chicago" | "harvard"
type SourceType = "book" | "journal" | "website" | "newspaper"

interface CitationData {
  // Common fields
  title: string
  authors: string
  year: string
  
  // Book specific
  publisher?: string
  city?: string
  
  // Journal specific
  journalName?: string
  volume?: string
  issue?: string
  pages?: string
  
  // Website specific
  url?: string
  accessDate?: string
  
  // Newspaper specific
  newspaperName?: string
  date?: string
}

export default function CitationGeneratorPage() {
  const [style, setStyle] = useState<CitationStyle>("apa")
  const [sourceType, setSourceType] = useState<SourceType>("book")
  const [data, setData] = useState<CitationData>({
    title: "",
    authors: "",
    year: "",
  })
  const [citation, setCitation] = useState("")
  const [copied, setCopied] = useState(false)

  const updateData = (field: keyof CitationData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const generateCitation = () => {
    if (!data.title || !data.authors || !data.year) {
      setCitation("Please fill in required fields: Title, Authors, and Year")
      return
    }

    let result = ""
    
    switch (style) {
      case "apa":
        result = generateAPA()
        break
      case "mla":
        result = generateMLA()
        break
      case "chicago":
        result = generateChicago()
        break
      case "harvard":
        result = generateHarvard()
        break
    }
    
    setCitation(result)
  }

  const generateAPA = (): string => {
    const authors = formatAuthorsAPA(data.authors)
    
    switch (sourceType) {
      case "book":
        return `${authors} (${data.year}). *${data.title}*. ${data.publisher || "Publisher"}${data.city ? `, ${data.city}` : ""}.`
      
      case "journal":
        return `${authors} (${data.year}). ${data.title}. *${data.journalName}*, *${data.volume}*(${data.issue}), ${data.pages}.`
      
      case "website":
        return `${authors} (${data.year}). ${data.title}. Retrieved ${data.accessDate || "Date"}, from ${data.url}`
      
      case "newspaper":
        return `${authors} (${data.year}, ${data.date}). ${data.title}. *${data.newspaperName}*.`
      
      default:
        return ""
    }
  }

  const generateMLA = (): string => {
    const authors = formatAuthorsMLA(data.authors)
    
    switch (sourceType) {
      case "book":
        return `${authors} *${data.title}*. ${data.publisher || "Publisher"}, ${data.year}.`
      
      case "journal":
        return `${authors} "${data.title}." *${data.journalName}*, vol. ${data.volume}, no. ${data.issue}, ${data.year}, pp. ${data.pages}.`
      
      case "website":
        return `${authors} "${data.title}." *Website Name*, ${data.year}, ${data.url}. Accessed ${data.accessDate || "Date"}.`
      
      case "newspaper":
        return `${authors} "${data.title}." *${data.newspaperName}*, ${data.date} ${data.year}.`
      
      default:
        return ""
    }
  }

  const generateChicago = (): string => {
    const authors = formatAuthorsChicago(data.authors)
    
    switch (sourceType) {
      case "book":
        return `${authors} *${data.title}*. ${data.city || "City"}: ${data.publisher || "Publisher"}, ${data.year}.`
      
      case "journal":
        return `${authors} "${data.title}." *${data.journalName}* ${data.volume}, no. ${data.issue} (${data.year}): ${data.pages}.`
      
      case "website":
        return `${authors} "${data.title}." Accessed ${data.accessDate || "Date"}. ${data.url}.`
      
      case "newspaper":
        return `${authors} "${data.title}." *${data.newspaperName}*, ${data.date}, ${data.year}.`
      
      default:
        return ""
    }
  }

  const generateHarvard = (): string => {
    const authors = formatAuthorsHarvard(data.authors)
    
    switch (sourceType) {
      case "book":
        return `${authors} ${data.year}, *${data.title}*, ${data.publisher || "Publisher"}${data.city ? `, ${data.city}` : ""}.`
      
      case "journal":
        return `${authors} ${data.year}, '${data.title}', *${data.journalName}*, vol. ${data.volume}, no. ${data.issue}, pp. ${data.pages}.`
      
      case "website":
        return `${authors} ${data.year}, *${data.title}*, viewed ${data.accessDate || "Date"}, <${data.url}>.`
      
      case "newspaper":
        return `${authors} ${data.year}, '${data.title}', *${data.newspaperName}*, ${data.date}.`
      
      default:
        return ""
    }
  }

  const formatAuthorsAPA = (authors: string): string => {
    const authorList = authors.split(",").map(a => a.trim())
    if (authorList.length === 1) {
      return formatSingleAuthorAPA(authorList[0])
    }
    return authorList.map(formatSingleAuthorAPA).join(", ")
  }

  const formatSingleAuthorAPA = (author: string): string => {
    const parts = author.trim().split(" ")
    if (parts.length >= 2) {
      const lastName = parts[parts.length - 1]
      const initials = parts.slice(0, -1).map(name => name.charAt(0).toUpperCase() + ".").join(" ")
      return `${lastName}, ${initials}`
    }
    return author
  }

  const formatAuthorsMLA = (authors: string): string => {
    const authorList = authors.split(",").map(a => a.trim())
    if (authorList.length === 1) {
      return formatSingleAuthorMLA(authorList[0])
    }
    return authorList.map((author, index) => {
      if (index === 0) return formatSingleAuthorMLA(author)
      return author
    }).join(", and ")
  }

  const formatSingleAuthorMLA = (author: string): string => {
    const parts = author.trim().split(" ")
    if (parts.length >= 2) {
      const lastName = parts[parts.length - 1]
      const firstName = parts.slice(0, -1).join(" ")
      return `${lastName}, ${firstName}`
    }
    return author
  }

  const formatAuthorsChicago = (authors: string): string => {
    return formatAuthorsMLA(authors) // Similar format to MLA
  }

  const formatAuthorsHarvard = (authors: string): string => {
    const authorList = authors.split(",").map(a => a.trim())
    if (authorList.length === 1) {
      return formatSingleAuthorHarvard(authorList[0])
    }
    return authorList.map(formatSingleAuthorHarvard).join(", ")
  }

  const formatSingleAuthorHarvard = (author: string): string => {
    const parts = author.trim().split(" ")
    if (parts.length >= 2) {
      const lastName = parts[parts.length - 1]
      const initials = parts.slice(0, -1).map(name => name.charAt(0).toUpperCase()).join("")
      return `${lastName}, ${initials}`
    }
    return author
  }

  const copyToClipboard = () => {
    if (citation) {
      navigator.clipboard.writeText(citation)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const clearForm = () => {
    setData({
      title: "",
      authors: "",
      year: "",
    })
    setCitation("")
  }

  const getSourceIcon = (type: SourceType) => {
    switch (type) {
      case "book": return <Book className="w-4 h-4" />
      case "journal": return <FileText className="w-4 h-4" />
      case "website": return <Globe className="w-4 h-4" />
      case "newspaper": return <FileText className="w-4 h-4" />
    }
  }

  return (
    <main>
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-5 py-4">
          <div className="flex justify-between items-center">
            <a href="/" className="font-semibold text-lg hover:text-blue-600 transition-colors">
              June Vergel Querol
            </a>
            <div className="flex gap-3">
              <a 
                href="/journal" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                📝 Daily Journal
              </a>
              <a 
                href="/utilities" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                🛠️ Utilities
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-4">
            📚 Citation Generator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate properly formatted citations in APA, MLA, Chicago, and Harvard styles
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Citation Style Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">Citation Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "apa", label: "APA 7th" },
                    { key: "mla", label: "MLA 9th" },
                    { key: "chicago", label: "Chicago 17th" },
                    { key: "harvard", label: "Harvard" }
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setStyle(key as CitationStyle)}
                      className={`p-3 text-sm font-medium rounded-lg border transition-colors ${
                        style === key
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Source Type Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">Source Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "book", label: "Book" },
                    { key: "journal", label: "Journal Article" },
                    { key: "website", label: "Website" },
                    { key: "newspaper", label: "Newspaper" }
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setSourceType(key as SourceType)}
                      className={`p-3 text-sm font-medium rounded-lg border transition-colors flex items-center gap-2 justify-center ${
                        sourceType === key
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      {getSourceIcon(key as SourceType)}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Common Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    value={data.title}
                    onChange={(e) => updateData("title", e.target.value)}
                    placeholder="Enter the title"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Authors *</label>
                  <input
                    type="text"
                    value={data.authors}
                    onChange={(e) => updateData("authors", e.target.value)}
                    placeholder="Enter authors (comma-separated for multiple)"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Year *</label>
                  <input
                    type="text"
                    value={data.year}
                    onChange={(e) => updateData("year", e.target.value)}
                    placeholder="Publication year"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Source-specific fields */}
                {sourceType === "book" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Publisher</label>
                      <input
                        type="text"
                        value={data.publisher || ""}
                        onChange={(e) => updateData("publisher", e.target.value)}
                        placeholder="Publisher name"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        value={data.city || ""}
                        onChange={(e) => updateData("city", e.target.value)}
                        placeholder="Publication city"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </>
                )}

                {sourceType === "journal" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Journal Name</label>
                      <input
                        type="text"
                        value={data.journalName || ""}
                        onChange={(e) => updateData("journalName", e.target.value)}
                        placeholder="Journal name"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-sm font-medium mb-2">Volume</label>
                        <input
                          type="text"
                          value={data.volume || ""}
                          onChange={(e) => updateData("volume", e.target.value)}
                          placeholder="Vol."
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Issue</label>
                        <input
                          type="text"
                          value={data.issue || ""}
                          onChange={(e) => updateData("issue", e.target.value)}
                          placeholder="Issue"
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Pages</label>
                        <input
                          type="text"
                          value={data.pages || ""}
                          onChange={(e) => updateData("pages", e.target.value)}
                          placeholder="1-10"
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </>
                )}

                {sourceType === "website" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">URL</label>
                      <input
                        type="url"
                        value={data.url || ""}
                        onChange={(e) => updateData("url", e.target.value)}
                        placeholder="https://example.com"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Access Date</label>
                      <input
                        type="date"
                        value={data.accessDate || ""}
                        onChange={(e) => updateData("accessDate", e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </>
                )}

                {sourceType === "newspaper" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Newspaper Name</label>
                      <input
                        type="text"
                        value={data.newspaperName || ""}
                        onChange={(e) => updateData("newspaperName", e.target.value)}
                        placeholder="Newspaper name"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Publication Date</label>
                      <input
                        type="text"
                        value={data.date || ""}
                        onChange={(e) => updateData("date", e.target.value)}
                        placeholder="Month Day (e.g., January 15)"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={generateCitation}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Generate Citation
                </button>
                <button
                  onClick={clearForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Generated Citation
                </h3>
                
                <div className="relative">
                  <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 min-h-[200px]">
                    {citation ? (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap font-mono">
                        {citation}
                      </p>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 italic">
                        Fill in the required fields and click "Generate Citation" to see your formatted citation.
                      </p>
                    )}
                  </div>
                  
                  {citation && (
                    <button
                      onClick={copyToClipboard}
                      className={`absolute top-2 right-2 p-2 rounded-md transition-colors ${
                        copied
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                      title={copied ? "Copied!" : "Copy to clipboard"}
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Citation Style Guide */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
                  {style.toUpperCase()} Style Notes:
                </h4>
                <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  {style === "apa" && (
                    <>
                      <p>• Author names: Last, F. M.</p>
                      <p>• Book titles in italics</p>
                      <p>• Article titles in sentence case</p>
                      <p>• Publication year in parentheses</p>
                    </>
                  )}
                  {style === "mla" && (
                    <>
                      <p>• Author names: Last, First</p>
                      <p>• Book titles in italics</p>
                      <p>• Article titles in quotes</p>
                      <p>• No parentheses around year</p>
                    </>
                  )}
                  {style === "chicago" && (
                    <>
                      <p>• Author names: Last, First</p>
                      <p>• Book titles in italics</p>
                      <p>• Article titles in quotes</p>
                      <p>• Footnote/bibliography style</p>
                    </>
                  )}
                  {style === "harvard" && (
                    <>
                      <p>• Author names: Last, F</p>
                      <p>• Year after author name</p>
                      <p>• Book titles in italics</p>
                      <p>• Article titles in single quotes</p>
                    </>
                  )}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-semibold mb-2 text-yellow-900 dark:text-yellow-100">
                  💡 Quick Tips:
                </h4>
                <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                  <li>• For multiple authors, separate with commas</li>
                  <li>• Use full names (not just initials) for better formatting</li>
                  <li>• Double-check publication details for accuracy</li>
                  <li>• Always verify citations with official style guides</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
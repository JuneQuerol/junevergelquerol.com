'use client'

import React, { useState } from 'react'

interface Source {
  id: string
  title: string
  author: string
  year: string
  url: string
  type: 'website' | 'article' | 'book' | 'journal' | 'video' | 'other'
  notes: string
  tags: string[]
  dateAdded: Date
}

interface SearchEngine {
  name: string
  url: string
  description: string
  icon: string
}

export default function ResearchHelperPage() {
  const [sources, setSources] = useState<Source[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'sources' | 'search' | 'organize'>('search')
  const [newSource, setNewSource] = useState({
    title: '',
    author: '',
    year: '',
    url: '',
    type: 'website' as Source['type'],
    notes: '',
    tags: ''
  })

  const searchEngines: SearchEngine[] = [
    {
      name: 'Google Scholar',
      url: 'https://scholar.google.com/scholar?q=',
      description: 'Academic papers, theses, books, conference papers',
      icon: '🎓'
    },
    {
      name: 'PubMed',
      url: 'https://pubmed.ncbi.nlm.nih.gov/?term=',
      description: 'Medical and life science literature',
      icon: '🧬'
    },
    {
      name: 'JSTOR',
      url: 'https://www.jstor.org/action/doBasicSearch?Query=',
      description: 'Academic journals, books, and primary sources',
      icon: '📚'
    },
    {
      name: 'ResearchGate',
      url: 'https://www.researchgate.net/search?q=',
      description: 'Scientific publications and researcher profiles',
      icon: '🔬'
    },
    {
      name: 'Semantic Scholar',
      url: 'https://www.semanticscholar.org/search?q=',
      description: 'AI-powered scientific literature search',
      icon: '🤖'
    },
    {
      name: 'arXiv',
      url: 'https://arxiv.org/search/?query=',
      description: 'Physics, mathematics, computer science preprints',
      icon: '📐'
    },
    {
      name: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Special:Search?search=',
      description: 'Encyclopedia articles and general information',
      icon: '📖'
    },
    {
      name: 'Library of Congress',
      url: 'https://www.loc.gov/search/?q=',
      description: 'Books, manuscripts, maps, and historical documents',
      icon: '🏛️'
    },
    {
      name: 'Internet Archive',
      url: 'https://archive.org/search.php?query=',
      description: 'Digital library of books, movies, music, websites',
      icon: '📦'
    },
    {
      name: 'DuckDuckGo',
      url: 'https://duckduckgo.com/?q=',
      description: 'Privacy-focused web search',
      icon: '🔍'
    }
  ]

  const researchTips = [
    {
      title: 'Start with background research',
      description: 'Use encyclopedias and textbooks to understand basic concepts before diving into specialized sources.'
    },
    {
      title: 'Use multiple search engines',
      description: 'Different databases index different content. Cross-reference findings across platforms.'
    },
    {
      title: 'Check publication dates',
      description: 'Ensure sources are current and relevant to your research timeline.'
    },
    {
      title: 'Evaluate source credibility',
      description: 'Consider author credentials, publication venue, and peer review status.'
    },
    {
      title: 'Take detailed notes',
      description: 'Record key quotes, page numbers, and your own insights for easy reference.'
    },
    {
      title: 'Organize by themes',
      description: 'Group sources by topic, methodology, or argument to identify patterns.'
    }
  ]

  const addSource = () => {
    if (!newSource.title.trim()) return

    const source: Source = {
      id: Date.now().toString(),
      title: newSource.title.trim(),
      author: newSource.author.trim(),
      year: newSource.year.trim(),
      url: newSource.url.trim(),
      type: newSource.type,
      notes: newSource.notes.trim(),
      tags: newSource.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      dateAdded: new Date()
    }

    setSources(prev => [source, ...prev])
    setNewSource({
      title: '',
      author: '',
      year: '',
      url: '',
      type: 'website',
      notes: '',
      tags: ''
    })
  }

  const removeSource = (id: string) => {
    setSources(prev => prev.filter(source => source.id !== id))
  }

  const openSearch = (searchEngine: SearchEngine) => {
    if (searchQuery.trim()) {
      const url = searchEngine.url + encodeURIComponent(searchQuery.trim())
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const openAllSearches = () => {
    if (!searchQuery.trim()) return
    
    // Open searches with a small delay to avoid popup blocker issues
    searchEngines.forEach((engine, index) => {
      setTimeout(() => {
        const url = engine.url + encodeURIComponent(searchQuery.trim())
        window.open(url, '_blank', 'noopener,noreferrer')
      }, index * 100) // 100ms delay between each popup
    })
  }

  const exportSources = () => {
    const exportData = sources.map(source => ({
      Title: source.title,
      Author: source.author,
      Year: source.year,
      Type: source.type,
      URL: source.url,
      Notes: source.notes,
      Tags: source.tags.join(', '),
      'Date Added': source.dateAdded.toLocaleDateString()
    }))

    const csvContent = [
      Object.keys(exportData[0] || {}).join(','),
      ...exportData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `research-sources-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const getSourceIcon = (type: Source['type']) => {
    const icons = {
      website: '🌐',
      article: '📄',
      book: '📚',
      journal: '📰',
      video: '🎥',
      other: '📎'
    }
    return icons[type]
  }

  const filteredSources = sources.filter(source => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return (
      source.title.toLowerCase().includes(query) ||
      source.author.toLowerCase().includes(query) ||
      source.tags.some(tag => tag.toLowerCase().includes(query)) ||
      source.notes.toLowerCase().includes(query)
    )
  })

  const getStatistics = () => {
    const totalSources = sources.length
    const sourcesByType = sources.reduce((acc, source) => {
      acc[source.type] = (acc[source.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const uniqueTags = [...new Set(sources.flatMap(source => source.tags))].length
    const recentSources = sources.filter(source => {
      const daysDiff = (new Date().getTime() - source.dateAdded.getTime()) / (1000 * 60 * 60 * 24)
      return daysDiff <= 7
    }).length

    return { totalSources, sourcesByType, uniqueTags, recentSources }
  }

  const stats = getStatistics()

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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-4">
              Research Helper
            </h1>
            <p className="text-xl text-muted-foreground">
              Organize sources, search academic databases, and manage research efficiently
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('search')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'search'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                🔍 Search
              </button>
              <button
                onClick={() => setActiveTab('sources')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'sources'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                📚 Sources ({sources.length})
              </button>
              <button
                onClick={() => setActiveTab('organize')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'organize'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                📊 Organize
              </button>
            </div>
          </div>

          {/* Search Tab */}
          {activeTab === 'search' && (
            <div className="space-y-8">
              {/* Search Input */}
              <div className="max-w-2xl mx-auto">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter your research topic or keywords..."
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900"
                  />
                  <button
                    onClick={openAllSearches}
                    disabled={!searchQuery.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Search All
                  </button>
                </div>
              </div>

              {/* Search Engines Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchEngines.map((engine) => (
                  <div key={engine.name} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{engine.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg">{engine.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{engine.description}</p>
                        <button
                          onClick={() => openSearch(engine)}
                          disabled={!searchQuery.trim()}
                          className="w-full bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-800/30 disabled:bg-gray-100 disabled:text-gray-400 text-blue-700 dark:text-blue-300 px-3 py-2 rounded font-medium transition-colors text-sm"
                        >
                          Search {engine.name}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Research Tips */}
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-6">Research Tips</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {researchTips.map((tip, index) => (
                    <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h3 className="font-semibold mb-2">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sources Tab */}
          {activeTab === 'sources' && (
            <div className="space-y-6">
              {/* Add Source Form */}
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Add New Source</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Title *"
                    value={newSource.title}
                    onChange={(e) => setNewSource(prev => ({ ...prev, title: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
                  />
                  <input
                    type="text"
                    placeholder="Author"
                    value={newSource.author}
                    onChange={(e) => setNewSource(prev => ({ ...prev, author: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    value={newSource.year}
                    onChange={(e) => setNewSource(prev => ({ ...prev, year: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
                  />
                  <select
                    value={newSource.type}
                    onChange={(e) => setNewSource(prev => ({ ...prev, type: e.target.value as Source['type'] }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
                  >
                    <option value="website">Website</option>
                    <option value="article">Article</option>
                    <option value="book">Book</option>
                    <option value="journal">Journal</option>
                    <option value="video">Video</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <input
                    type="url"
                    placeholder="URL"
                    value={newSource.url}
                    onChange={(e) => setNewSource(prev => ({ ...prev, url: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
                  />
                  <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={newSource.tags}
                    onChange={(e) => setNewSource(prev => ({ ...prev, tags: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
                  />
                  <textarea
                    placeholder="Notes and key insights"
                    value={newSource.notes}
                    onChange={(e) => setNewSource(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
                  />
                </div>
                <button
                  onClick={addSource}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium transition-colors"
                >
                  Add Source
                </button>
              </div>

              {/* Search Sources */}
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  placeholder="Search your sources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 max-w-md px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
                />
                {sources.length > 0 && (
                  <button
                    onClick={exportSources}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors ml-4"
                  >
                    Export CSV
                  </button>
                )}
              </div>

              {/* Sources List */}
              {filteredSources.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground">
                  {sources.length === 0 ? 'No sources added yet. Add your first source above!' : 'No sources match your search.'}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSources.map((source) => (
                    <div key={source.id} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{getSourceIcon(source.type)}</span>
                          <h3 className="font-semibold text-lg">{source.title}</h3>
                        </div>
                        <button
                          onClick={() => removeSource(source.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          {source.author && <p><strong>Author:</strong> {source.author}</p>}
                          {source.year && <p><strong>Year:</strong> {source.year}</p>}
                          <p><strong>Type:</strong> {source.type}</p>
                          {source.url && (
                            <p>
                              <strong>URL:</strong>{' '}
                              <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {source.url.length > 50 ? source.url.substring(0, 50) + '...' : source.url}
                              </a>
                            </p>
                          )}
                        </div>
                        <div>
                          {source.notes && (
                            <div>
                              <strong>Notes:</strong>
                              <p className="mt-1 text-muted-foreground">{source.notes}</p>
                            </div>
                          )}
                          {source.tags.length > 0 && (
                            <div className="mt-2">
                              <strong>Tags:</strong>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {source.tags.map((tag) => (
                                  <span key={tag} className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-2 text-xs text-muted-foreground">
                        Added: {source.dateAdded.toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Organize Tab */}
          {activeTab === 'organize' && (
            <div className="space-y-8">
              {/* Statistics */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{stats.totalSources}</div>
                  <div className="text-sm text-muted-foreground">Total Sources</div>
                </div>
                <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{stats.uniqueTags}</div>
                  <div className="text-sm text-muted-foreground">Unique Tags</div>
                </div>
                <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{stats.recentSources}</div>
                  <div className="text-sm text-muted-foreground">Added This Week</div>
                </div>
                <div className="text-center p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">
                    {Object.keys(stats.sourcesByType).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Source Types</div>
                </div>
              </div>

              {/* Sources by Type */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Sources by Type</h3>
                  <div className="space-y-2">
                    {Object.entries(stats.sourcesByType).map(([type, count]) => (
                      <div key={type} className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          {getSourceIcon(type as Source['type'])}
                          <span className="capitalize">{type}</span>
                        </span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Tags */}
                <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">All Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {[...new Set(sources.flatMap(source => source.tags))].map((tag) => {
                      const count = sources.filter(source => source.tags.includes(tag)).length
                      return (
                        <span key={tag} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                          {tag} ({count})
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-2">Multi-Database Search</h3>
              <p className="text-sm text-muted-foreground">
                Search across 10+ academic databases and research platforms simultaneously
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-lg font-semibold mb-2">Source Management</h3>
              <p className="text-sm text-muted-foreground">
                Organize sources with tags, notes, and metadata for easy retrieval
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2">Research Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Track your research progress with statistics and export capabilities
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
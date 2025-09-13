'use client'

import React, { useState, useEffect } from 'react'

interface Grade {
  id: string
  name: string
  score: number
  maxScore: number
  weight: number
}

export default function GradeCalculatorPage() {
  const [grades, setGrades] = useState<Grade[]>([
    { id: '1', name: 'Exam 1', score: 85, maxScore: 100, weight: 20 },
    { id: '2', name: 'Quiz 1', score: 90, maxScore: 100, weight: 10 },
    { id: '3', name: 'Assignment 1', score: 95, maxScore: 100, weight: 15 }
  ])
  
  const [gradingScale, setGradingScale] = useState({
    A: 90,
    B: 80,
    C: 70,
    D: 60,
    F: 0
  })

  const [newGrade, setNewGrade] = useState({
    name: '',
    score: '',
    maxScore: '100',
    weight: '10'
  })

  const [results, setResults] = useState({
    weightedAverage: 0,
    totalWeights: 0,
    finalGrade: 0,
    letterGrade: 'F',
    gpa: 0,
    neededForGrade: {}
  })

  const calculateResults = () => {
    if (grades.length === 0) {
      setResults({
        weightedAverage: 0,
        totalWeights: 0,
        finalGrade: 0,
        letterGrade: 'F',
        gpa: 0,
        neededForGrade: {}
      })
      return
    }

    // Calculate weighted average
    let totalWeightedScore = 0
    let totalWeights = 0

    grades.forEach(grade => {
      const percentage = (grade.score / grade.maxScore) * 100
      totalWeightedScore += percentage * grade.weight
      totalWeights += grade.weight
    })

    const weightedAverage = totalWeights > 0 ? totalWeightedScore / totalWeights : 0
    const finalGrade = totalWeights > 0 ? totalWeightedScore / totalWeights : 0

    // Determine letter grade
    let letterGrade = 'F'
    let gpa = 0

    if (finalGrade >= gradingScale.A) {
      letterGrade = 'A'
      gpa = 4.0
    } else if (finalGrade >= gradingScale.B) {
      letterGrade = 'B'
      gpa = 3.0
    } else if (finalGrade >= gradingScale.C) {
      letterGrade = 'C'
      gpa = 2.0
    } else if (finalGrade >= gradingScale.D) {
      letterGrade = 'D'
      gpa = 1.0
    }

    // Calculate what's needed for each grade
    const neededForGrade: any = {}
    Object.entries(gradingScale).forEach(([grade, threshold]) => {
      if (grade !== 'F') {
        const neededWeightedScore = threshold * totalWeights
        const currentWeightedScore = totalWeightedScore
        const additionalNeeded = neededWeightedScore - currentWeightedScore
        neededForGrade[grade] = additionalNeeded
      }
    })

    setResults({
      weightedAverage,
      totalWeights,
      finalGrade,
      letterGrade,
      gpa,
      neededForGrade
    })
  }

  useEffect(() => {
    calculateResults()
  }, [grades, gradingScale])

  const addGrade = () => {
    if (!newGrade.name.trim() || !newGrade.score || !newGrade.maxScore || !newGrade.weight) return

    const grade: Grade = {
      id: Date.now().toString(),
      name: newGrade.name.trim(),
      score: parseFloat(newGrade.score),
      maxScore: parseFloat(newGrade.maxScore),
      weight: parseFloat(newGrade.weight)
    }

    setGrades(prev => [...prev, grade])
    setNewGrade({ name: '', score: '', maxScore: '100', weight: '10' })
  }

  const updateGrade = (id: string, field: keyof Grade, value: string | number) => {
    setGrades(prev => prev.map(grade => 
      grade.id === id ? { ...grade, [field]: field === 'name' ? value : parseFloat(value.toString()) || 0 } : grade
    ))
  }

  const removeGrade = (id: string) => {
    setGrades(prev => prev.filter(grade => grade.id !== id))
  }

  const clearAll = () => {
    setGrades([])
  }

  const loadSample = () => {
    setGrades([
      { id: '1', name: 'Midterm Exam', score: 87, maxScore: 100, weight: 25 },
      { id: '2', name: 'Final Exam', score: 92, maxScore: 100, weight: 30 },
      { id: '3', name: 'Quiz Average', score: 85, maxScore: 100, weight: 15 },
      { id: '4', name: 'Homework', score: 95, maxScore: 100, weight: 20 },
      { id: '5', name: 'Participation', score: 100, maxScore: 100, weight: 10 }
    ])
  }

  const getGradeColor = (percentage: number) => {
    if (percentage >= gradingScale.A) return 'text-green-600'
    if (percentage >= gradingScale.B) return 'text-blue-600'
    if (percentage >= gradingScale.C) return 'text-yellow-600'
    if (percentage >= gradingScale.D) return 'text-orange-600'
    return 'text-red-600'
  }

  const getGradeBgColor = (percentage: number) => {
    if (percentage >= gradingScale.A) return 'bg-green-50 dark:bg-green-900/20'
    if (percentage >= gradingScale.B) return 'bg-blue-50 dark:bg-blue-900/20'
    if (percentage >= gradingScale.C) return 'bg-yellow-50 dark:bg-yellow-900/20'
    if (percentage >= gradingScale.D) return 'bg-orange-50 dark:bg-orange-900/20'
    return 'bg-red-50 dark:bg-red-900/20'
  }

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
              Grade Calculator
            </h1>
            <p className="text-xl text-muted-foreground">
              Calculate weighted grades, GPA, and track academic performance
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Add New Grade */}
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Add Grade</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={loadSample}
                      className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-1 rounded transition-colors"
                    >
                      Load Sample
                    </button>
                    <button
                      onClick={clearAll}
                      className="text-sm bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-800/30 text-red-700 dark:text-red-300 px-3 py-1 rounded transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Assignment name"
                    value={newGrade.name}
                    onChange={(e) => setNewGrade(prev => ({ ...prev, name: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900"
                  />
                  <input
                    type="number"
                    placeholder="Score"
                    value={newGrade.score}
                    onChange={(e) => setNewGrade(prev => ({ ...prev, score: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900"
                  />
                  <input
                    type="number"
                    placeholder="Max score"
                    value={newGrade.maxScore}
                    onChange={(e) => setNewGrade(prev => ({ ...prev, maxScore: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900"
                  />
                  <input
                    type="number"
                    placeholder="Weight %"
                    value={newGrade.weight}
                    onChange={(e) => setNewGrade(prev => ({ ...prev, weight: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900"
                  />
                </div>
                
                <button
                  onClick={addGrade}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors"
                >
                  Add Grade
                </button>
              </div>

              {/* Grades List */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Current Grades</h2>
                
                {grades.length === 0 ? (
                  <div className="text-center p-8 text-muted-foreground">
                    No grades added yet. Add some grades to see your calculations!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {grades.map(grade => {
                      const percentage = (grade.score / grade.maxScore) * 100
                      return (
                        <div key={grade.id} className={`p-4 border rounded-lg ${getGradeBgColor(percentage)}`}>
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                            <input
                              type="text"
                              value={grade.name}
                              onChange={(e) => updateGrade(grade.id, 'name', e.target.value)}
                              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
                            />
                            <input
                              type="number"
                              value={grade.score}
                              onChange={(e) => updateGrade(grade.id, 'score', e.target.value)}
                              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
                            />
                            <input
                              type="number"
                              value={grade.maxScore}
                              onChange={(e) => updateGrade(grade.id, 'maxScore', e.target.value)}
                              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
                            />
                            <input
                              type="number"
                              value={grade.weight}
                              onChange={(e) => updateGrade(grade.id, 'weight', e.target.value)}
                              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
                            />
                            <div className="flex items-center justify-between">
                              <span className={`font-semibold ${getGradeColor(percentage)}`}>
                                {percentage.toFixed(1)}%
                              </span>
                              <button
                                onClick={() => removeGrade(grade.id)}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              {/* Final Grade */}
              <div className={`p-6 border rounded-lg text-center ${getGradeBgColor(results.finalGrade)}`}>
                <h2 className="text-lg font-semibold mb-2">Final Grade</h2>
                <div className={`text-4xl font-bold mb-2 ${getGradeColor(results.finalGrade)}`}>
                  {results.finalGrade.toFixed(1)}%
                </div>
                <div className={`text-2xl font-semibold ${getGradeColor(results.finalGrade)}`}>
                  {results.letterGrade}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  GPA: {results.gpa.toFixed(1)}
                </div>
              </div>

              {/* Grading Scale */}
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                <h3 className="font-semibold mb-4">Grading Scale</h3>
                <div className="space-y-2">
                  {Object.entries(gradingScale).filter(([grade]) => grade !== 'F').map(([grade, threshold]) => (
                    <div key={grade} className="flex justify-between items-center">
                      <span className="font-medium">{grade}:</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={threshold}
                          onChange={(e) => setGradingScale(prev => ({ ...prev, [grade]: parseInt(e.target.value) || 0 }))}
                          className="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-900"
                        />
                        <span className="text-sm">%+</span>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center">
                    <span className="font-medium">F:</span>
                    <span className="text-sm">&lt; {gradingScale.D}%</span>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                <h3 className="font-semibold mb-4">Statistics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Weights:</span>
                    <span className="font-medium">{results.totalWeights}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assignments:</span>
                    <span className="font-medium">{grades.length}</span>
                  </div>
                  {results.totalWeights < 100 && (
                    <div className="flex justify-between text-orange-600">
                      <span>Remaining:</span>
                      <span className="font-medium">{(100 - results.totalWeights).toFixed(1)}%</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Grade Projections */}
              {results.totalWeights < 100 && grades.length > 0 && (
                <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <h3 className="font-semibold mb-4">What You Need</h3>
                  <div className="space-y-2 text-sm">
                    {Object.entries(results.neededForGrade).map(([grade, needed]) => {
                      const neededPercentage = (needed as number) / (100 - results.totalWeights)
                      if (neededPercentage > 100) return null
                      
                      return (
                        <div key={grade} className="flex justify-between">
                          <span>For {grade}:</span>
                          <span className={`font-medium ${neededPercentage <= 100 ? 'text-green-600' : 'text-red-600'}`}>
                            {Math.max(0, neededPercentage).toFixed(1)}%
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2">Weighted Grades</h3>
              <p className="text-sm text-muted-foreground">
                Calculate final grades using weighted percentages for different assignments
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-2">Grade Projections</h3>
              <p className="text-sm text-muted-foreground">
                See what scores you need on remaining work to achieve target grades
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">⚙️</div>
              <h3 className="text-lg font-semibold mb-2">Customizable Scale</h3>
              <p className="text-sm text-muted-foreground">
                Adjust grading scale thresholds to match your school's system
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">💡 How to Use</h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• <strong>Add grades:</strong> Enter assignment name, your score, maximum possible score, and weight percentage</li>
              <li>• <strong>Weight percentages:</strong> Should add up to 100% for complete accuracy (e.g., exams 60%, homework 40%)</li>
              <li>• <strong>Edit grades:</strong> Click on any field to modify existing grades</li>
              <li>• <strong>Grade projections:</strong> Shows what you need on remaining assignments to reach target grades</li>
              <li>• <strong>Customize scale:</strong> Adjust A/B/C/D thresholds to match your institution's grading scale</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
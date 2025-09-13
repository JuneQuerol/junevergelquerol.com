'use client'

import React, { useState, useEffect, useRef } from 'react'

interface Session {
  id: string
  type: 'work' | 'break'
  duration: number
  completedAt: Date
}

export default function StudyTimerPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [currentMode, setCurrentMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work')
  const [completedSessions, setCompletedSessions] = useState<Session[]>([])
  const [settings, setSettings] = useState({
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsUntilLongBreak: 4,
    autoStartBreaks: false,
    autoStartWork: false,
    soundEnabled: true,
    notificationsEnabled: true
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio
  useEffect(() => {
    // Create a simple beep sound using Web Audio API
    const createBeepSound = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 800
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    }
    
    audioRef.current = { play: createBeepSound } as any
  }, [])

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  // Handle timer completion
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      handleTimerComplete()
    }
  }, [timeLeft, isRunning])

  const handleTimerComplete = () => {
    setIsRunning(false)
    
    // Play sound
    if (settings.soundEnabled && audioRef.current) {
      try {
        audioRef.current.play()
      } catch (error) {
        console.log('Could not play sound:', error)
      }
    }

    // Show notification
    if (settings.notificationsEnabled && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(`${currentMode === 'work' ? 'Work' : 'Break'} session completed!`, {
          body: currentMode === 'work' ? 'Time for a break!' : 'Time to get back to work!',
          icon: '/favicon.ico'
        })
      }
    }

    // Record session
    const session: Session = {
      id: Date.now().toString(),
      type: currentMode === 'work' ? 'work' : 'break',
      duration: currentMode === 'work' ? settings.workDuration : 
               currentMode === 'shortBreak' ? settings.shortBreakDuration : settings.longBreakDuration,
      completedAt: new Date()
    }
    setCompletedSessions(prev => [session, ...prev])

    // Auto-transition logic
    if (currentMode === 'work') {
      const workSessions = completedSessions.filter(s => s.type === 'work').length + 1
      const shouldTakeLongBreak = workSessions % settings.sessionsUntilLongBreak === 0
      
      if (shouldTakeLongBreak) {
        setCurrentMode('longBreak')
        setTimeLeft(settings.longBreakDuration * 60)
      } else {
        setCurrentMode('shortBreak')
        setTimeLeft(settings.shortBreakDuration * 60)
      }
      
      if (settings.autoStartBreaks) {
        setIsRunning(true)
      }
    } else {
      setCurrentMode('work')
      setTimeLeft(settings.workDuration * 60)
      
      if (settings.autoStartWork) {
        setIsRunning(true)
      }
    }
  }

  const startTimer = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
    setIsRunning(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    const duration = currentMode === 'work' ? settings.workDuration :
                    currentMode === 'shortBreak' ? settings.shortBreakDuration : settings.longBreakDuration
    setTimeLeft(duration * 60)
  }

  const switchMode = (mode: 'work' | 'shortBreak' | 'longBreak') => {
    setIsRunning(false)
    setCurrentMode(mode)
    const duration = mode === 'work' ? settings.workDuration :
                    mode === 'shortBreak' ? settings.shortBreakDuration : settings.longBreakDuration
    setTimeLeft(duration * 60)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getProgress = () => {
    const totalDuration = currentMode === 'work' ? settings.workDuration * 60 :
                         currentMode === 'shortBreak' ? settings.shortBreakDuration * 60 : settings.longBreakDuration * 60
    return ((totalDuration - timeLeft) / totalDuration) * 100
  }

  const clearHistory = () => {
    setCompletedSessions([])
  }

  const getTodayStats = () => {
    const today = new Date().toDateString()
    const todaySessions = completedSessions.filter(session => 
      session.completedAt.toDateString() === today
    )
    
    const workSessions = todaySessions.filter(s => s.type === 'work').length
    const totalStudyTime = todaySessions
      .filter(s => s.type === 'work')
      .reduce((total, session) => total + session.duration, 0)
    
    return { workSessions, totalStudyTime }
  }

  const { workSessions, totalStudyTime } = getTodayStats()

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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-4">
              Study Timer
            </h1>
            <p className="text-xl text-muted-foreground">
              Boost productivity with the Pomodoro Technique and focused study sessions
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Timer Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Mode Selector */}
              <div className="flex justify-center">
                <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                  <button
                    onClick={() => switchMode('work')}
                    className={`px-6 py-2 rounded-md font-medium transition-colors ${
                      currentMode === 'work'
                        ? 'bg-red-500 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    Work
                  </button>
                  <button
                    onClick={() => switchMode('shortBreak')}
                    className={`px-6 py-2 rounded-md font-medium transition-colors ${
                      currentMode === 'shortBreak'
                        ? 'bg-green-500 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    Short Break
                  </button>
                  <button
                    onClick={() => switchMode('longBreak')}
                    className={`px-6 py-2 rounded-md font-medium transition-colors ${
                      currentMode === 'longBreak'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    Long Break
                  </button>
                </div>
              </div>

              {/* Timer Display */}
              <div className="text-center">
                <div className={`relative w-80 h-80 mx-auto mb-8 rounded-full border-8 ${
                  currentMode === 'work' ? 'border-red-200' :
                  currentMode === 'shortBreak' ? 'border-green-200' : 'border-blue-200'
                }`}>
                  {/* Progress Circle */}
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={currentMode === 'work' ? '#fee2e2' : 
                             currentMode === 'shortBreak' ? '#dcfce7' : '#dbeafe'}
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={currentMode === 'work' ? '#ef4444' :
                             currentMode === 'shortBreak' ? '#22c55e' : '#3b82f6'}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${getProgress() * 2.827} 282.7`}
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  
                  {/* Time Display */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-mono font-bold mb-2">
                        {formatTime(timeLeft)}
                      </div>
                      <div className="text-lg text-muted-foreground capitalize">
                        {currentMode === 'shortBreak' ? 'Short Break' : 
                         currentMode === 'longBreak' ? 'Long Break' : currentMode}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex justify-center gap-4">
                  {!isRunning ? (
                    <button
                      onClick={startTimer}
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg"
                    >
                      ▶ Start
                    </button>
                  ) : (
                    <button
                      onClick={pauseTimer}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg"
                    >
                      ⏸ Pause
                    </button>
                  )}
                  <button
                    onClick={resetTimer}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg"
                  >
                    🔄 Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Settings & Stats Panel */}
            <div className="space-y-6">
              {/* Today's Stats */}
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Today's Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Sessions completed:</span>
                    <span className="font-semibold text-red-500">{workSessions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total study time:</span>
                    <span className="font-semibold text-blue-500">
                      {Math.floor(totalStudyTime / 60)}h {totalStudyTime % 60}m
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current streak:</span>
                    <span className="font-semibold text-green-500">
                      {completedSessions.filter(s => s.type === 'work').length % settings.sessionsUntilLongBreak}
                    </span>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Timer Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Work Duration (minutes)</label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={settings.workDuration}
                      onChange={(e) => setSettings(prev => ({ ...prev, workDuration: parseInt(e.target.value) || 25 }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Short Break (minutes)</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={settings.shortBreakDuration}
                      onChange={(e) => setSettings(prev => ({ ...prev, shortBreakDuration: parseInt(e.target.value) || 5 }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Long Break (minutes)</label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={settings.longBreakDuration}
                      onChange={(e) => setSettings(prev => ({ ...prev, longBreakDuration: parseInt(e.target.value) || 15 }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Sessions until long break</label>
                    <input
                      type="number"
                      min="2"
                      max="8"
                      value={settings.sessionsUntilLongBreak}
                      onChange={(e) => setSettings(prev => ({ ...prev, sessionsUntilLongBreak: parseInt(e.target.value) || 4 }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={settings.autoStartBreaks}
                        onChange={(e) => setSettings(prev => ({ ...prev, autoStartBreaks: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">Auto-start breaks</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={settings.autoStartWork}
                        onChange={(e) => setSettings(prev => ({ ...prev, autoStartWork: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">Auto-start work sessions</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={settings.soundEnabled}
                        onChange={(e) => setSettings(prev => ({ ...prev, soundEnabled: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">Sound notifications</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={settings.notificationsEnabled}
                        onChange={(e) => setSettings(prev => ({ ...prev, notificationsEnabled: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">Browser notifications</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Session History */}
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Recent Sessions</h3>
                  {completedSessions.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Clear
                    </button>
                  )}
                </div>
                
                {completedSessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No sessions completed yet</p>
                ) : (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {completedSessions.slice(0, 10).map(session => (
                      <div key={session.id} className="flex justify-between items-center text-sm">
                        <span className={`flex items-center gap-2 ${
                          session.type === 'work' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {session.type === 'work' ? '🍅' : '☕'}
                          {session.type === 'work' ? 'Work' : 'Break'}
                        </span>
                        <span className="text-muted-foreground">
                          {session.duration}m
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Features Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">🍅</div>
              <h3 className="text-lg font-semibold mb-2">Pomodoro Technique</h3>
              <p className="text-sm text-muted-foreground">
                25-minute focused work sessions followed by short breaks to maximize productivity
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Monitor daily study sessions, total time, and streaks to stay motivated
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-3xl mb-4">⚙️</div>
              <h3 className="text-lg font-semibold mb-2">Customizable</h3>
              <p className="text-sm text-muted-foreground">
                Adjust timer durations, auto-start settings, and notifications to your preferences
              </p>
            </div>
          </div>

          {/* About Pomodoro */}
          <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">🍅 About the Pomodoro Technique</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>The Pomodoro Technique</strong> is a time management method developed by Francesco Cirillo 
                in the late 1980s. It uses a timer to break down work into intervals, traditionally 25 minutes 
                in length, separated by short breaks.
              </p>
              <p>
                <strong>How it works:</strong> Work for 25 minutes → 5-minute break → Repeat. After 4 cycles, 
                take a longer 15-30 minute break. This helps maintain focus, prevent burnout, and improve productivity.
              </p>
              <p>
                <strong>Benefits:</strong> Enhanced focus, reduced mental fatigue, better time awareness, 
                and improved work-life balance through structured breaks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
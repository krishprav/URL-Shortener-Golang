'use client'

import { useState, useEffect } from 'react'
import InfoPopup from './InfoPopup'
import ResultDisplay from './ResultDisplay'

// URL validation function
function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

export default function UrlShortener() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Client-side validation
    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    if (!isValidUrl(url.trim())) {
      setError('Please enter a valid URL starting with http:// or https://')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Get backend URL from environment variable or use default
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://url-shortener-golang.onrender.com'
      
      // Create FormData to match your Go backend's expected format
      const formData = new FormData()
      formData.append('url', url.trim())
      
      // Call Go backend directly
      const response = await fetch(`${backendUrl}/shorten`, {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.text()
        
        // Extract the short URL from the response text
        // The Go backend returns "Short URL: {baseURL}/{shortCode}"
        const shortUrlMatch = result.match(/Short URL: (.+)/)
        const extractedShortUrl = shortUrlMatch ? shortUrlMatch[1] : result
        
        if (extractedShortUrl && isValidUrl(extractedShortUrl)) {
          setShortUrl(extractedShortUrl)
          // Save to localStorage for persistence
          localStorage.setItem('lastShortUrl', extractedShortUrl)
          localStorage.setItem('lastOriginalUrl', url)
        } else {
          setError('Invalid response from URL shortening service')
        }
      } else {
        const errorText = await response.text()
        setError(errorText || 'Failed to shorten URL')
      }
    } catch (err) {
      console.error('Network error:', err)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const clearForm = () => {
    setUrl('')
    setShortUrl('')
    setError('')
    localStorage.removeItem('lastShortUrl')
    localStorage.removeItem('lastOriginalUrl')
  }

  // Load previous result on component mount
  useEffect(() => {
    const savedShortUrl = localStorage.getItem('lastShortUrl')
    const savedOriginalUrl = localStorage.getItem('lastOriginalUrl')
    if (savedShortUrl && savedOriginalUrl) {
      setShortUrl(savedShortUrl)
      setUrl(savedOriginalUrl)
    }
  }, [])

  return (
    <div className="w-full max-w-[480px] mx-auto backdrop-blur-2xl bg-white/8 rounded-[2rem] sm:rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.6),0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] relative" 
         style={{ 
           background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.02) 100%)',
           border: '2px solid rgba(255,255,255,0.25)',
           boxShadow: `
             0 20px 60px rgba(0,0,0,0.6),
             0 8px 32px rgba(0,0,0,0.4),
             inset 0 1px 0 rgba(255,255,255,0.1),
             0 0 0 1px rgba(255,255,255,0.15),
             0 0 0 2px rgba(255,255,255,0.08),
             0 0 0 3px rgba(255,255,255,0.05),
             0 0 0 4px rgba(255,255,255,0.02)
           `
         }}>
      
      {/* macOS Window Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-800/80 to-gray-900/60 border-b border-white/15 rounded-t-[2rem] sm:rounded-t-[3rem]">
        {/* Traffic Light Buttons */}
        <div className="flex space-x-1.5 sm:space-x-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
        </div>
        
        {/* Window Title */}
        <div className="text-white/70 text-xs sm:text-sm font-medium">URL Shortener</div>
        
        {/* Info Button */}
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-200"
        >
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m0-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        {/* Central Icon Header */}
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="flex justify-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]" 
                 style={{ 
                   border: '2px solid rgba(255,255,255,0.25)',
                   boxShadow: `
                     0 8px 24px rgba(0,0,0,0.3),
                     inset 0 1px 0 rgba(255,255,255,0.1),
                     0 0 0 1px rgba(255,255,255,0.15),
                     0 0 0 2px rgba(255,255,255,0.08),
                     0 0 0 3px rgba(255,255,255,0.05)
                   `
                 }}>
              <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">URL Shortener</h1>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed px-2">
              Transform long URLs into clean, shareable links with enterprise-grade reliability
            </p>
          </div>
        </div>

        {/* URL Input Field */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="relative">
            <input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                if (error) setError('')
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter your long URL here..."
              required
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md text-white placeholder-white/40 focus:outline-none transition-all duration-300 text-sm sm:text-base ${
                isFocused 
                  ? 'bg-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_2px_8px_rgba(0,0,0,0.1)]' 
                  : 'hover:bg-white/12'
              }`}
              style={{ 
                border: '2px solid rgba(255,255,255,0.25)',
                boxShadow: `
                  0 4px 12px rgba(0,0,0,0.2),
                  0 0 0 1px rgba(255,255,255,0.15),
                  0 0 0 2px rgba(255,255,255,0.08),
                  0 0 0 3px rgba(255,255,255,0.05)
                `
              }}
              disabled={isLoading}
            />
            {/* Link icon inside input field */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="w-full sm:flex-1 bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-950 hover:to-blue-900 text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 text-sm sm:text-base"
              style={{ 
                border: '2px solid rgba(255,255,255,0.25)',
                boxShadow: `
                  0 8px 24px rgba(30,58,138,0.4),
                  0 0 0 1px rgba(255,255,255,0.15),
                  0 0 0 2px rgba(255,255,255,0.08),
                  0 0 0 3px rgba(255,255,255,0.05)
                `
              }}
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span>Shorten URL</span>
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={clearForm}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-800 hover:to-gray-700 rounded-xl sm:rounded-2xl text-white/90 hover:text-white transition-all duration-200 backdrop-blur-md disabled:opacity-50 text-sm sm:text-base"
              style={{ 
                border: '2px solid rgba(255,255,255,0.25)',
                boxShadow: `
                  0 4px 12px rgba(0,0,0,0.3),
                  0 0 0 1px rgba(255,255,255,0.15),
                  0 0 0 2px rgba(255,255,255,0.08),
                  0 0 0 3px rgba(255,255,255,0.05)
                `
              }}
              disabled={isLoading}
            >
              Clear
            </button>
          </div>
        </form>

        {/* Error handling */}
        {error && (
          <div className="p-3 sm:p-4 bg-red-500/10 rounded-xl sm:rounded-2xl backdrop-blur-md" 
               style={{ 
                 border: '2px solid rgba(239,68,68,0.3)',
                 boxShadow: `
                   0 4px 12px rgba(239,68,68,0.2),
                   0 0 0 1px rgba(239,68,68,0.15),
                   0 0 0 2px rgba(239,68,68,0.08),
                   0 0 0 3px rgba(239,68,68,0.05)
                 `
               }}>
            <div className="flex items-center space-x-2">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-400 text-xs sm:text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* Result display */}
        {shortUrl && (
          <div className="animate-fade-in-up">
            <ResultDisplay shortUrl={shortUrl} />
          </div>
        )}
      </div>

      {/* Info popup */}
      {showInfo && <InfoPopup onClose={() => setShowInfo(false)} />}
    </div>
  )
}

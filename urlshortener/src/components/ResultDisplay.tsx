'use client'

import { useState } from 'react'

interface ResultDisplayProps {
  shortUrl: string
}

export default function ResultDisplay({ shortUrl }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="premium-glass rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
      {/* Premium header with responsive design */}
      <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-premium">Your shortened URL is ready</h3>
      </div>

      {/* Premium URL display with responsive design */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <span className="text-premium-subtle font-medium text-sm sm:text-base">Shortened URL:</span>
        </div>
        
        <div className="relative group">
          <div className="premium-glass rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10 transition-all duration-300 group-hover:border-white/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium break-all sm:break-words flex-1 mr-0 sm:mr-4 text-sm sm:text-base"
              >
                {shortUrl}
              </a>
              
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={copyToClipboard}
                  className="premium-glass rounded-lg p-2 sm:p-3 interactive flex-1 sm:flex-none"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-premium-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
                
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-glass rounded-lg p-2 sm:p-3 interactive flex-1 sm:flex-none"
                  title="Open in new tab"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-premium-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success feedback with responsive design */}
      {copied && (
        <div className="mt-3 sm:mt-4 p-3 sm:p-4 premium-glass border border-green-400/20 rounded-lg sm:rounded-xl success-glow">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-green-400 font-medium text-sm sm:text-base">URL copied to clipboard!</span>
          </div>
        </div>
      )}

      {/* Premium stats with responsive design */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
          <div className="premium-glass rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-premium">∞</div>
            <div className="text-xs sm:text-sm text-premium-subtle">Unlimited</div>
          </div>
          <div className="premium-glass rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-premium">⚡</div>
            <div className="text-xs sm:text-sm text-premium-subtle">Instant</div>
          </div>
        </div>
      </div>
    </div>
  )
}

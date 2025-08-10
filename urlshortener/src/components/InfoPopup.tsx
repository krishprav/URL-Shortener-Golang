'use client'

import { useEffect, useRef } from 'react'

interface InfoPopupProps {
  onClose: () => void
}

export default function InfoPopup({ onClose }: InfoPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null)

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Remove event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 flex items-start justify-end p-4 sm:p-6 z-50">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      <div 
        ref={popupRef}
        className="relative w-full max-w-md bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-out animate-slide-in-right info-popup"
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">How it works</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 -mr-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4 text-sm text-gray-300">
            <p>
              Transform any long URL into a clean, shareable link instantly. Our enterprise-grade infrastructure ensures reliability and speed.
            </p>
            
            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
              <h4 className="font-medium text-white mb-2 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Secure & Private
              </h4>
              <p className="text-xs text-gray-400">
                All links are encrypted and processed securely. We don't store any personal information.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <div className="text-blue-400 mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-white">Lightning Fast</h4>
                <p className="text-xs text-gray-400 mt-1">Instant link generation with our global CDN</p>
              </div>
              
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <div className="text-green-400 mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-white">Secure Links</h4>
                <p className="text-xs text-gray-400 mt-1">HTTPS encryption for all your links</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface InfoPopupProps {
  onClose: () => void
}

export default function InfoPopup({ onClose }: InfoPopupProps) {
  return (
    <div className="absolute top-12 sm:top-16 right-2 sm:right-6 w-80 sm:w-96 premium-glass border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-premium-subtle text-xs sm:text-sm z-20 animate-fade-in-up">
      <button
        onClick={onClose}
        className="absolute top-2 sm:top-3 right-2 sm:right-3 text-premium-subtle hover:text-white transition-colors interactive"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-premium">How it works</h3>
      </div>
      
      <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm leading-relaxed">
        <p>
          Transform any long URL into a clean, shareable link instantly. Our enterprise-grade infrastructure ensures reliability and speed.
        </p>
        <div className="premium-glass rounded-lg p-2 sm:p-3 mt-3 sm:mt-4">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
            <span className="text-premium-subtle">Secure & Private</span>
          </div>
        </div>
      </div>
    </div>
  )
} 
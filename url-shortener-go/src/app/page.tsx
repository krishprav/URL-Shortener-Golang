import UrlShortener from '@/components/UrlShortener'
import ErrorBoundary from '@/components/ErrorBoundary'
import InteractiveStars from '@/components/InteractiveStars'

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0c23] to-[#121426] text-white px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Interactive Stars Background */}
        <InteractiveStars />

        {/* Main content */}
        <div className="relative z-10 w-full">
          <UrlShortener />
        </div>
      </div>
    </ErrorBoundary>
  )
}

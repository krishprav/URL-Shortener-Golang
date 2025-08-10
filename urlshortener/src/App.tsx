import { useEffect } from 'react'
import './App.css'
import UrlShortener from './components/UrlShortener'
import InteractiveStars from './components/InteractiveStars'

function App() {
  // Set document title
  useEffect(() => {
    document.title = 'URL Shortener'
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      <InteractiveStars />
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <UrlShortener />
      </div>
    </div>
  )
}

export default App

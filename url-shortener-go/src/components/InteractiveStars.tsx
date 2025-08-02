'use client'

import { useState, useEffect } from 'react'

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  animationDelay: number
  speed: number
  direction: { x: number; y: number }
  type: 'star' | 'nebula' | 'particle'
}

export default function InteractiveStars() {
  const [stars, setStars] = useState<Star[]>([])
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const generateStars = () => {
      const starCount = window.innerWidth >= 768 ? 200 : 300
      const newStars: Star[] = []

      for (let i = 0; i < starCount; i++) {
        const type = Math.random() > 0.8 ? 'nebula' : Math.random() > 0.6 ? 'particle' : 'star'
        const size = type === 'nebula' ? Math.random() * 4 + 2 : type === 'particle' ? Math.random() * 1.5 + 0.5 : Math.random() * 2 + 1

        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size,
          opacity: Math.random() * 0.8 + 0.2,
          animationDelay: Math.random() * 5,
          speed: Math.random() * 0.3 + 0.1,
          direction: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
          },
          type
        })
      }
      setStars(newStars)
    }

    const animateStars = () => {
      setStars(prevStars => 
        prevStars.map(star => {
          let newX = star.x + star.direction.x * star.speed
          let newY = star.y + star.direction.y * star.speed

          // Wrap around edges
          if (newX < -5) newX = 105
          if (newX > 105) newX = -5
          if (newY < -5) newY = 105
          if (newY > 105) newY = -5

          return {
            ...star,
            x: newX,
            y: newY
          }
        })
      )
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 2
      const y = (clientY / window.innerHeight - 0.5) * 2
      setMouse({ x, y })
    }

    generateStars()
    const animationId = requestAnimationFrame(function animate() {
      animateStars()
      requestAnimationFrame(animate)
    })

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#050510] via-[#0a0a1a] to-[#080815]"
        style={{
          transform: `translate(${mouse.x * 15}px, ${mouse.y * 15}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      />
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full animate-pulse ${
            star.type === 'nebula'
              ? 'bg-blue-400/30 blur-[0.5px]'
              : star.type === 'particle'
                ? 'bg-white/40'
                : 'bg-white'
          }`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.animationDelay}s`,
            transform: `translate(${mouse.x * star.size * 1.5}px, ${mouse.y * star.size * 1.5}px)`,
            transition: 'transform 0.4s ease-out'
          }}
        />
      ))}
      
      {/* Additional cosmic elements */}
      <div className="absolute inset-0 bg-cyan-500/5" />
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl animate-pulse" />
    </div>
  )
} 
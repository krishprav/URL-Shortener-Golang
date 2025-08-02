import { NextRequest, NextResponse } from 'next/server'

// URL validation function
function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('API route called')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const { url } = body
    
    // Validate URL presence
    if (!url || typeof url !== 'string') {
      console.log('Invalid URL provided:', url)
      return NextResponse.json(
        { error: 'URL is required and must be a string' },
        { status: 400 }
      )
    }

    // Validate URL format
    if (!isValidUrl(url)) {
      console.log('Invalid URL format:', url)
      return NextResponse.json(
        { error: 'Please provide a valid URL starting with http:// or https://' },
        { status: 400 }
      )
    }

    console.log('Calling backend with URL:', url)

    // Get backend URL from environment variable or use localhost for development
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080'
    console.log('Using backend URL:', backendUrl)

    // Call Go backend
    const response = await fetch(`${backendUrl}/shorten`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `url=${encodeURIComponent(url.trim())}`
    })

    console.log('Backend response status:', response.status)

    if (response.ok) {
      const text = await response.text()
      console.log('Backend response text:', text)
      
      const match = text.match(/https?:\/\/[^\s]+/)
      const shortUrl = match ? match[0] : ''
      
      if (shortUrl && isValidUrl(shortUrl)) {
        console.log('Returning short URL:', shortUrl)
        return NextResponse.json({ shortUrl })
      } else {
        console.log('No valid short URL found in response')
        return NextResponse.json(
          { error: 'Invalid response from URL shortening service' },
          { status: 400 }
        )
      }
    } else {
      const errorText = await response.text()
      console.log('Backend error:', errorText)
      return NextResponse.json(
        { error: errorText || 'Failed to shorten URL' },
        { status: response.status }
      )
    }
  } catch (error) {
    console.error('API Error details:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
} 
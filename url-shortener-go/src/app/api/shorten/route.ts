import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const url = formData.get('url') as string

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Validate URL
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
    }

    // Call the Go backend
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'
    
    const backendFormData = new FormData()
    backendFormData.append('url', url)
    
    const response = await fetch(`${backendUrl}/shorten`, {
      method: 'POST',
      body: backendFormData
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: errorText || 'Failed to shorten URL' }, { status: response.status })
    }

    const result = await response.text()
    return NextResponse.json({ shortUrl: result })
  } catch (error) {
    console.error('Error shortening URL:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200 })
} 
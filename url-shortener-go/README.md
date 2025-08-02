# URL Shortener - Next.js Frontend

A modern, production-ready URL shortener built with Next.js 15, TypeScript, and Tailwind CSS v4.

## 🚀 Features

- **Modern UI/UX**: Beautiful glassmorphic design with animated star background
- **Real-time Validation**: Client and server-side URL validation
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Responsive Design**: Works perfectly on all devices
- **Persistence**: Remembers your last shortened URL
- **Copy to Clipboard**: One-click copying of shortened URLs
- **Security**: HTTPS-only, security headers, input sanitization
- **macOS-style Interface**: Traffic light buttons and window frame

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Backend**: Go (external API)
- **Deployment**: Vercel-ready

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🔧 Environment Variables

Create a `.env.local` file in the project root:

```env
# For local development
BACKEND_URL=http://localhost:8080

# For production (update with your actual backend URL)
BACKEND_URL=https://your-app-name.onrender.com
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variable:
   - `BACKEND_URL`: Your deployed backend URL
4. Deploy automatically

### Manual Deployment

```bash
npm run build
npm start
```

## 🔒 Security Features

- **Input Validation**: URL format and protocol validation
- **Security Headers**: XSS protection, frame options, content type
- **Timeout Protection**: 10-second request timeout
- **Error Sanitization**: No sensitive information leaked

## 🎨 UI Features

- **Glass Morphism**: Modern backdrop blur effects with layered borders
- **Animated Background**: Interactive star field with mouse parallax
- **macOS Window**: Traffic light buttons and window frame design
- **Smooth Animations**: Hover effects and transitions
- **Loading States**: Spinner and disabled states
- **Error Feedback**: Clear error messages with styling
- **Success Feedback**: Copy confirmation messages

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface
- Accessible design patterns
- Adaptive layouts for all screen sizes

## 🔄 API Integration

The frontend connects to the Go backend using the `BACKEND_URL` environment variable. The API endpoint is:
`${BACKEND_URL}/shorten`

## 🐛 Error Handling

- Network error handling
- API timeout protection
- User-friendly error messages
- Error boundary for React errors
- Console logging for debugging

## 📊 Performance

- **Optimized Build**: CSS optimization enabled
- **Image Optimization**: WebP and AVIF support
- **Compression**: Gzip compression enabled
- **Caching**: Static asset caching
- **Bundle Analysis**: `npm run analyze` for bundle analysis

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

## 📈 Monitoring

- Console error logging
- Network request monitoring
- User interaction tracking (localStorage)

## 🔧 Customization

### Colors
Modify the gradient colors in `src/app/globals.css`:
```css
.gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
```

### Backend URL
Update the `BACKEND_URL` environment variable:
```env
BACKEND_URL=https://your-backend-url.com
```

### Star Animation
Modify the star animation in `src/components/InteractiveStars.tsx`

## 📄 License

MIT License - feel free to use and modify as needed.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions, please open an issue on GitHub.

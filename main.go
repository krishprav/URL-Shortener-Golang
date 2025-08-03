package main

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"
	"sync"
)

// URLStore represents our in-memory URL storage
type URLStore struct {
	urls map[string]string
	mu   sync.RWMutex
}

// NewURLStore creates a new URLStore instance
func NewURLStore() *URLStore {
	return &URLStore{
		urls: make(map[string]string),
	}
}

// generateShortURL creates a random 6-character string
func generateShortURL() (string, error) {
	b := make([]byte, 6)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}
	return base64.URLEncoding.EncodeToString(b)[:6], nil
}

// Put stores a URL and returns its short version
func (s *URLStore) Put(longURL string) (string, error) {
	// Generate short URL with collision detection
	var shortURL string
	var err error

	// Try up to 10 times to generate a unique short URL
	for i := 0; i < 10; i++ {
		shortURL, err = generateShortURL()
		if err != nil {
			return "", err
		}

		s.mu.RLock()
		_, exists := s.urls[shortURL]
		s.mu.RUnlock()

		if !exists {
			break
		}
	}

	// If we still have a collision after 10 attempts, return error
	s.mu.RLock()
	_, exists := s.urls[shortURL]
	s.mu.RUnlock()
	if exists {
		return "", fmt.Errorf("failed to generate unique short URL after 10 attempts")
	}

	s.mu.Lock()
	s.urls[shortURL] = longURL
	s.mu.Unlock()

	return shortURL, nil
}

// Get retrieves the original URL for a given short URL
func (s *URLStore) Get(shortURL string) (string, bool) {
	s.mu.RLock()
	url, exists := s.urls[shortURL]
	s.mu.RUnlock()
	return url, exists
}

// isValidURL checks if a string is a valid URL
func isValidURL(urlStr string) bool {
	_, err := url.ParseRequestURI(urlStr)
	return err == nil
}

func main() {
	store := NewURLStore()

	baseURL := os.Getenv("BASE_URL")
	if baseURL == "" {
		baseURL = "http://localhost:8080"
	}

	mux := http.NewServeMux()

	mux.HandleFunc("/shorten", func(w http.ResponseWriter, r *http.Request) {
		// CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)
			fmt.Fprint(w, "Method not allowed")
			return
		}

		longURL := r.FormValue("url")
		if longURL == "" {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Fprint(w, "URL is required")
			return
		}

		// Validate URL
		if !isValidURL(longURL) {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Fprint(w, "Invalid URL format")
			return
		}

		shortURL, err := store.Put(longURL)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprint(w, "Error generating short URL")
			return
		}

		fmt.Fprintf(w, "Short URL: %s/%s", baseURL, shortURL)
	})

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		if r.URL.Path == "/" {
			// Serve a simple HTML page instead of looking for index.html
			w.Header().Set("Content-Type", "text/html")
			fmt.Fprint(w, `<!DOCTYPE html>
<html>
<head>
    <title>URL Shortener</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <h1>URL Shortener API</h1>
    <p>This is the backend API for the URL shortener service.</p>
    <p>Use the frontend application to shorten URLs.</p>
</body>
</html>`)
			return
		}

		shortURL := r.URL.Path[1:] // Remove leading slash
		longURL, exists := store.Get(shortURL)
		if !exists {
			w.WriteHeader(http.StatusNotFound)
			fmt.Fprint(w, "URL not found")
			return
		}

		http.Redirect(w, r, longURL, http.StatusMovedPermanently)
	})

	// Get port from environment variable or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server starting on :%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, mux))
}

package main

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"log"
	"net/http"
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
func (s *URLStore) Put(url string) (string, error) {
	shortURL, err := generateShortURL()
	if err != nil {
		return "", err
	}

	s.mu.Lock()
	s.urls[shortURL] = url
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

func main() {
	store := NewURLStore()

	baseURL := os.Getenv("BASE_URL")
	if baseURL == "" {
		baseURL = "http://localhost:8080"
	}

	mux := http.NewServeMux()

	mux.HandleFunc("/shorten", func(w http.ResponseWriter, r *http.Request) {
		// CORS headers for every response
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

		shortURL, err := store.Put(longURL)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprint(w, "Error generating short URL")
			return
		}

		fmt.Fprintf(w, "Short URL: %s/%s", baseURL, shortURL)
	})

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// CORS headers for every response
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		if r.URL.Path == "/" {
			http.ServeFile(w, r, "index.html")
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

	// CORS middleware wraps the mux
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		mux.ServeHTTP(w, r)
	})

	// Get port from environment variable or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server starting on :%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

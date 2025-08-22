'use client'

import { useEffect, useState, useRef } from 'react'

interface LoadingOptimizerProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  delay?: number
  minDuration?: number
}

export function LoadingOptimizer({ 
  children, 
  fallback, 
  delay = 200, 
  minDuration = 500 
}: LoadingOptimizerProps) {
  const [showContent, setShowContent] = useState(false)
  const [startTime] = useState(Date.now())

  useEffect(() => {
    const timer = setTimeout(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minDuration - elapsed)
      
      setTimeout(() => {
        setShowContent(true)
      }, remaining)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, minDuration, startTime])

  if (!showContent && fallback) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Preload critical resources
export function ResourcePreloader() {
  useEffect(() => {
    // Preload critical images
    const criticalImages = [
      '/api/properties/featured',
      '/api/cities',
      '/api/trending-searches'
    ]

    criticalImages.forEach(url => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = url
      document.head.appendChild(link)
    })

    // Preload critical fonts
    const fonts = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    ]

    fonts.forEach(fontUrl => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = fontUrl
      link.as = 'style'
      document.head.appendChild(link)
    })

    // Preload critical CSS
    const criticalCSS = [
      '/globals.css'
    ]

    criticalCSS.forEach(cssUrl => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = cssUrl
      link.as = 'style'
      document.head.appendChild(link)
    })
  }, [])

  return null
}

// Intersection Observer for lazy loading
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    })

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [ref, options])

  return isIntersecting
}

// Debounce hook for search optimization
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Throttle hook for scroll optimization
export function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastRun = useRef(Date.now())

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRun.current >= delay) {
        setThrottledValue(value)
        lastRun.current = Date.now()
      }
    }, delay - (Date.now() - lastRun.current))

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return throttledValue
}

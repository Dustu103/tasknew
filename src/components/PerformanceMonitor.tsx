'use client'

import { useEffect } from 'react'

export function PerformanceMonitor() {
  useEffect(() => {
    // Track Core Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log('LCP:', lastEntry.startTime)
        
        // Send to analytics
        if (lastEntry.startTime < 2500) {
          console.log('✅ LCP is good (< 2.5s)')
        } else {
          console.log('⚠️ LCP needs improvement (> 2.5s)')
        }
      })
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch (e) {
        console.warn('LCP observer not supported')
      }

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime)
          
          const fid = entry.processingStart - entry.startTime
          if (fid < 100) {
            console.log('✅ FID is good (< 100ms)')
          } else {
            console.log('⚠️ FID needs improvement (> 100ms)')
          }
        })
      })
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] })
      } catch (e) {
        console.warn('FID observer not supported')
      }

      // Cumulative Layout Shift (CLS)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        console.log('CLS:', clsValue)
        
        if (clsValue < 0.1) {
          console.log('✅ CLS is good (< 0.1)')
        } else {
          console.log('⚠️ CLS needs improvement (> 0.1)')
        }
      })
      
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      } catch (e) {
        console.warn('CLS observer not supported')
      }

      // Time to First Byte (TTFB)
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          const ttfb = entry.responseStart - entry.requestStart
          console.log('TTFB:', ttfb)
          
          if (ttfb < 800) {
            console.log('✅ TTFB is good (< 800ms)')
          } else {
            console.log('⚠️ TTFB needs improvement (> 800ms)')
          }
        })
      })
      
      try {
        navigationObserver.observe({ entryTypes: ['navigation'] })
      } catch (e) {
        console.warn('Navigation observer not supported')
      }
    }

    // Track image loading performance
    const trackImagePerformance = () => {
      const images = document.querySelectorAll('img')
      images.forEach((img) => {
        img.addEventListener('load', () => {
          const loadTime = performance.now()
          console.log(`Image loaded: ${img.src} in ${loadTime}ms`)
        })
      })
    }

    // Track after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', trackImagePerformance)
    } else {
      trackImagePerformance()
    }

    return () => {
      // Cleanup observers
      if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
        // Cleanup would be handled automatically, but we can add specific cleanup if needed
      }
    }
  }, [])

  return null // This component doesn't render anything
}

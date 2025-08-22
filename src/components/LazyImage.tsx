'use client'

import { memo, useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  sizes?: string
  className?: string
  fallbackSrc?: string
  onLoad?: () => void
  onError?: () => void
}

// Optimized lazy image component with intersection observer
export const LazyImage = memo(({ 
  src, 
  alt, 
  width, 
  height, 
  fill = false,
  priority = false,
  sizes,
  className = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop&auto=format&q=80',
  onLoad,
  onError
}: LazyImageProps) => {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imageRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imageRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { 
        rootMargin: '50px 0px', // Start loading 50px before entering viewport
        threshold: 0.1 
      }
    )

    observer.observe(imageRef.current)

    return () => observer.disconnect()
  }, [priority])

  const handleImageLoad = () => {
    setImageLoading(false)
    onLoad?.()
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
    onError?.()
  }

  const imageSrc = imageError ? fallbackSrc : src

  return (
    <div ref={imageRef} className={`relative ${className}`}>
      {/* Loading skeleton */}
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      
      {/* Image */}
      {isInView && (
        <Image 
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          className={`transition-opacity duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          sizes={sizes}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
    </div>
  )
})

LazyImage.displayName = 'LazyImage'

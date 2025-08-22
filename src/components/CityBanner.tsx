'use client'

import { memo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { City } from '@/types'
import { formatPrice } from '@/lib/utils'
import { MapPin, Home } from 'lucide-react'

interface CityBannerProps {
  city: City
}

// Optimized CityBanner with React.memo for performance
export const CityBanner = memo(function CityBanner({ city }: CityBannerProps) {
  const router = useRouter()
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  // Fallback image for errors
  const fallbackImage = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop&auto=format&q=80'
  const imageSrc = imageError ? fallbackImage : `https://images.unsplash.com/photo-${city.image}?w=400&h=300&fit=crop&auto=format&q=80`

  return (
    <button
      onClick={() => router.push(`/city/${city.slug}`)}
      className="group block relative overflow-hidden rounded-lg aspect-[3/2] bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 w-full text-left"
    >
      {/* Loading skeleton */}
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      <Image
        src={imageSrc}
        alt={`Properties in ${city.name}`}
        fill
        className={`object-cover transition-opacity duration-300 ${
          imageLoading ? 'opacity-0' : 'opacity-100'
        } group-hover:scale-105 transition-transform duration-300`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
      />
      
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
      
      <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span className="font-semibold text-lg">{city.name}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Home className="w-4 h-4" />
            <span className="text-sm">
              {city.propertyCount.toLocaleString()} properties
            </span>
          </div>
          <div className="text-sm opacity-90">
            Avg. {formatPrice(city.avgPrice)}
          </div>
        </div>
      </div>
    </button>
  )
})

// Optimized skeleton component
export const CityBannerSkeleton = memo(function CityBannerSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-lg aspect-[3/2] bg-gray-200 animate-pulse">
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div className="h-6 bg-gray-300 rounded w-24 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-32 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-28 animate-pulse" />
        </div>
      </div>
    </div>
  )
})

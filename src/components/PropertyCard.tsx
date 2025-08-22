'use client'

import { memo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Property } from '@/types'
import { formatPrice, formatArea, getImageUrl } from '@/lib/utils'
import { Bed, Square, MapPin, Calendar, Monitor, Car, Play } from 'lucide-react'

interface PropertyCardProps {
  property: Property
  priority?: boolean
}

// Optimized PropertyCard with React.memo for performance
export const PropertyCard = memo(function PropertyCard({ property, priority = false }: PropertyCardProps) {
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
  const imageSrc = imageError ? fallbackImage : getImageUrl(property.images[0], 400)

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer"
      onClick={() => router.push(`/property/${property.id}`)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Loading skeleton */}
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        <Image 
          src={imageSrc}
          alt={property.title}
          fill 
          className={`object-cover transition-opacity duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          } group-hover:scale-105 transition-transform duration-300`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading={priority ? 'eager' : 'lazy'}
        />
        
        {/* Play button for virtual tour */}
        <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors cursor-pointer">
          <Play className="w-4 h-4 text-blue-600" />
        </div>
        
        {/* Badges */}
        {property.featured && (
          <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
            Featured
          </Badge>
        )}
        {property.readyToMove && (
          <Badge className="absolute top-2 left-2 bg-green-500 text-white">
            Ready to Move
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-1">
          {property.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          By {property.developer || 'Developer'}
        </p>
        
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <Bed className="w-4 h-4 mr-1" />
            <span>{property.bedrooms}BHK</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Square className="w-4 h-4 mr-1" />
            <span>{formatArea(property.area)}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">
            {property.location.area}, {property.location.city}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <Calendar className="w-4 h-4 mr-1" />
          <span className="text-sm">
            {property.readyToMove ? 'Ready to Move' : property.possessionDate || 'December 2027'}
          </span>
        </div>
        
        <div className="text-lg font-bold text-gray-900 mb-4">
          {formatPrice(property.price)} (All Inc)
        </div>
        
        <div className="flex space-x-2">
          <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
            <Monitor className="w-4 h-4 mr-1" />
            Virtual Tour
          </button>
          <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
            <Car className="w-4 h-4 mr-1" />
            Tour
          </button>
        </div>
      </div>
    </div>
  )
})

// Optimized skeleton component
export const PropertyCardSkeleton = memo(function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
      <div className="relative aspect-[4/3] bg-gray-200 animate-pulse" />
      <div className="p-4">
        <div className="h-5 bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3 animate-pulse" />
        <div className="flex space-x-4 mb-3">
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-full mb-3 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse" />
        <div className="flex space-x-2">
          <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse" />
          <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
})

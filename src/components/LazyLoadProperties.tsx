'use client'

import { memo, useState, useEffect, useCallback, useMemo } from 'react'
import { PropertyCard, PropertyCardSkeleton } from './PropertyCard'
import { Property } from '@/types'

interface LazyLoadPropertiesProps {
  properties: Property[]
  initialItems?: number
  itemsPerPage?: number
  useVirtualization?: boolean
}

// Optimized LazyLoadProperties with React.memo and better performance
export const LazyLoadProperties = memo(function LazyLoadProperties({ 
  properties, 
  initialItems = 8, 
  itemsPerPage = 8,
  useVirtualization = false 
}: LazyLoadPropertiesProps) {
  const [visibleItems, setVisibleItems] = useState(initialItems)
  const [isLoading, setIsLoading] = useState(false)

  // Memoize the visible properties to prevent unnecessary re-renders
  const visibleProperties = useMemo(() => {
    return properties.slice(0, visibleItems)
  }, [properties, visibleItems])

  // Memoize the load more function
  const loadMore = useCallback(() => {
    if (visibleItems >= properties.length) return
    
    setIsLoading(true)
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisibleItems(prev => Math.min(prev + itemsPerPage, properties.length))
      setIsLoading(false)
    }, 300)
  }, [visibleItems, properties.length, itemsPerPage])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (useVirtualization || visibleItems >= properties.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoading) {
            loadMore()
          }
        })
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    const sentinel = document.getElementById('load-more-sentinel')
    if (sentinel) {
      observer.observe(sentinel)
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel)
      }
    }
  }, [loadMore, isLoading, useVirtualization, visibleItems, properties.length])

  // Show loading state if no properties
  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">No properties found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleProperties.map((property, index) => (
          <PropertyCard 
            key={property.id} 
            property={property}
            priority={index < 4} // Prioritize first 4 images for LCP
          />
        ))}
      </div>

      {/* Load More Section */}
      {visibleItems < properties.length && (
        <div className="text-center py-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: Math.min(itemsPerPage, properties.length - visibleItems) }).map((_, index) => (
                <PropertyCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          ) : (
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Load More Properties ({properties.length - visibleItems} remaining)
            </button>
          )}
        </div>
      )}

      {/* Intersection Observer Sentinel */}
      {useVirtualization && visibleItems < properties.length && (
        <div id="load-more-sentinel" className="h-1" />
      )}

      {/* End of results */}
      {visibleItems >= properties.length && properties.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">
            Showing all {properties.length} properties
          </p>
        </div>
      )}
    </div>
  )
})

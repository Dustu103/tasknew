'use client'

import { useState, useCallback } from 'react'
import { PropertyCard, PropertyCardSkeleton } from '@/components/PropertyCard'
import { Property } from '@/types'

interface VirtualizedPropertyGridProps {
  properties: Property[]
  itemHeight?: number
  containerHeight?: number
  overscan?: number
}

export function VirtualizedPropertyGrid({
  properties,
  itemHeight = 400,
  containerHeight = 800,
  overscan = 5
}: VirtualizedPropertyGridProps) {
  const [scrollTop, setScrollTop] = useState(0)
  
  const itemsPerRow = 4 // xl:grid-cols-4
  const rowHeight = itemHeight + 24 // gap-6 = 24px
  
  const totalRows = Math.ceil(properties.length / itemsPerRow)
  const totalHeight = totalRows * rowHeight
  
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan)
  const endIndex = Math.min(
    totalRows,
    Math.ceil((scrollTop + containerHeight) / rowHeight) + overscan
  )
  
  const visibleRows = endIndex - startIndex
  const offsetY = startIndex * rowHeight
  
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])
  
  const renderRow = (rowIndex: number) => {
    const startPropertyIndex = rowIndex * itemsPerRow
    const endPropertyIndex = Math.min(startPropertyIndex + itemsPerRow, properties.length)
    const rowProperties = properties.slice(startPropertyIndex, endPropertyIndex)
    
    return (
      <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {rowProperties.map((property, index) => (
          <PropertyCard 
            key={property.id} 
            property={property} 
            priority={startPropertyIndex + index < 8} // Prioritize first 8 images
          />
        ))}
        {/* Fill empty slots with skeletons */}
        {Array.from({ length: itemsPerRow - rowProperties.length }).map((_, index) => (
          <PropertyCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    )
  }
  
  return (
    <div 
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {Array.from({ length: visibleRows }, (_, index) => 
            renderRow(startIndex + index)
          )}
        </div>
      </div>
    </div>
  )
}

// Fallback component for when virtualization is not needed
export function SimplePropertyGrid({ properties }: { properties: Property[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {properties.map((property, index) => (
        <PropertyCard 
          key={property.id} 
          property={property} 
          priority={index < 8} // Prioritize first 8 images
        />
      ))}
    </div>
  )
}

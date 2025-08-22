'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, memo, useMemo, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { CitySearchSection } from '@/components/CitySearchSection'
import { PopularCitiesSection } from '@/components/PopularCitiesSection'
import { Property } from '@/types'

// Lazy load heavy components with proper client-side loading
const LazyLoadProperties = dynamic(() => import('@/components/LazyLoadProperties').then(mod => ({ default: mod.LazyLoadProperties })), {
  loading: () => <PropertiesSkeleton />,
  ssr: false // Safe to use in client component
})

// Memoized skeleton component
const PropertiesSkeleton = memo(() => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
        <div className="space-y-2">
          <div className="bg-gray-200 h-4 rounded w-3/4"></div>
          <div className="bg-gray-200 h-4 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
))

PropertiesSkeleton.displayName = 'PropertiesSkeleton'

interface CityPageProps {
  properties: Property[]
  cities: any[]
  revalidateTime?: number
}

// Memoized city info component
const CityInfo = memo(({ city, propertyCount }: { city: any; propertyCount: number }) => (
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-2">Properties in {city.name}</h1>
    <p className="text-gray-600">Found {propertyCount} properties in {city.name}</p>
  </div>
))

CityInfo.displayName = 'CityInfo'

// Memoized empty state component
const EmptyState = memo(({ cityName, onBrowseClick }: { cityName: string; onBrowseClick: () => void }) => (
  <div className="text-center py-16">
    <div className="max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found in {cityName}</h3>
      <p className="text-gray-600 mb-6">Try searching in nearby areas or browse our featured properties</p>
      <button 
        onClick={onBrowseClick}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Browse Featured Properties
      </button>
    </div>
  </div>
))

EmptyState.displayName = 'EmptyState'



const CityPage = memo(({ properties, cities, revalidateTime = 86400 }: CityPageProps) => {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [city, setCity] = useState<any>(null)
  const [cityProperties, setCityProperties] = useState<Property[]>([])

  // Memoized city data processing
  const processedCityData = useMemo(() => {
    if (!id || !cities.length) return null
    
    const foundCity = cities.find(c => c.slug === id)
    if (!foundCity) return null
    
    const filteredProperties = properties.filter(
      p => p.location.city.toLowerCase() === foundCity.name.toLowerCase()
    ).sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
    })
    
    return { city: foundCity, properties: filteredProperties }
  }, [id, cities, properties])

  // Memoized navigation handler
  const handleBrowseClick = useCallback(() => {
    router.push('/')
  }, [router])

  useEffect(() => {
    if (processedCityData) {
      setCity(processedCityData.city)
      setCityProperties(processedCityData.properties)
    } else {
      router.push('/')
    }
  }, [processedCityData, router])

  if (!city) {
    return (
      <div className="py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <CitySearchSection currentCity={city.name} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        
        <CityInfo city={city} propertyCount={cityProperties.length} />

        {cityProperties.length === 0 ? (
          <EmptyState cityName={city.name} onBrowseClick={handleBrowseClick} />
        ) : (
          <LazyLoadProperties 
            properties={cityProperties} 
            initialItems={8} 
            itemsPerPage={8} 
            useVirtualization={cityProperties.length > 50} 
          />
        )}
      </div>

      <PopularCitiesSection />
    </div>
  )
})

CityPage.displayName = 'CityPage'

export { CityPage }

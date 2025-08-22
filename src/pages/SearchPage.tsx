'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { PopularCitiesSection } from '@/components/PopularCitiesSection'
import { LazyLoadProperties } from '@/components/LazyLoadProperties'
import { Property, City } from '@/types'

interface SearchPageProps {
  properties: Property[]
  cities: City[]
}

export function SearchPage({ properties }: SearchPageProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchResults, setSearchResults] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const query = searchParams?.get('q') || ''
    const location = searchParams?.get('location') || ''

    setIsLoading(true)

    // Simulate search delay
    setTimeout(() => {
      let filteredProperties = properties

      // Filter by location
      if (location) {
        filteredProperties = filteredProperties.filter(
          p => p.location.city.toLowerCase().includes(location.toLowerCase()) ||
               p.location.area.toLowerCase().includes(location.toLowerCase())
        )
      }

      // Filter by query
      if (query) {
        filteredProperties = filteredProperties.filter(
          p => p.title.toLowerCase().includes(query.toLowerCase()) ||
               p.description.toLowerCase().includes(query.toLowerCase()) ||
               p.location.area.toLowerCase().includes(query.toLowerCase())
        )
      }

      // Sort by featured and date
      filteredProperties.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      })

      setSearchResults(filteredProperties)
      setIsLoading(false)
    }, 300)
  }, [searchParams, properties])

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching properties...</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
              <p className="text-gray-600">Found {searchResults.length} properties</p>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse our featured properties</p>
                  <button 
                    onClick={() => router.push('/')}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Browse Featured Properties
                  </button>
                </div>
              </div>
            ) : (
              <LazyLoadProperties 
                properties={searchResults} 
                initialItems={8} 
                itemsPerPage={8} 
                useVirtualization={searchResults.length > 50} 
              />
            )}
          </>
        )}
      </div>

      <PopularCitiesSection />
    </div>
  )
}

export default SearchPage

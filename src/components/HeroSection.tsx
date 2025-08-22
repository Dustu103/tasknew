'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SearchBar } from '@/components/SearchBar'
import { getCities } from '@/lib/data'
import { City } from '@/types'

export function HeroSection() {
  const router = useRouter()
  const [cities, setCities] = useState<City[]>([])

  useEffect(() => {
    // Load cities using the data service
    const loadCities = async () => {
      try {
        const citiesData = await getCities()
        setCities(citiesData)
      } catch (error) {
        console.error('Error loading cities:', error)
      }
    }
    loadCities()
  }, [])

  const handleSearch = async (query: string, location: string) => {
    console.log('Search:', { query, location })
    
    // Find the selected city data
    const selectedCityData = cities.find(city => city.name === location)
    console.log('Selected city data:', selectedCityData)
    
    if (selectedCityData) {
      // Navigate directly to the city page
      const citySlug = selectedCityData.slug
      router.push(`/city/${citySlug}`)
    } else {
      // Fallback to search page if city not found
      const searchParams = new URLSearchParams()
      if (query) searchParams.set('q', query)
      if (location) searchParams.set('location', location)
      
      const searchUrl = `/search?${searchParams.toString()}`
      router.push(searchUrl)
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Dream Home
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover millions of verified properties across India
          </p>
          
          <SearchBar 
            onSearch={handleSearch}
            className="max-w-2xl mx-auto"
          />
          
          {/* Debug info - remove this in production */}
          <div className="mt-4 text-sm text-blue-200">
            <p>Available cities: {cities.map(city => city.name).join(', ')}</p>
            <p>Select a city to navigate to its dedicated page</p>
          </div>
        </div>
      </div>
    </section>
  )
}

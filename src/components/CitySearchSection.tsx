'use client'

import { useRouter } from 'next/navigation'
import { SearchBar } from '@/components/SearchBar'

interface CitySearchSectionProps {
  currentCity?: string
}

export function CitySearchSection({ currentCity }: CitySearchSectionProps) {
  const router = useRouter()

  const handleSearch = (query: string, location: string) => {
    console.log('Search:', { query, location })
    
    // Navigate to search page with query parameters
    const searchParams = new URLSearchParams()
    if (query) searchParams.set('q', query)
    if (location) searchParams.set('location', location)
    
    const searchUrl = `/search?${searchParams.toString()}`
    router.push(searchUrl)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <SearchBar 
        onSearch={handleSearch}
        className="max-w-2xl"
        initialLocation={currentCity}
      />
    </div>
  )
}

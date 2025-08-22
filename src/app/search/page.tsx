import { Suspense } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { SearchPageWrapper } from '@/components/SearchPageWrapper'
import { PropertyCardSkeleton } from '@/components/PropertyCard'
import { LazyLoadProperties } from '@/components/LazyLoadProperties'
import { mockProperties } from '@/data/mockData'
import { SearchParams, Property } from '@/types'

// Force dynamic rendering for search page - real-time user interactions
export const dynamic = 'force-dynamic'

interface SearchPageProps {
  searchParams: SearchParams
}

function filterProperties(properties: Property[], params: SearchParams): Property[] {
  let filtered = [...properties]

  if (params.location) {
    filtered = filtered.filter(p => 
      p.location.city.toLowerCase().includes(params.location!.toLowerCase()) ||
      p.location.area.toLowerCase().includes(params.location!.toLowerCase())
    )
  }

  if (params.q) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(params.q!.toLowerCase()) ||
      p.description.toLowerCase().includes(params.q!.toLowerCase())
    )
  }

  if (params.propertyType && params.propertyType !== 'all') {
    filtered = filtered.filter(p => p.propertyType === params.propertyType)
  }

  if (params.priceMin) {
    filtered = filtered.filter(p => p.price >= params.priceMin!)
  }

  if (params.priceMax) {
    filtered = filtered.filter(p => p.price <= params.priceMax!)
  }

  if (params.bedrooms) {
    const bedrooms = parseInt(params.bedrooms)
    filtered = filtered.filter(p => p.bedrooms === bedrooms)
  }

  // Sort by featured first, then by date
  filtered.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
  })

  return filtered
}

// Server Component for search results
async function SearchResults({ searchParams }: { searchParams: SearchParams }) {
  // Server-side filtering - no client state needed
  const filteredProperties = filterProperties(mockProperties, searchParams)
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Top Projects In {searchParams.location || 'India'}
        </h1>
        <p className="text-gray-600">
          Found {filteredProperties.length} properties
          {searchParams.location && ` in ${searchParams.location}`}
          {searchParams.q && ` matching "${searchParams.q}"`}
        </p>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse our featured properties
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Featured Properties
            </Link>
          </div>
        </div>
      ) : (
        <LazyLoadProperties 
          properties={filteredProperties} 
          initialItems={16} 
          itemsPerPage={12} 
          useVirtualization={filteredProperties.length > 50} 
        />
      )}
    </div>
  )
}

// Loading skeleton for search results
function SearchResultsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded w-64 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 16 }).map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

// Main Search Page Component
export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <SearchPageWrapper />
        
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  )
}

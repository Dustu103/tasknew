import { Suspense } from 'react'
import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { PropertyCardSkeleton } from '@/components/PropertyCard'
import { LazyLoadProperties } from '@/components/LazyLoadProperties'
import { CityBanner, CityBannerSkeleton } from '@/components/CityBanner'
import { TrendingSearches, TrendingSearchesSkeleton } from '@/components/TrendingSearches'
import { mockProperties, mockCities, mockTrendingSearches } from '@/data/mockData'

// Static caching with revalidation - data updates every hour
export const revalidate = 3600 

// Featured Properties Section - Server Component with static data
async function FeaturedProperties() {
  // Simulate server-side data fetching with caching
  const featuredProperties = mockProperties.filter(p => p.featured).slice(0, 24)
  
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked properties that match your preferences and budget
          </p>
        </div>
        
        <LazyLoadProperties properties={featuredProperties} initialItems={12} itemsPerPage={8} useVirtualization={featuredProperties.length > 50} />
      </div>
    </section>
  )
}

// Popular Cities Section - Server Component with static data
async function PopularCities() {
  // Simulate server-side data fetching with caching
  const cities = mockCities
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Popular Cities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore properties in India's most sought-after cities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <CityBanner key={city.id} city={city} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Trending Searches Section - Server Component with static data
async function TrendingSearchesSection() {
  // Simulate server-side data fetching with caching
  const searches = mockTrendingSearches
  
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrendingSearches searches={searches} />
      </div>
    </section>
  )
}

// Loading Components
function FeaturedPropertiesSkeleton() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PopularCitiesSkeleton() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-80 mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <CityBannerSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TrendingSearchesSkeletonSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrendingSearchesSkeleton />
      </div>
    </section>
  )
}

// Main Page Component
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      
      <Suspense fallback={<FeaturedPropertiesSkeleton />}>
        <FeaturedProperties />
      </Suspense>
      
      <Suspense fallback={<PopularCitiesSkeleton />}>
        <PopularCities />
      </Suspense>
      
      <Suspense fallback={<TrendingSearchesSkeletonSection />}>
        <TrendingSearchesSection />
      </Suspense>
    </div>
  )
}

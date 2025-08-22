// app/city/[id]/page.tsx
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { SearchBar } from '@/components/SearchBar'
import { PropertyCardSkeleton } from '@/components/PropertyCard'
import { LazyLoadProperties } from '@/components/LazyLoadProperties'
import { mockProperties, mockCities } from '@/data/mockData'
import { Property } from '@/types'

// Long revalidate for prebuilt pages
export const revalidate = 86400 // 24h

// Tune: how many cities to pre-build at deploy time
const PREBUILD_TOP_N = 20
// TTL for dynamically-fetched city pages after first request
const DYNAMIC_REVALIDATE = 60 // seconds

interface CityPageProps {
  params: { id: string }
}

// Prebuild top N cities (keeps build time reasonable)
export async function generateStaticParams() {
  const top = mockCities.slice(0, PREBUILD_TOP_N)
  return top.map((city) => ({ id: city.slug }))
}

/**
 * Try local dataset first (fast). If missing, attempt a server fetch (dynamic).
 * Replace fetch URL with your real API if needed.
 */
async function fetchCityFromAPI(slug: string) {
  try {
    const res = await fetch(`https://api.example.com/cities/${slug}`, {
      next: { revalidate: DYNAMIC_REVALIDATE },
    })
    if (!res.ok) {
      if (res.status === 404) return null
      throw new Error(`fetch failed ${res.status}`)
    }
    return await res.json()
  } catch (e) {
    console.warn('fetchCityFromAPI error', e)
    return null
  }
}

async function getCityData(slug: string) {
  const local = mockCities.find((c) => c.slug === slug)
  if (local) return local
  return await fetchCityFromAPI(slug)
}

// Metadata works for both static & dynamic pages
export async function generateMetadata({ params }: CityPageProps) {
  const city = await getCityData(params.id)
  if (!city) {
    return { title: 'City Not Found', description: 'The requested city could not be found.' }
  }
  return {
    title: `Properties in ${city.name} - Buy, Rent, Sell`,
    description: `Find your dream home in ${city.name}. Browse verified properties for sale and rent in ${city.name}.`,
    openGraph: { title: `Properties in ${city.name} - Housing.com`, description: `Find your dream home in ${city.name}.`, images: [city.image] },
  }
}

function filterPropertiesByCity(properties: Property[], cityNameOrSlug: string): Property[] {
  // Accept either city slug or name; prefer matching by city name if found locally
  const city = mockCities.find((c) => c.slug === cityNameOrSlug) ?? mockCities.find((c) => c.name.toLowerCase() === cityNameOrSlug.toLowerCase())
  if (!city) return []
  return properties
    .filter((p) => p.location.city.toLowerCase() === city.name.toLowerCase())
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
    })
}

// Server Component for city properties (may resolve via API)
async function CityProperties({ citySlug }: { citySlug: string }) {
  const city = await getCityData(citySlug)
  if (!city) notFound()

  const cityProperties = filterPropertiesByCity(mockProperties, city.name)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Properties in {city.name}</h1>
        <p className="text-gray-600">Found {cityProperties.length} properties in {city.name}</p>
      </div>

      {cityProperties.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found in {city.name}</h3>
            <p className="text-gray-600 mb-6">Try searching in nearby areas or browse our featured properties</p>
            <a href="/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Browse Featured Properties</a>
          </div>
        </div>
      ) : (
        <LazyLoadProperties properties={cityProperties} initialItems={16} itemsPerPage={12} useVirtualization={cityProperties.length > 50} />
      )}
    </div>
  )
}

function CityPropertiesSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded w-64 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 16 }).map((_, i) => <PropertyCardSkeleton key={i} />)}
      </div>
    </div>
  )
}

export default function CityPage({ params }: CityPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <SearchBar onSearch={(query, location) => console.log('Search:', { query, location })} className="max-w-2xl" />
        </div>

        <Suspense fallback={<CityPropertiesSkeleton />}>
          <CityProperties citySlug={params.id} />
        </Suspense>
      </main>
    </div>
  )
}

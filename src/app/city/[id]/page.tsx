import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { CityPage } from '@/pages/CityPage'
import { getCities, getPropertiesByLocation } from '@/lib/data'

interface CityPageProps {
  params: Promise<{ id: string }>
}

// Define caching strategies for different cities
const CACHING_STRATEGIES = {
  // Top tier cities - High traffic, frequent updates (1 hour)
  'mumbai': { revalidate: 3600 },
  'delhi': { revalidate: 3600 },
  'bangalore': { revalidate: 3600 },
  'bengaluru': { revalidate: 3600 },
  'pune': { revalidate: 3600 },
  
  // Second tier cities - Medium traffic, daily updates (1 day)
  'kolkata': { revalidate: 86400 },
  'chennai': { revalidate: 86400 },
  'hyderabad': { revalidate: 86400 },
  'ahmedabad': { revalidate: 86400 },
  'noida': { revalidate: 86400 },
  'gurgaon': { revalidate: 86400 },
  'gurugram': { revalidate: 86400 },
  'thane': { revalidate: 86400 },
  'navi-mumbai': { revalidate: 86400 },
  'faridabad': { revalidate: 86400 },
  
  // Third tier cities - Lower traffic, weekly updates (1 week)
  'lucknow': { revalidate: 604800 },
  'jaipur': { revalidate: 604800 },
  'indore': { revalidate: 604800 },
  'bhopal': { revalidate: 604800 },
  'patna': { revalidate: 604800 },
  'chandigarh': { revalidate: 604800 },
  'vadodara': { revalidate: 604800 },
  'nagpur': { revalidate: 604800 },
  'coimbatore': { revalidate: 604800 },
  'kochi': { revalidate: 604800 },
  
  // Default for other cities - Monthly updates (1 month)
  'default': { revalidate: 2592000 }
}

// Get caching strategy for a city
function getCachingStrategy(citySlug: string) {
  return CACHING_STRATEGIES[citySlug as keyof typeof CACHING_STRATEGIES] || CACHING_STRATEGIES.default
}

// Generate static params for top 20 cities
export async function generateStaticParams() {
  try {
    const cities = await getCities()
    const topCities = cities.slice(0, 20) // Top 20 cities
    
    return topCities.map((city) => ({
      id: city.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function CityPageNext({ params }: CityPageProps) {
  const { id } = await params
  
  try {
    // Get caching strategy for this city
    const cachingStrategy = getCachingStrategy(id)
    
    // SSR: Fetch data on server side
    const [cities, properties] = await Promise.all([
      getCities(),
      getPropertiesByLocation(id, 100)
    ])
    
    // Find the city
    const city = cities.find(c => c.slug === id)
    
    if (!city) {
      notFound()
    }
    
    // Log caching strategy for debugging
    console.log(`City: ${city.name}, Revalidation: ${cachingStrategy.revalidate}s (${cachingStrategy.revalidate / 3600}h)`)
    
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading {city.name} properties...</p>
          </div>
        </div>
      }>
        <CityPage 
          properties={properties} 
          cities={cities} 
          revalidateTime={cachingStrategy.revalidate}
        />
      </Suspense>
    )
  } catch (error) {
    console.error('Error loading city page:', error)
    notFound()
  }
}

// Set dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  try {
    const cities = await getCities()
    const city = cities.find(c => c.slug === id)
    
    if (!city) {
      return {
        title: 'City Not Found',
        description: 'The requested city could not be found.'
      }
    }
    
    const cachingStrategy = getCachingStrategy(id)
    const revalidateHours = Math.round(cachingStrategy.revalidate / 3600)
    
    return {
      title: `Properties in ${city.name} - Housing.com`,
      description: `Find ${city.propertyCount.toLocaleString()} properties in ${city.name}, ${city.state}. Updated every ${revalidateHours} hours.`,
      openGraph: {
        title: `Properties in ${city.name}`,
        description: `Discover ${city.propertyCount.toLocaleString()} properties in ${city.name}`,
        type: 'website',
      }
    }
  } catch (error) {
    return {
      title: 'Properties - Housing.com',
      description: 'Find your dream home'
    }
  }
}

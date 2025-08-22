import { Property, City, TrendingSearch, SearchParams } from '@/types'

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

// Production-ready data fetching with Next.js SSR caching
export async function fetchProperties(params: SearchParams = {}): Promise<Property[]> {
  // In production, this would be a real API call with Next.js caching
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch properties')
  }
  
  const properties = await response.json()
  return filterProperties(properties, params)
}

export async function fetchCities(): Promise<City[]> {
  // In production, this would be a real API call with Next.js caching
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cities`, {
    next: { revalidate: 86400 } // Cache for 1 day
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch cities')
  }
  
  return response.json()
}

export async function fetchPropertiesByLocation(location: string, limit: number = 12): Promise<Property[]> {
  // Get caching strategy for this location
  const cachingStrategy = getCachingStrategy(location.toLowerCase())
  
  // In production, this would be a real API call with city-specific caching
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties?location=${location}&limit=${limit}`, {
    next: { revalidate: cachingStrategy.revalidate }
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch properties by location')
  }
  
  return response.json()
}

export async function fetchTrendingSearches(): Promise<TrendingSearch[]> {
  // In production, this would be a real API call with Next.js caching
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trending`, {
    next: { revalidate: 1800 } // Cache for 30 minutes
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch trending searches')
  }
  
  return response.json()
}

// Helper function to filter properties
function filterProperties(properties: Property[], params: SearchParams): Property[] {
  let filtered = properties

  if (params.location) {
    filtered = filtered.filter(p => 
      p.location.city.toLowerCase().includes(params.location!.toLowerCase()) ||
      p.location.area.toLowerCase().includes(params.location!.toLowerCase())
    )
  }

  if (params.propertyType) {
    filtered = filtered.filter(p => p.propertyType === params.propertyType)
  }

  if (params.priceMin) {
    filtered = filtered.filter(p => p.price >= params.priceMin!)
  }

  if (params.priceMax) {
    filtered = filtered.filter(p => p.price <= params.priceMax!)
  }

  if (params.bedrooms) {
    filtered = filtered.filter(p => p.bedrooms.toString() === params.bedrooms)
  }

  return filtered
}

// Export caching strategies for use in other parts of the app
export { getCachingStrategy, CACHING_STRATEGIES }

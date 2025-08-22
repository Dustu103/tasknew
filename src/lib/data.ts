import { mockProperties, mockCities, mockTrendingSearches } from '@/data/mockData'
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

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Simulate fetch with Next.js caching
async function fetchWithCache<T>(url: string, options: { revalidate?: number } = {}): Promise<T> {
  // In a real app, this would be an actual fetch call with Next.js caching
  // For now, we simulate the caching behavior
  await delay(100)
  
  // Simulate different data based on URL
  if (url.includes('/cities')) {
    return mockCities as T
  } else if (url.includes('/properties')) {
    return mockProperties as T
  } else if (url.includes('/trending')) {
    return mockTrendingSearches as T
  }
  
  return [] as T
}

// Real Next.js fetch with caching (for production)
async function fetchWithNextJSCache<T>(url: string): Promise<T> {
  // This is how you would use Next.js fetch with caching in production
  // const response = await fetch(url, { 
  //   next: { revalidate: 3600 } 
  // })
  // return response.json()
  
  // For now, we use our simulation
  return fetchWithCache<T>(url)
}

export async function getProperties(params: SearchParams = {}): Promise<Property[]> {
  // Use Next.js fetch caching with SSR optimization
  const properties = await fetchWithNextJSCache<Property[]>('/api/properties')
  return filterProperties(properties, params)
}

export async function getCities(): Promise<City[]> {
  // Use Next.js fetch caching with SSR optimization
  return await fetchWithNextJSCache<City[]>('/api/cities') // Cache for 1 day
}

export async function getTrendingSearches(): Promise<TrendingSearch[]> {
  // Use Next.js fetch caching with SSR optimization
  return await fetchWithNextJSCache<TrendingSearch[]>('/api/trending') // Cache for 30 minutes
}

export async function getFeaturedProperties(limit: number = 12): Promise<Property[]> {
  const properties = await getProperties()
  return properties.filter(p => p.featured).slice(0, limit)
}

export async function getPropertiesByLocation(location: string, limit: number = 12): Promise<Property[]> {
  // Get caching strategy for this location
  const cachingStrategy = getCachingStrategy(location.toLowerCase())
  
  // Use Next.js fetch caching with city-specific revalidation and SSR optimization
  const properties = await fetchWithNextJSCache<Property[]>(`/api/properties?location=${location}`)
  
  return properties
    .filter((p: Property) => 
      p.location.city.toLowerCase().includes(location.toLowerCase()) ||
      p.location.area.toLowerCase().includes(location.toLowerCase())
    )
    .slice(0, limit)
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

// Example of how to use real fetch with Next.js caching
export async function getCityData(citySlug: string) {
  const cachingStrategy = getCachingStrategy(citySlug)
  
  // This is how you would use real fetch with Next.js caching
  // const response = await fetch(`https://api.example.com/cities/${citySlug}`, {
  //   next: {
  //     revalidate: cachingStrategy.revalidate,
  //     tags: [`city-${citySlug}`]
  //   }
  // })
  // return response.json()
  
  // For now, simulate the behavior
  await delay(200)
  const cities = await getCities()
  return cities.find(c => c.slug === citySlug)
}

// Example of how to use fetch with no caching (for real-time data)
export async function getRealTimeData() {
  // This is how you would use fetch without caching
  // const response = await fetch('https://api.example.com/realtime', {
  //   cache: 'no-store'
  // })
  // return response.json()
  
  // For now, simulate the behavior
  await delay(100)
  return { timestamp: new Date().toISOString(), data: 'real-time' }
}

// Example of how to use fetch with force revalidation
export async function forceRevalidateCity(citySlug: string) {
  // This is how you would force revalidation
  // const response = await fetch(`https://api.example.com/cities/${citySlug}`, {
  //   next: {
  //     revalidate: 0
  //   }
  // })
  // return response.json()
  
  // For now, simulate the behavior
  await delay(100)
  const cities = await getCities()
  return cities.find(c => c.slug === citySlug)
}

import { mockProperties, mockCities, mockTrendingSearches } from '@/data/mockData'
import { Property, City, TrendingSearch, SearchParams } from '@/types'

// Cache for static data
let propertiesCache: Property[] | null = null
let citiesCache: City[] | null = null
let trendingSearchesCache: TrendingSearch[] | null = null

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function getProperties(params: SearchParams = {}): Promise<Property[]> {
  // Simulate API call with caching
  if (propertiesCache) {
    await delay(50) // Simulate cache hit
    return filterProperties(propertiesCache, params)
  }

  await delay(200) // Simulate API call
  propertiesCache = mockProperties
  return filterProperties(propertiesCache, params)
}

export async function getCities(): Promise<City[]> {
  if (citiesCache) {
    await delay(30)
    return citiesCache
  }

  await delay(150)
  citiesCache = mockCities
  return citiesCache
}

export async function getTrendingSearches(): Promise<TrendingSearch[]> {
  if (trendingSearchesCache) {
    await delay(30)
    return trendingSearchesCache
  }

  await delay(100)
  trendingSearchesCache = mockTrendingSearches
  return trendingSearchesCache
}

export async function getFeaturedProperties(limit: number = 12): Promise<Property[]> {
  const properties = await getProperties()
  return properties.filter(p => p.featured).slice(0, limit)
}

export async function getPropertiesByLocation(location: string, limit: number = 12): Promise<Property[]> {
  const properties = await getProperties()
  return properties
    .filter(p => 
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

// Cache invalidation function
export function invalidateCache() {
  propertiesCache = null
  citiesCache = null
  trendingSearchesCache = null
}

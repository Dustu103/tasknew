export interface Property {
  id: number
  title: string
  description: string
  price: number
  area: number
  bedrooms: number
  bathrooms: number
  parking: number
  propertyType: 'apartment' | 'house' | 'villa' | 'plot'
  furnishing: 'furnished' | 'semi-furnished' | 'unfurnished'
  floor: string
  amenities: string[]
  images: string[]
  location: {
    area: string
    city: string
    state: string
    pincode: string
  }
  featured: boolean
  verified: boolean
  postedDate: string
  developer?: string
  readyToMove?: boolean
  possessionDate?: string
}

export interface City {
  id: number
  name: string
  state: string
  slug: string
  image: string
  propertyCount: number
  avgPrice: number
}

export interface TrendingSearch {
  id: number
  query: string
  count: number
  city: string
}

export interface SearchFilters {
  location?: string
  propertyType?: string
  priceMin?: number
  priceMax?: number
  bedrooms?: string
  furnishing?: string
  amenities?: string[]
}

export interface SearchParams {
  location?: string
  propertyType?: string
  priceMin?: number
  priceMax?: number
  bedrooms?: string
  page?: number
  limit?: number
  q?: string
}

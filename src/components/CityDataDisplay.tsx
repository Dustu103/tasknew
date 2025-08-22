'use client'

import { useState, useEffect } from 'react'
import { City, Property } from '@/types'
import { getCities, getPropertiesByLocation } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import { MapPin, Home, TrendingUp } from 'lucide-react'

interface CityDataDisplayProps {
  selectedCity: string
}

export function CityDataDisplay({ selectedCity }: CityDataDisplayProps) {
  const [cityData, setCityData] = useState<City | null>(null)
  const [cityProperties, setCityProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (selectedCity) {
      setIsLoading(true)
      
      const loadCityData = async () => {
        try {
          // Get city data
          const cities = await getCities()
          const city = cities.find(c => c.name === selectedCity)
          setCityData(city || null)

          // Get properties for this city
          const properties = await getPropertiesByLocation(selectedCity, 6)
          setCityProperties(properties)
        } catch (error) {
          console.error('Error loading city data:', error)
        } finally {
          setIsLoading(false)
        }
      }

      loadCityData()
    }
  }, [selectedCity])

  if (!selectedCity || !cityData) {
    return null
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading city data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Properties in {cityData.name}
        </h2>
        <p className="text-gray-600">
          {cityData.state} • {cityData.propertyCount.toLocaleString()} properties
        </p>
      </div>

      {/* City Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <Home className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-900">
            {cityData.propertyCount.toLocaleString()}
          </div>
          <div className="text-sm text-blue-700">Properties</div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-900">
            {formatPrice(cityData.avgPrice)}
          </div>
          <div className="text-sm text-green-700">Average Price</div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <MapPin className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-900">
            {cityData.state}
          </div>
          <div className="text-sm text-purple-700">State</div>
        </div>
      </div>

      {/* Sample Properties */}
      {cityProperties.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Featured Properties in {cityData.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cityProperties.map((property) => (
              <div key={property.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{property.location.area}</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{property.title}</h4>
                <p className="text-lg font-bold text-blue-600 mb-2">
                  {formatPrice(property.price)}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{property.bedrooms} BHK</span>
                  <span>{property.area} sqft</span>
                  <span>{property.propertyType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

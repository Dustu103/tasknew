'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, memo, useCallback } from 'react'
import Image from 'next/image'
import { PopularCitiesSection } from '@/components/PopularCitiesSection'
import { formatPrice, formatArea } from '@/lib/utils'
import { Bed, Bath, Car, MapPin, Calendar, Users, Clock } from 'lucide-react'
import { Property } from '@/types'

interface PropertyPageProps {
  property: Property
  properties: Property[]
  cities: any[]
}

// Memoized availability status component
const AvailabilityStatus = memo(({ availability, propertyType, onBookNow }: { 
  availability: number
  propertyType: string
  onBookNow: () => void 
}) => {
  const getStatusColor = (availability: number) => {
    if (availability === 0) return 'text-red-600 bg-red-50 border-red-200'
    if (availability <= 2) return 'text-orange-600 bg-orange-50 border-orange-200'
    return 'text-green-600 bg-green-50 border-green-200'
  }

  const getStatusText = (availability: number) => {
    if (availability === 0) return 'Fully Booked'
    if (availability <= 2) return 'Limited Availability'
    return 'Available'
  }

  const getUnitText = (propertyType: string, availability: number) => {
    switch (propertyType) {
      case 'apartment':
        return `${availability} flats available`
      case 'house':
        return `${availability} houses available`
      case 'villa':
        return `${availability} villas available`
      case 'plot':
        return `${availability} plots available`
      default:
        return `${availability} units available`
    }
  }

  return (
    <div className={`p-4 rounded-lg border ${getStatusColor(availability)}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Users className="w-5 h-5 mr-2" />
          <span className="font-semibold">Availability</span>
        </div>
        <span className="text-lg font-bold">{getUnitText(propertyType, availability)}</span>
      </div>
      <p className="text-sm mb-3">{getStatusText(availability)}</p>
      {availability > 0 && (
        <button
          onClick={onBookNow}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Book Now
        </button>
      )}
    </div>
  )
})

AvailabilityStatus.displayName = 'AvailabilityStatus'

export function PropertyPage({ property: initialProperty, properties, cities }: PropertyPageProps) {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [property, setProperty] = useState<Property>(initialProperty)
  const [availability, setAvailability] = useState(property.availability || 5) // Default availability
  const [isBooking, setIsBooking] = useState(false)

  // Update property when initialProperty changes
  useEffect(() => {
    setProperty(initialProperty)
    setAvailability(initialProperty.availability || 5)
  }, [initialProperty])

  // Simulate real-time availability updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate availability changes (in real app, this would be WebSocket or polling)
      setAvailability(prev => {
        // Randomly decrease availability to simulate bookings
        if (Math.random() < 0.1 && prev > 0) { // 10% chance every 30 seconds
          return prev - 1
        }
        return prev
      })
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleBookNow = useCallback(async () => {
    if (availability <= 0 || isBooking) return

    setIsBooking(true)
    
    try {
      // Simulate API call to book the property
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update availability
      setAvailability(prev => prev - 1)
      
      // Show success message
      alert('Property booked successfully!')
    } catch (error) {
      alert('Booking failed. Please try again.')
    } finally {
      setIsBooking(false)
    }
  }, [availability, isBooking])

  if (!property) {
    return (
      <div className="py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Property Images */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover"
                priority
              />
              {property.featured && (
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {property.images.slice(1, 5).map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${property.title} - Image ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Property Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{property.location.area}, {property.location.city}</span>
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {formatPrice(property.price)}
              </div>
            </div>

            {/* Dynamic Availability Status */}
            <AvailabilityStatus 
              availability={availability} 
              propertyType={property.propertyType}
              onBookNow={handleBookNow}
            />

            {/* Property Stats */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Bed className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-sm text-gray-600">{property.bedrooms} Bedrooms</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Bath className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-sm text-gray-600">{property.bathrooms} Bathrooms</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Car className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-sm text-gray-600">{property.parking} Parking</div>
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{property.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Property Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Area:</span>
                    <span className="ml-2 font-medium">{formatArea(property.area)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Property Type:</span>
                    <span className="ml-2 font-medium">{property.propertyType}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Developer:</span>
                    <span className="ml-2 font-medium">{property.developer}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Posted:</span>
                    <span className="ml-2 font-medium">{new Date(property.postedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PopularCitiesSection />
    </div>
  )
}

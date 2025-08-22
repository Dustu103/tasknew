import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { mockProperties } from '@/data/mockData'
import { Property } from '@/types'
import { formatPrice, formatArea } from '@/lib/utils'
import { Bed, Bath, Car, MapPin, Calendar } from 'lucide-react'

// Force dynamic rendering for property details - data changes frequently
export const dynamic = 'force-dynamic'

interface PropertyPageProps {
  params: {
    id: string
  }
}

// Generate metadata for each property
export async function generateMetadata({ params }: PropertyPageProps) {
  const property = mockProperties.find(p => p.id.toString() === params.id)
  
  if (!property) {
    return {
      title: 'Property Not Found',
      description: 'The requested property could not be found.'
    }
  }

  return {
    title: `${property.title} - ${property.location.area}, ${property.location.city}`,
    description: property.description,
    openGraph: {
      title: property.title,
      description: property.description,
      images: [property.images[0]],
      type: 'website',
    },
  }
}

// Server Component for property details
async function PropertyDetails({ propertyId }: { propertyId: string }) {
  const property = mockProperties.find(p => p.id.toString() === propertyId)
  
  if (!property) {
    notFound()
  }
  
  return (
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Property Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Property Type:</span>
                  <span className="ml-2 font-medium">{property.propertyType}</span>
                </div>
                <div>
                  <span className="text-gray-600">Area:</span>
                  <span className="ml-2 font-medium">{formatArea(property.area)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Furnishing:</span>
                  <span className="ml-2 font-medium">{property.furnishing}</span>
                </div>
                <div>
                  <span className="text-gray-600">Floor:</span>
                  <span className="ml-2 font-medium">{property.floor}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {property.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Amenities</h3>
              <div className="grid grid-cols-2 gap-2">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Posted on {new Date(property.postedDate).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Contact Actions */}
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Contact Owner
            </button>
            <button className="w-full border border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Schedule Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Loading skeleton for property details
function PropertyDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
          </div>
          <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-200">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="text-center">
                <div className="h-5 bg-gray-200 rounded w-8 mx-auto mb-1 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-20 mx-auto animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Property Page Component
export default function PropertyPage({ params }: PropertyPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <Suspense fallback={<PropertyDetailsSkeleton />}>
          <PropertyDetails propertyId={params.id} />
        </Suspense>
      </main>
    </div>
  )
}

import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { PropertyPage } from '@/pages/PropertyPage'
import { getProperties, getCities } from '@/lib/data'

interface PropertyPageProps {
  params: Promise<{ id: string }>
}

export default async function PropertyPageNext({ params }: PropertyPageProps) {
  const { id } = await params
  
  try {
    // Fetch data with dynamic availability
    const [properties, cities] = await Promise.all([
      getProperties(),
      getCities()
    ])
    
    // Find the specific property
    const property = properties.find(p => p.id.toString() === id)
    
    if (!property) {
      notFound()
    }
    
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading property details...</p>
          </div>
        </div>
      }>
        <PropertyPage 
          property={property} 
          properties={properties} 
          cities={cities} 
        />
      </Suspense>
    )
  } catch (error) {
    console.error('Error loading property page:', error)
    notFound()
  }
}

// Generate static params for top properties
export async function generateStaticParams() {
  try {
    const properties = await getProperties()
    const topProperties = properties.slice(0, 50) // Top 50 properties
    
    return topProperties.map((property) => ({
      id: property.id.toString(),
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Set dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  try {
    const properties = await getProperties()
    const property = properties.find(p => p.id.toString() === id)
    
    if (!property) {
      return {
        title: 'Property Not Found',
        description: 'The requested property could not be found.'
      }
    }
    
    return {
      title: `${property.title} - ${property.location.city} | Housing.com`,
      description: `${property.title} in ${property.location.area}, ${property.location.city}. ${property.bedrooms}BHK, ${property.area} sq ft. Starting from ₹${property.price.toLocaleString()}.`,
      openGraph: {
        title: property.title,
        description: `${property.title} in ${property.location.city}`,
        type: 'website',
      }
    }
  } catch (error) {
    return {
      title: 'Property Details - Housing.com',
      description: 'Find your dream home'
    }
  }
}

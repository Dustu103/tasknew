'use client'

import { CityBanner } from '@/components/CityBanner'
import { mockCities } from '@/data/mockData'

export function PopularCitiesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Popular Cities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore properties in India&apos;s most sought-after cities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCities.map((city) => (
            <CityBanner key={city.id} city={city} />
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { SearchBar } from '@/components/SearchBar'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Dream Home
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover millions of verified properties across India
          </p>
          <SearchBar 
            onSearch={(query, location) => {
              // Handle search - would navigate to search page
              console.log('Search:', { query, location })
            }}
            className="max-w-2xl mx-auto"
          />
        </div>
      </div>
    </section>
  )
}

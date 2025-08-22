'use client'

import { SearchBar } from '@/components/SearchBar'

export function SearchPageWrapper() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <SearchBar 
        onSearch={(query, location) => {
          console.log('Search:', { query, location })
        }}
        className="max-w-2xl"
      />
    </div>
  )
}

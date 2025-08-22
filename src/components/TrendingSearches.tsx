'use client'

import { memo } from 'react'
import Link from 'next/link'
import { TrendingSearch } from '@/types'
import { Search, TrendingUp } from 'lucide-react'

interface TrendingSearchesProps {
  searches: TrendingSearch[]
}

// Optimized TrendingSearches with React.memo for performance
export const TrendingSearches = memo(function TrendingSearches({ searches }: TrendingSearchesProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Trending Searches
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what others are searching for in your area
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {searches.map((search) => (
            <Link
              key={search.id}
              href={`/search?q=${encodeURIComponent(search.query)}&location=${encodeURIComponent(search.city)}`}
              className="group block p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors border border-gray-200 hover:border-blue-300"
              prefetch={true}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Search className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-blue-900 transition-colors truncate">
                    {search.query}
                  </p>
                  <p className="text-xs text-gray-500">
                    {search.city} • {search.count.toLocaleString()} searches
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
})

// Optimized skeleton component
export const TrendingSearchesSkeleton = memo(function TrendingSearchesSkeleton() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-80 mx-auto animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

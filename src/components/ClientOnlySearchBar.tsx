'use client'

import { useState, useEffect } from 'react'
import { SearchBar } from './SearchBar'

interface ClientOnlySearchBarProps {
  onSearch?: (query: string, location: string) => void
  className?: string
  initialLocation?: string
}

export function ClientOnlySearchBar({ onSearch, className = '', initialLocation = '' }: ClientOnlySearchBarProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    // Show a loading placeholder during SSR
    return (
      <div className={`relative ${className}`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden flex-1 max-w-2xl">
            <div className="flex items-center px-6 py-4 bg-gray-50 border-r border-gray-200 min-w-[140px]">
              <div className="w-5 h-5 bg-gray-300 rounded mr-2"></div>
              <span className="font-medium text-gray-500">Loading...</span>
              <div className="w-4 h-4 bg-gray-300 rounded ml-2"></div>
            </div>
            <div className="flex-1 px-6 py-4">
              <div className="w-full h-5 bg-gray-200 rounded"></div>
            </div>
            <div className="px-6 py-4 bg-blue-600">
              <div className="w-5 h-5 bg-blue-400 rounded"></div>
            </div>
          </div>
          <div className="bg-white border-2 border-green-500 px-4 py-2 rounded-full">
            <div className="w-32 h-5 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return <SearchBar onSearch={onSearch} className={className} initialLocation={initialLocation} />
}

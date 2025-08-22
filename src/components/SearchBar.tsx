'use client'

import { useState } from 'react'
import { Search, MapPin, ChevronDown } from 'lucide-react'
import { mockCities } from '@/data/mockData'

interface SearchBarProps {
  onSearch: (query: string, location: string) => void
  className?: string
  initialLocation?: string
}

export function SearchBar({ onSearch, className = '', initialLocation = '' }: SearchBarProps) {
  const [selectedCity, setSelectedCity] = useState(initialLocation || 'Pune')
  const [searchQuery, setSearchQuery] = useState('')
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false)

  const handleSearch = () => {
    onSearch(searchQuery, selectedCity)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-4">
        {/* Main Search Bar */}
        <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden flex-1 max-w-2xl">
          {/* City Selection Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors border-r border-gray-200 min-w-[140px]"
            >
              <MapPin className="w-5 h-5 text-gray-600 mr-2" />
              <span className="font-medium text-gray-900">{selectedCity}</span>
              <ChevronDown className="w-4 h-4 text-gray-600 ml-2" />
            </button>
            
            {isCityDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {mockCities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => {
                      setSelectedCity(city.name)
                      setIsCityDropdownOpen(false)
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center"
                  >
                    <MapPin className="w-4 h-4 text-gray-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">{city.name}</div>
                      <div className="text-sm text-gray-500">{city.state}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="flex-1 px-6 py-4">
            <input
              type="text"
              placeholder="Search Project, locality or builder"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full outline-none text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Call to Action Button */}
        <button className="bg-white border-2 border-green-500 text-green-600 px-4 py-2 rounded-full font-semibold hover:bg-green-50 transition-colors shadow-lg whitespace-nowrap">
          Get on Housing.com!
        </button>
      </div>
    </div>
  )
}

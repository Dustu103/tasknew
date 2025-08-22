'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, ChevronDown } from 'lucide-react'
import { getCities } from '@/lib/data'
import { City } from '@/types'

interface SearchBarProps {
  onSearch: (query: string, location: string) => void
  className?: string
  initialLocation?: string
}

export function SearchBar({ onSearch, className = '', initialLocation = '' }: SearchBarProps) {
  const [selectedCity, setSelectedCity] = useState(initialLocation || 'Pune')
  const [searchQuery, setSearchQuery] = useState('')
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false)
  const [cities, setCities] = useState<City[]>([])
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()
  
  // Load cities on component mount
  useEffect(() => {
    const loadCities = async () => {
      try {
        const citiesData = await getCities()
        setCities(citiesData)
      } catch (error) {
        console.error('Error loading cities:', error)
      }
    }
    loadCities()
  }, [])
  
  // Debug dropdown state (client-side only)
  if (typeof window !== 'undefined') {
    console.log('SearchBar render - isCityDropdownOpen:', isCityDropdownOpen)
  }

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery, selectedCity)
    } else {
      // Default navigation behavior
      const searchParams = new URLSearchParams()
      if (searchQuery) searchParams.set('q', searchQuery)
      if (selectedCity) searchParams.set('location', selectedCity)
      
      const searchUrl = `/search?${searchParams.toString()}`
      router.push(searchUrl)
    }
  }

  const handleCitySelect = (city: City) => {
    console.log('City selected:', city)
    setSelectedCity(city.name)
    router.push(`/city/${city.slug}`)
    setIsCityDropdownOpen(false)    
    // Navigate directly to city page
    
  }

  const toggleDropdown = () => {
    console.log('Toggle dropdown clicked, current state:', isCityDropdownOpen)
    const newState = !isCityDropdownOpen
    
    if (newState && buttonRef.current) {
      // Calculate position for dropdown
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX
      })
    }
    
    console.log('Setting dropdown to:', newState)
    setIsCityDropdownOpen(newState)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      
      // Don't close if clicking on the dropdown container or button
      if (dropdownRef.current && dropdownRef.current.contains(target)) {
        return
      }
      
      if (buttonRef.current && buttonRef.current.contains(target)) {
        return
      }
      
      // Close dropdown if clicking outside
      setIsCityDropdownOpen(false)
    }

    // Only add event listener if document exists (client-side)
    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-4">
        {/* Main Search Bar */}
        <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden flex-1 max-w-2xl">
          {/* City Selection Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              ref={buttonRef}
              type="button"
              onClick={toggleDropdown}
              className="flex items-center px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors border-r border-gray-200 min-w-[140px]"
            >
              <MapPin className="w-5 h-5 text-gray-600 mr-2" />
              <span className="font-medium text-gray-900">{selectedCity}</span>
              <ChevronDown className="w-4 h-4 text-gray-600 ml-2" />
            </button>
            
            {/* City Dropdown */}
            {isCityDropdownOpen && (
              <div 
                className="fixed w-64 bg-white border-2 border-blue-200 rounded-lg shadow-2xl z-[9999] max-h-80 overflow-y-auto"
                style={{ 
                  top: `${dropdownPosition.top}px`,
                  left: `${dropdownPosition.left}px`,
                  zIndex: 9999,
                  backgroundColor: 'white',
                  border: '2px solid #3b82f6',
                  borderRadius: '8px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
              >
                <div className="p-3 border-b border-gray-100 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-700">Popular Cities</h3>
                </div>
                {cities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => handleCitySelect(city)}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center border-b border-gray-50 last:border-b-0 transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{city.name}</div>
                      <div className="text-sm text-gray-500">{city.state}</div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {city.propertyCount.toLocaleString()} properties
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

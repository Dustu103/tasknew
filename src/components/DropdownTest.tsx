'use client'

import { useState, useRef, useEffect } from 'react'
import { MapPin, ChevronDown } from 'lucide-react'
import { mockCities } from '@/data/mockData'

export function DropdownTest() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState('Pune')
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleDropdown = () => {
    console.log('Toggle clicked, current state:', isOpen)
    setIsOpen(!isOpen)
  }

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [])

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Dropdown Test Component</h2>
      
      <div className="relative inline-block">
        <button
          ref={buttonRef}
          onClick={toggleDropdown}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <MapPin className="w-4 h-4 mr-2" />
          {selectedCity}
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>

        {/* Test Dropdown 1: Simple absolute positioning */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
            <div className="p-3 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-700">Select City</h3>
            </div>
            {mockCities.map((city) => (
              <button
                key={city.id}
                onClick={() => {
                  setSelectedCity(city.name)
                  setIsOpen(false)
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-blue-500 mr-2" />
                  <div>
                    <div className="font-medium">{city.name}</div>
                    <div className="text-sm text-gray-500">{city.state}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Test Dropdown 2: Fixed positioning */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="absolute bg-white border border-gray-300 rounded-lg shadow-lg z-50"
            style={{
              top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom + 8 : 0,
              left: buttonRef.current ? buttonRef.current.getBoundingClientRect().left : 0,
              width: '256px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-700">Select City (Fixed)</h3>
            </div>
            {mockCities.map((city) => (
              <button
                key={city.id}
                onClick={() => {
                  setSelectedCity(city.name)
                  setIsOpen(false)
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-blue-500 mr-2" />
                  <div>
                    <div className="font-medium">{city.name}</div>
                    <div className="text-sm text-gray-500">{city.state}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <p><strong>Debug Info:</strong></p>
        <p>Dropdown Open: {isOpen ? 'Yes' : 'No'}</p>
        <p>Selected City: {selectedCity}</p>
        <p>Available Cities: {mockCities.length}</p>
      </div>
    </div>
  )
}

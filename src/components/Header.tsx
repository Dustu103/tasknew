'use client'

import { useRouter } from 'next/navigation'
import { Home, Heart, User, Menu, Search } from 'lucide-react'

export function Header() {
  const router = useRouter()

  const handleSearch = (query: string, location: string) => {
    console.log('Search:', { query, location })
    
    // Navigate to search page with query parameters
    const searchParams = new URLSearchParams()
    if (query) searchParams.set('q', query)
    if (location) searchParams.set('location', location)
    
    const searchUrl = `/search?${searchParams.toString()}`
    router.push(searchUrl)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => router.push('/')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Housing.com</span>
          </button>

                     {/* Spacer for layout balance */}
           <div className="hidden lg:flex flex-1 max-w-md mx-8" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => router.push('/search?type=buy')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Buy
            </button>
            <button 
              onClick={() => router.push('/search?type=rent')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Rent
            </button>
            <button 
              onClick={() => router.push('/sell')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Sell
            </button>
            <button 
              onClick={() => router.push('/projects')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Projects
            </button>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Saved</span>
            </button>
            
            <button className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
              <User className="w-5 h-5" />
              <span className="font-medium">Login</span>
            </button>

            <button className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

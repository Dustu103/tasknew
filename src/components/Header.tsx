import Link from 'next/link'
import { Home, Heart, User, Menu } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Housing.com</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/buy" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Buy
            </Link>
            <Link 
              href="/rent" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Rent
            </Link>
            <Link 
              href="/sell" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Sell
            </Link>
            <Link 
              href="/projects" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Projects
            </Link>
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

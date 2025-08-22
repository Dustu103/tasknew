import { Suspense } from 'react'
import { PopularCitiesSection } from '@/components/PopularCitiesSection'

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Projects page...</p>
        </div>
      </div>
    }>
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              New Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the latest residential and commercial projects from top developers. 
              Find your dream home in upcoming projects with great amenities and locations.
            </p>
          </div>

          {/* Project Categories */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <button className="p-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              All Projects
            </button>
            <button className="p-4 bg-white text-gray-700 rounded-lg border border-gray-200 font-semibold hover:bg-gray-50 transition-colors">
              Residential
            </button>
            <button className="p-4 bg-white text-gray-700 rounded-lg border border-gray-200 font-semibold hover:bg-gray-50 transition-colors">
              Commercial
            </button>
            <button className="p-4 bg-white text-gray-700 rounded-lg border border-gray-200 font-semibold hover:bg-gray-50 transition-colors">
              Ready to Move
            </button>
          </div>

          {/* Featured Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Project Card 1 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
                <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  Ready to Move
                </div>
                <div className="absolute top-4 right-4 bg-white text-gray-800 px-2 py-1 rounded text-sm font-semibold">
                  ₹1.2Cr onwards
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Luxury Heights</h3>
                <p className="text-gray-600 mb-3">Bandra West, Mumbai</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>2, 3, 4 BHK</span>
                  <span>1,200 - 2,500 sq ft</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-semibold">Possession: Dec 2024</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 relative">
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  Under Construction
                </div>
                <div className="absolute top-4 right-4 bg-white text-gray-800 px-2 py-1 rounded text-sm font-semibold">
                  ₹85L onwards
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Green Valley</h3>
                <p className="text-gray-600 mb-3">Whitefield, Bangalore</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>1, 2, 3 BHK</span>
                  <span>800 - 1,800 sq ft</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-orange-600 font-semibold">Possession: Mar 2025</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 relative">
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  Pre Launch
                </div>
                <div className="absolute top-4 right-4 bg-white text-gray-800 px-2 py-1 rounded text-sm font-semibold">
                  ₹2.1Cr onwards
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Royal Gardens</h3>
                <p className="text-gray-600 mb-3">Gurgaon, Delhi NCR</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>3, 4, 5 BHK</span>
                  <span>1,500 - 3,200 sq ft</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-semibold">Possession: Jun 2025</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Developer Section */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Top Developers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {['DLF', 'Godrej', 'Lodha', 'Prestige', 'Brigade', 'Sobha'].map((developer) => (
                <div key={developer} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-gray-700">{developer}</span>
                  </div>
                  <span className="text-sm text-gray-600">{developer}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Looking for a Specific Project?
            </h2>
            <p className="text-gray-600 mb-6">
              Get personalized recommendations based on your preferences and budget
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Get Recommendations
            </button>
          </div>
        </div>

        <PopularCitiesSection />
      </div>
    </Suspense>
  )
}

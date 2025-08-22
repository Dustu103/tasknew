import { Suspense } from 'react'
import { SearchPage } from '@/pages/SearchPage'
import { mockProperties, mockCities } from '@/data/mockData'

export default function SearchPageNext() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading search results...</p>
        </div>
      </div>
    }>
      <SearchPage properties={mockProperties} cities={mockCities} />
    </Suspense>
  )
}

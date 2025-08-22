import { Suspense } from 'react'
import { HomePage } from '@/pages/HomePage'

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Housing.com...</p>
        </div>
      </div>
    }>
      <HomePage />
    </Suspense>
  )
}

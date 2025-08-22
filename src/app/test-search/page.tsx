import { SearchBar } from '@/components/SearchBar'
import { SearchBarAlternative } from '@/components/SearchBarAlternative'

export default function TestSearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Search Bar Comparison</h1>
        
        <div className="space-y-12">
          {/* Original Search Bar */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Original Search Bar (May have dropdown issues)</h2>
            <SearchBar />
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This version uses absolute positioning and may have z-index or overflow issues.
              </p>
            </div>
          </div>

          {/* Alternative Search Bar */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Alternative Search Bar (Modal-style dropdown)</h2>
            <SearchBarAlternative />
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Note:</strong> This version uses a modal overlay that should always be visible and accessible.
              </p>
            </div>
          </div>

          {/* Debug Information */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Debug Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Common Dropdown Issues:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li>Z-index conflicts with other elements</li>
                  <li>Parent container overflow: hidden</li>
                  <li>Positioning relative to wrong parent</li>
                  <li>CSS conflicts with Tailwind classes</li>
                  <li>Event propagation issues</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Solutions Implemented:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li>Multiple z-index values (9999, 99999)</li>
                  <li>Fixed positioning as fallback</li>
                  <li>Modal overlay approach</li>
                  <li>Improved event handling</li>
                  <li>Better positioning calculations</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Testing Steps:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                  <li>Click the city selection button in both search bars</li>
                  <li>Check if dropdown appears and is visible</li>
                  <li>Try selecting different cities</li>
                  <li>Test clicking outside to close</li>
                  <li>Check console for debug messages</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

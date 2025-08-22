'use client'

interface PriceFilterProps {
  selectedPrice: string
  onPriceChange: (price: string) => void
}

const priceRanges = [
  { id: 'under-30', label: 'Under 30 Lacs', min: 0, max: 3000000 },
  { id: '30-50', label: '30 Lacs - 50 Lacs', min: 3000000, max: 5000000 },
  { id: '50-75', label: '50 Lacs - 75 Lacs', min: 5000000, max: 7500000 },
  { id: '75-100', label: '75 Lacs - 1.00 Cr', min: 7500000, max: 10000000 },
  { id: '100-150', label: '1.00 Cr - 1.50 Cr', min: 10000000, max: 15000000 },
  { id: '150-300', label: '1.50 Cr - 3.00 Cr', min: 15000000, max: 30000000 }
]

export function PriceFilter({ selectedPrice, onPriceChange }: PriceFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {priceRanges.map((range) => (
        <button
          key={range.id}
          onClick={() => onPriceChange(range.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedPrice === range.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {range.label}
        </button>
      ))}
      <button
        onClick={() => onPriceChange('all')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          selectedPrice === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        View All Projects →
      </button>
    </div>
  )
}

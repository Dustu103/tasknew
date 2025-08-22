'use client'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { HomePage } from '@/pages/HomePage'
import { CityPage } from '@/pages/CityPage'
import { SearchPage } from '@/pages/SearchPage'
import { PropertyPage } from '@/pages/PropertyPage'
import { mockProperties, mockCities } from '@/data/mockData'
import { useScrollToTop } from '@/hooks/useScrollToTop'

function AppContent() {
  const [properties] = useState(mockProperties)
  const [cities] = useState(mockCities)
  
  // Use the scroll to top hook
  useScrollToTop()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage properties={properties} cities={cities} />} />
          <Route path="/city/:id" element={<CityPage properties={properties} cities={cities} />} />
          <Route path="/search" element={<SearchPage properties={properties} cities={cities} />} />
          <Route path="/property/:id" element={<PropertyPage properties={properties} cities={cities} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

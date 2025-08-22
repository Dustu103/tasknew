'use client'

import { HeroSection } from '@/components/HeroSection'
import { PopularCitiesSection } from '@/components/PopularCitiesSection'
import { Property, City } from '@/types'

interface HomePageProps {
  properties: Property[]
  cities: City[]
}

export function HomePage({ properties, cities }: HomePageProps) {
  return (
    <>
      <HeroSection />
      <PopularCitiesSection />
    </>
  )
}

export default HomePage

'use client'

import { HeroSection } from '@/components/HeroSection'
import { PopularCitiesSection } from '@/components/PopularCitiesSection'
import { Property } from '@/types'

interface HomePageProps {
  properties: Property[]
  cities: any[]
}

export function HomePage({ properties, cities }: HomePageProps) {
  return (
    <>
      <HeroSection />
      <PopularCitiesSection />
    </>
  )
}

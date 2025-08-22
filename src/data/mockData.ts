import { Property, City, TrendingSearch } from '@/types'

// Raw property data for SSR
const rawPropertyData = [
  // Mumbai Properties (20)
  { id: 1, img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop&auto=format&q=80", location: "Bandra West", city: "Mumbai" },
  { id: 2, img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop&auto=format&q=80", location: "Andheri West", city: "Mumbai" },
  { id: 3, img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&auto=format&q=80", location: "Juhu", city: "Mumbai" },
  { id: 4, img: "https://images.unsplash.com/photo-1560448075-bb485b067938?w=400&h=300&fit=crop&auto=format&q=80", location: "Worli", city: "Mumbai" },
  { id: 5, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Powai", city: "Mumbai" },
  { id: 6, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Thane West", city: "Mumbai" },
  { id: 7, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Navi Mumbai", city: "Mumbai" },
  { id: 8, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Borivali West", city: "Mumbai" },
  { id: 9, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Malad West", city: "Mumbai" },
  { id: 10, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Goregaon West", city: "Mumbai" },
  { id: 11, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Kandivali West", city: "Mumbai" },
  { id: 12, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Dahisar West", city: "Mumbai" },
  { id: 13, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Mira Road", city: "Mumbai" },
  { id: 14, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Bhayandar West", city: "Mumbai" },
  { id: 15, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Vasai West", city: "Mumbai" },
  { id: 16, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Virar West", city: "Mumbai" },
  { id: 17, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Palghar", city: "Mumbai" },
  { id: 18, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Dombivli", city: "Mumbai" },
  { id: 19, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Kalyan", city: "Mumbai" },
  { id: 20, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Badlapur", city: "Mumbai" },

  // Delhi Properties (20)
  { id: 21, img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop&auto=format&q=80", location: "Connaught Place", city: "Delhi" },
  { id: 22, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Dwarka", city: "Delhi" },
  { id: 23, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Gurgaon", city: "Delhi" },
  { id: 24, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Noida", city: "Delhi" },
  { id: 25, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Greater Noida", city: "Delhi" },
  { id: 26, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Faridabad", city: "Delhi" },
  { id: 27, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Ghaziabad", city: "Delhi" },
  { id: 28, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Sahibabad", city: "Delhi" },
  { id: 29, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Indirapuram", city: "Delhi" },
  { id: 30, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Vaishali", city: "Delhi" },
  { id: 31, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Kaushambi", city: "Delhi" },
  { id: 32, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Crossing Republik", city: "Delhi" },
  { id: 33, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Raj Nagar Extension", city: "Delhi" },
  { id: 34, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Sector 62", city: "Delhi" },
  { id: 35, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Sector 128", city: "Delhi" },
  { id: 36, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Sector 150", city: "Delhi" },
  { id: 37, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Sector 168", city: "Delhi" },
  { id: 38, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Sector 78", city: "Delhi" },
  { id: 39, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Sector 79", city: "Delhi" },
  { id: 40, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Sector 80", city: "Delhi" },

  // Bengaluru Properties (20)
  { id: 41, img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop&auto=format&q=80", location: "Whitefield", city: "Bengaluru" },
  { id: 42, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Electronic City", city: "Bengaluru" },
  { id: 43, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Sarjapur Road", city: "Bengaluru" },
  { id: 44, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Marathahalli", city: "Bengaluru" },
  { id: 45, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Bellandur", city: "Bengaluru" },
  { id: 46, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "HSR Layout", city: "Bengaluru" },
  { id: 47, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Koramangala", city: "Bengaluru" },
  { id: 48, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Indiranagar", city: "Bengaluru" },
  { id: 49, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "JP Nagar", city: "Bengaluru" },
  { id: 50, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Bannerghatta Road", city: "Bengaluru" },
  { id: 51, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Kanakapura Road", city: "Bengaluru" },
  { id: 52, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Hosur Road", city: "Bengaluru" },
  { id: 53, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Outer Ring Road", city: "Bengaluru" },
  { id: 54, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Hebbal", city: "Bengaluru" },
  { id: 55, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Yelahanka", city: "Bengaluru" },
  { id: 56, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Devanahalli", city: "Bengaluru" },
  { id: 57, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Nelamangala", city: "Bengaluru" },
  { id: 58, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Tumkur Road", city: "Bengaluru" },
  { id: 59, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Mysore Road", city: "Bengaluru" },
  { id: 60, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Magadi Road", city: "Bengaluru" },

  // Pune Properties (20)
  { id: 61, img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop&auto=format&q=80", location: "Hinjewadi", city: "Pune" },
  { id: 62, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Kharadi", city: "Pune" },
  { id: 63, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Wakad", city: "Pune" },
  { id: 64, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Baner", city: "Pune" },
  { id: 65, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Aundh", city: "Pune" },
  { id: 66, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Pimple Saudagar", city: "Pune" },
  { id: 67, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Pimple Nilakh", city: "Pune" },
  { id: 68, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Rahatani", city: "Pune" },
  { id: 69, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Pimpri", city: "Pune" },
  { id: 70, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Chinchwad", city: "Pune" },
  { id: 71, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Talegaon", city: "Pune" },
  { id: 72, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Chakan", city: "Pune" },
  { id: 73, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Khed", city: "Pune" },
  { id: 74, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Mulshi", city: "Pune" },
  { id: 75, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Lonavala", city: "Pune" },
  { id: 76, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Khandala", city: "Pune" },
  { id: 77, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Karjat", city: "Pune" },
  { id: 78, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Alibaug", city: "Pune" },
  { id: 79, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Panvel", city: "Pune" },
  { id: 80, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Navi Mumbai", city: "Pune" },

  // Kolkata Properties (20)
  { id: 81, img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop&auto=format&q=80", location: "Salt Lake", city: "Kolkata" },
  { id: 82, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "New Town", city: "Kolkata" },
  { id: 83, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Rajarhat", city: "Kolkata" },
  { id: 84, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Howrah", city: "Kolkata" },
  { id: 85, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Dum Dum", city: "Kolkata" },
  { id: 86, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Barrackpore", city: "Kolkata" },
  { id: 87, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Kalyani", city: "Kolkata" },
  { id: 88, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Krishnanagar", city: "Kolkata" },
  { id: 89, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Ranaghat", city: "Kolkata" },
  { id: 90, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Bardhaman", city: "Kolkata" },
  { id: 91, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Asansol", city: "Kolkata" },
  { id: 92, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Durgapur", city: "Kolkata" },
  { id: 93, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Siliguri", city: "Kolkata" },
  { id: 94, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Darjeeling", city: "Kolkata" },
  { id: 95, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Kurseong", city: "Kolkata" },
  { id: 96, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Kalimpong", city: "Kolkata" },
  { id: 97, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Gangtok", city: "Kolkata" },
  { id: 98, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Jalpaiguri", city: "Kolkata" },
  { id: 99, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Cooch Behar", city: "Kolkata" },
  { id: 100, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format&q=80", location: "Malda", city: "Kolkata" },
]

// Developer names for realistic data
const developers = [
  'Lodha Group', 'Godrej Properties', 'DLF Limited', 'Prestige Group', 'Brigade Group',
  'Sobha Limited', 'Puravankara', 'Oberoi Realty', 'Mahindra Lifespaces', 'Tata Housing',
  'Hiranandani Group', 'Raheja Group', 'K Raheja Corp', 'Shapoorji Pallonji', 'L&T Realty',
  'Prestige Estates', 'Brigade Enterprises', 'Sobha Developers', 'Puravankara Projects', 'Oberoi Constructions'
]

// Convert raw data to Property interface
function convertToProperty(raw: { id: number; location: string; city: string; img: string }): Property {
  const developer = developers[Math.floor(Math.random() * developers.length)]
  const isReadyToMove = Math.random() > 0.7
  const possessionDate = isReadyToMove ? undefined : `December ${2025 + Math.floor(Math.random() * 5)}`
  
  return {
    id: raw.id,
    title: `${developer} ${raw.location}`,
    description: `Beautiful ${raw.location} property with modern amenities and great connectivity. Perfect for families looking for a comfortable living space.`,
    price: 2500000 + Math.floor(Math.random() * 15000000), // 25L to 1.75Cr
    area: 800 + Math.floor(Math.random() * 1200), // 800-2000 sqft
    bedrooms: 1 + Math.floor(Math.random() * 3), // 1-3 BHK
    bathrooms: 1 + Math.floor(Math.random() * 2), // 1-2 bathrooms
    parking: Math.floor(Math.random() * 2), // 0-1 parking
    propertyType: ['apartment', 'house', 'villa'][Math.floor(Math.random() * 3)] as 'apartment' | 'house' | 'villa',
    furnishing: ['furnished', 'semi-furnished', 'unfurnished'][Math.floor(Math.random() * 3)] as 'furnished' | 'semi-furnished' | 'unfurnished',
    floor: `${Math.floor(Math.random() * 20) + 1}${['st', 'nd', 'rd', 'th'][Math.floor(Math.random() * 4)]} Floor`,
    amenities: ['Gym', 'Swimming Pool', 'Garden', 'Security', 'Parking', 'Lift', 'Power Backup', 'Water Supply'].slice(0, 4 + Math.floor(Math.random() * 4)),
    images: [raw.img, raw.img, raw.img, raw.img, raw.img], // Same image for all 5 slots
    location: {
      area: raw.location,
      city: raw.city,
      state: raw.city === 'Mumbai' ? 'Maharashtra' : raw.city === 'Delhi' ? 'Delhi' : raw.city === 'Bengaluru' ? 'Karnataka' : raw.city === 'Pune' ? 'Maharashtra' : 'West Bengal',
      pincode: '400000'
    },
    featured: Math.random() > 0.8, // 20% featured
    verified: Math.random() > 0.3, // 70% verified
    postedDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    developer,
    readyToMove: isReadyToMove,
    possessionDate
  }
}

export const mockProperties: Property[] = rawPropertyData.map(convertToProperty)

export const mockCities: City[] = [
  {
    id: 1,
    name: 'Mumbai',
    state: 'Maharashtra',
    slug: 'mumbai',
    image: '1570129477492-45c003edd2be',
    propertyCount: 25000,
    avgPrice: 8500000
  },
  {
    id: 2,
    name: 'Delhi',
    state: 'Delhi',
    slug: 'delhi',
    image: '1560448204-e02f11c3d0e2',
    propertyCount: 22000,
    avgPrice: 7500000
  },
  {
    id: 3,
    name: 'Bengaluru',
    state: 'Karnataka',
    slug: 'bengaluru',
    image: '1560448204-603b3fc33ddc',
    propertyCount: 18000,
    avgPrice: 6500000
  },
  {
    id: 4,
    name: 'Pune',
    state: 'Maharashtra',
    slug: 'pune',
    image: '1560448204-603b3fc33ddc',
    propertyCount: 15000,
    avgPrice: 5500000
  },
  {
    id: 5,
    name: 'Kolkata',
    state: 'West Bengal',
    slug: 'kolkata',
    image: '1560448204-603b3fc33ddc',
    propertyCount: 12000,
    avgPrice: 4500000
  }
]

export const mockTrendingSearches: TrendingSearch[] = [
  { id: 1, query: '2 BHK Flats', count: 1250, city: 'Mumbai' },
  { id: 2, query: 'Ready to Move', count: 890, city: 'Delhi' },
  { id: 3, query: 'Under 50 Lakhs', count: 2100, city: 'Bengaluru' },
  { id: 4, query: 'Premium Villas', count: 450, city: 'Pune' },
  { id: 5, query: 'New Launch', count: 780, city: 'Kolkata' },
  { id: 6, query: 'Gated Community', count: 920, city: 'Mumbai' },
  { id: 7, query: 'Near Metro', count: 1100, city: 'Delhi' },
  { id: 8, query: 'IT Park Nearby', count: 650, city: 'Bengaluru' }
]

export const rawPropertyDataForSSR = rawPropertyData

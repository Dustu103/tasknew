import { Property } from '@/types'

export function generatePropertyStructuredData(property: Property) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": property.description,
    "image": property.images.map(img => `https://images.unsplash.com/photo-${img}?w=800&h=600&fit=crop`),
    "url": `https://housing.com/property/${property.id}`,
    "price": property.price,
    "priceCurrency": "INR",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.location.area,
      "addressLocality": property.location.city,
      "addressRegion": property.location.state,
      "postalCode": property.location.pincode,
      "addressCountry": "IN"
    },
    "numberOfBedrooms": property.bedrooms,
    "numberOfBathroomsTotal": property.bathrooms,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.area,
      "unitCode": "SQFT"
    },
    "amenityFeature": property.amenities.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity
    })),
    "datePosted": property.postedDate,
    "dateModified": property.postedDate,
    "publisher": {
      "@type": "Organization",
      "name": "Housing.com",
      "url": "https://housing.com"
    }
  }
}

export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Housing.com",
    "url": "https://housing.com",
    "description": "Find your dream home with Housing.com - India's leading real estate platform",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://housing.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Housing.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://housing.com/logo.png"
      }
    }
  }
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Housing.com",
    "url": "https://housing.com",
    "logo": "https://housing.com/logo.png",
    "description": "India's leading real estate platform helping millions find their dream homes",
    "sameAs": [
      "https://www.facebook.com/housing.com",
      "https://twitter.com/housing",
      "https://www.linkedin.com/company/housing-com"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-1800-419-1919",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"]
    }
  }
}

export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  }
}

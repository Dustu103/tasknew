import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatArea(area: number): string {
  return `${area} sq.ft.`
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function generatePropertySlug(title: string, id: string): string {
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${id}`
}

export function getImageUrl(path: string, width: number = 400): string {
  // If it's already a full Unsplash URL, just add width parameters
  if (path.startsWith('https://images.unsplash.com/')) {
    const url = new URL(path)
    url.searchParams.set('w', width.toString())
    url.searchParams.set('h', Math.round(width * 0.75).toString())
    url.searchParams.set('fit', 'crop')
    url.searchParams.set('auto', 'format')
    url.searchParams.set('q', '80')
    return url.toString()
  }
  
  // If it's just an image ID, construct the full URL
  const imageId = path.startsWith('photo-') ? path : `photo-${path}`
  return `https://images.unsplash.com/${imageId}?w=${width}&h=${Math.round(width * 0.75)}&fit=crop&auto=format&q=80`
}

# Housing.com - SSR Optimized Real Estate Platform

A fully Server-Side Rendered (SSR) version of Housing.com's homepage optimized for SEO, performance, and user experience. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

### SSR & SEO Optimization
- **Pre-rendered Content**: Property listings, city banners, and trending searches are pre-rendered for better crawlability
- **Dynamic Meta Tags**: Location-based meta tags and Open Graph data
- **Structured Data**: JSON-LD schema markup for real estate listings
- **Breadcrumb Navigation**: SEO-friendly breadcrumb structured data

### Performance Optimizations
- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **Lazy Loading**: Skeleton components and progressive loading
- **Data Caching**: In-memory caching for static and semi-static data
- **Code Splitting**: Automatic code splitting with React Suspense
- **Font Optimization**: Preloaded Google Fonts with display swap

### User Experience
- **Instant Search**: Debounced search with server-side hydration
- **Responsive Design**: Mobile-first responsive layout
- **Smooth Animations**: CSS transitions and hover effects
- **Accessibility**: ARIA labels and keyboard navigation support

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Component Architecture**: Reusable UI components with proper separation
- **Error Handling**: Graceful error boundaries and 404 pages
- **Security Headers**: XSS protection and content security policies

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **UI Components**: Custom components with Radix UI primitives
- **Fonts**: Google Fonts (Geist Sans, Geist Mono)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   ├── search/            # Search functionality
│   └── property/[slug]/   # Property detail pages
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── Header.tsx        # Navigation header
│   ├── SearchBar.tsx     # Search functionality
│   ├── PropertyCard.tsx  # Property listing cards
│   ├── CityBanner.tsx    # City showcase banners
│   └── TrendingSearches.tsx # Popular searches
├── lib/                  # Utility functions and data
│   ├── utils.ts          # Common utilities
│   ├── data.ts           # Data fetching with caching
│   └── structuredData.ts # SEO structured data
├── types/                # TypeScript type definitions
└── data/                 # Mock data for development
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📊 Performance Features

### Core Web Vitals Optimization
- **LCP (Largest Contentful Paint)**: Optimized with priority images and preloading
- **FID (First Input Delay)**: Minimal JavaScript with code splitting
- **CLS (Cumulative Layout Shift)**: Stable layouts with proper image dimensions

### Caching Strategy
- **Static Assets**: 1-year cache for images, CSS, JS
- **API Responses**: 1-hour cache for dynamic data
- **Build-time**: Static generation for popular pages

### Image Optimization
- **Formats**: WebP and AVIF with fallbacks
- **Responsive**: Multiple sizes for different screen sizes
- **Lazy Loading**: Below-the-fold images loaded on demand
- **CDN Ready**: Optimized for CDN delivery

## 🔍 SEO Features

### Meta Tags
- Dynamic title and description based on content
- Open Graph tags for social media sharing
- Twitter Card support
- Canonical URLs

### Structured Data
- RealEstateListing schema for properties
- WebSite schema for the platform
- Organization schema for company info
- BreadcrumbList for navigation

### Technical SEO
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for all images
- Internal linking strategy

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb)
- **Secondary**: Gray (#f8fafc)
- **Accent**: Orange (#f97316)
- **Success**: Green (#22c55e)
- **Error**: Red (#ef4444)

### Typography
- **Primary Font**: Geist Sans
- **Monospace**: Geist Mono
- **Responsive**: Fluid typography scaling

### Components
- **Cards**: Property listings with hover effects
- **Buttons**: Primary, secondary, and ghost variants
- **Forms**: Search inputs with validation
- **Navigation**: Sticky header with mobile menu

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables if needed
3. Deploy automatically on push to main branch

### Other Platforms
The app is configured for standalone output and can be deployed to:
- Netlify
- AWS Amplify
- Google Cloud Run
- Docker containers

## 📈 Monitoring & Analytics

### Web Vitals Tracking
- LCP, FID, CLS monitoring
- Performance budgets
- Real User Monitoring (RUM)

### SEO Monitoring
- Search console integration
- Structured data validation
- Core Web Vitals reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Tailwind CSS for the utility-first styling
- Unsplash for placeholder images
- Lucide for beautiful icons

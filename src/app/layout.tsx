import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { generateWebsiteStructuredData, generateOrganizationStructuredData } from "@/lib/structuredData";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { ResourcePreloader } from "@/components/LoadingOptimizer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Housing.com - Find Your Dream Home | Buy, Rent, Sell Properties",
    template: "%s | Housing.com"
  },
  description: "Find your dream home with Housing.com - India's leading real estate platform. Buy, rent, or sell properties across India. Get verified listings, expert guidance, and the best deals.",
  keywords: ["real estate", "property", "buy property", "rent property", "sell property", "housing", "apartments", "houses", "villas", "India"],
  authors: [{ name: "Housing.com" }],
  creator: "Housing.com",
  publisher: "Housing.com",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://housing.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://housing.com',
    title: 'Housing.com - Find Your Dream Home',
    description: 'Find your dream home with Housing.com - India\'s leading real estate platform',
    siteName: 'Housing.com',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Housing.com - Find Your Dream Home',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Housing.com - Find Your Dream Home',
    description: 'Find your dream home with Housing.com - India\'s leading real estate platform',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteStructuredData = generateWebsiteStructuredData();
  const organizationStructuredData = generateOrganizationStructuredData();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <meta name="theme-color" content="#2563eb" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {children}
        <PerformanceMonitor />
        <ResourcePreloader />
      </body>
    </html>
  );
}

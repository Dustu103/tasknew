import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Housing.com - Find Your Dream Home',
  description: 'Discover millions of verified properties across India. Buy, rent, or sell your property with Housing.com',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

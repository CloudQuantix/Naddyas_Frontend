import type { Metadata } from 'next'
import './globals.css'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToTop from './components/ScrollToTop'
import DonateNowBookmark from './components/DonateNowBookmark'

export const metadata: Metadata = {
  title: 'Best Music Class in Satara | Swargumphan Music Institute | Classical Music',
  description: 'Join Swargumphan Music Institute, the best music class in Satara. Learn Indian classical music, playback singing, and various instruments from expert faculty through our online and offline courses.',
  keywords: 'Best Music Class Satara, Classical Music Class Satara, Swargumphan Music Institute, Singing classes in Satara, Learn Classical Music, Online music classes, Playback singing',
  openGraph: {
    title: 'Best Music Class in Satara | Swargumphan Music Institute',
    description: 'Learn Indian classical music, playback singing, and instruments with the best music class in Satara.',
    url: 'https://swargumphan.com',
    siteName: 'Swargumphan Music Institute',
    images: [
      {
        url: '/Logo2.png',
        width: 800,
        height: 600,
        alt: 'Swargumphan Music Institute Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/fevicon.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Music Class in Satara | Swargumphan Music Institute',
    description: 'Learn Indian classical music, playback singing, and instruments with the best music class in Satara.',
    images: ['/Logo2.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Swargumphan Music Institute',
  image: 'https://swargumphan.com/Logo2.png',
  description: 'Best music class in Satara. Learn Indian classical music, playback singing, and various instruments from expert faculty.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Satara',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN'
  },
  priceRange: '₹₹',
  telephone: '+917721833346',
  url: 'https://swargumphan.com'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <WhatsAppButton />
        <ScrollToTop />
        <DonateNowBookmark />
      </body>
    </html>
  )
}


import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GDP Timeline Visualization',
  description: 'Interactive visualization of global GDP growth from 1700 to 2050',
  keywords: ['GDP', 'economic history', 'data visualization', 'interactive timeline', 'global economy'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'GDP Timeline Visualization',
    description: 'Interactive visualization of global GDP growth from 1700 to 2050',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GDP Timeline Visualization Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GDP Timeline Visualization',
    description: 'Interactive visualization of global GDP growth from 1700 to 2050',
    images: ['/og-image.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link 
          rel="preload" 
          href="/fonts/inter-var.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preconnect" 
          href="https://rsms.me/"
        />
        <link 
          rel="stylesheet" 
          href="https://rsms.me/inter/inter.css"
        />
      </head>
      <body className="min-h-screen bg-neutral-50 antialiased">
        <div className="relative flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}

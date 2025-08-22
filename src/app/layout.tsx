import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'XR & Computer Graphics Portfolio',
  description: 'Interactive desktop portfolio showcasing XR development and computer graphics projects',
  keywords: ['XR', 'VR', 'AR', 'Computer Graphics', 'WebGL', 'Three.js', 'Unity'],
  authors: [{ name: 'Your Name' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased overflow-hidden`}>
        {children}
      </body>
    </html>
  )
}
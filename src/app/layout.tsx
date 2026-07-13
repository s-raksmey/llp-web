import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { Navbar } from '@/components/layout/navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'LLP Web | Course Library',
  description: 'Browse practical courses for modern web development.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

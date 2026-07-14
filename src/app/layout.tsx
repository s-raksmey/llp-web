import Script from 'next/script'
import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { Navbar } from '@/components/layout/navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'LLP Web | Course Library',
  description: 'Browse practical courses for modern web development.',
}

const themeScript = `
(function () {
  try {
    var savedTheme = localStorage.getItem('theme');
    var preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    var theme = savedTheme || preferredTheme;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.cookie = 'theme=' + theme + '; path=/; max-age=31536000; SameSite=Lax';
  } catch (_) {}
})();
`

function normalizeTheme(value: string | undefined) {
  return value === 'dark' || value === 'light' ? value : undefined
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const initialTheme = normalizeTheme(cookieStore.get('theme')?.value)

  return (
    <html
      lang="en"
      data-theme={initialTheme}
      style={initialTheme ? { colorScheme: initialTheme } : undefined}
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-before-paint" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

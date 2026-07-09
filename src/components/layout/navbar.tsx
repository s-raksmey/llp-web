import Link from 'next/link'
import { ThemeToggle } from '@/components/layout/theme-toggle'

export function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link className="brand" href="/">
          <span className="brand-mark" />
          <span>Core.Edu</span>
        </Link>

        <div className="nav-links">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

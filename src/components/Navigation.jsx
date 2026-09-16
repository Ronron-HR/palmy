import { useEffect, useRef, useState } from 'react'
import { business, nav } from '../content'
import { usePathname } from '../hooks/usePathname'
import { trackCall } from '../lib/track'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const pathname = usePathname()
  const onHome = pathname === '/'
  // Fra en underside skal ankre pege på forsiden først (/#…), så browseren
  // navigerer hjem og scroller til sektionen.
  const hrefFor = (hash) => (onHome ? hash : `/${hash}`)

  // Escape lukker mobilmenuen og sender fokus tilbage til knappen.
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  return (
    <header className="sticky top-0 z-50 bg-cream border-b border-green-deep/10">
      {/* Spring-til-indhold: kun synlig ved tastaturfokus. */}
      <a
        href="#indhold"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-green-deep focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream"
      >
        Spring til indhold
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href={onHome ? '#forside' : '/'}
          className="font-display text-xl font-semibold text-green-deep sm:text-2xl"
        >
          {business.name}
        </a>

        <nav aria-label="Hovedmenu" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={hrefFor(item.href)}
              className="text-sm font-medium text-green-deep transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={`tel:${business.phoneHref}`}
            onClick={() => trackCall('header')}
            className="text-sm font-normal text-green-deep/70 transition-colors hover:text-green-deep"
          >
            {business.phoneDisplay}
          </a>
          <a
            href={`tel:${business.phoneHref}`}
            onClick={() => trackCall('header')}
            className="rounded-full bg-green-deep px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-green-deep-light"
          >
            Ring nu
          </a>
        </div>

        {/* Mobil: kun hamburger. Opkalds-CTA'en dækkes af den faste bund-bar,
            så header-CTA'en er bevidst desktop-only (se md:flex-klyngen ovenfor). */}
        <div className="flex items-center md:hidden">
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isOpen ? 'Luk menu' : 'Åbn menu'}
            aria-expanded={isOpen}
            aria-controls="mobil-menu"
            onClick={() => setIsOpen((open) => !open)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-green-deep focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            <span className="block h-0.5 w-6 bg-green-deep" />
            <span className="block h-0.5 w-6 bg-green-deep" />
            <span className="block h-0.5 w-6 bg-green-deep" />
          </button>
        </div>
      </div>

      {isOpen && (
        <nav
          id="mobil-menu"
          aria-label="Hovedmenu"
          className="flex flex-col gap-1 border-t border-green-deep/10 px-4 pb-4 md:hidden"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={hrefFor(item.href)}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-2 py-3 text-base font-medium text-green-deep hover:bg-green-deep/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-deep"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Navigation

import { useEffect, useRef, useState } from 'react'
import { business, nav } from '../content'
import { usePathname } from '../hooks/usePathname'

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
      {/* Fast højde (56/64px + 1px kant) — menuens kategorilinje sticker lige under. */}
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:h-16 sm:px-6">
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
              className="rounded-sm text-sm font-medium text-green-deep/80 underline-offset-[6px] transition-colors hover:text-green-deep hover:underline hover:decoration-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center md:flex">
          <a
            href={`tel:${business.phoneHref}`}
            className="press rounded-full bg-green-deep px-5 py-2.5 text-sm font-semibold tabular-nums text-cream hover:bg-green-deep-light"
          >
            Ring {business.phoneDisplay}
          </a>
        </div>

        {/* Mobil: "Menu" er altid ét tryk væk; opkald dækkes af bund-baren
            (forsiden) og af knapperne på undersiderne. */}
        <div className="flex items-center gap-1 md:hidden">
          <a
            href={hrefFor('#menu')}
            className="press inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold text-green-deep active:bg-green-deep/10"
          >
            Menu
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isOpen ? 'Luk menu' : 'Åbn menu'}
            aria-expanded={isOpen}
            aria-controls="mobil-menu"
            onClick={() => setIsOpen((open) => !open)}
            className="relative flex h-11 w-11 items-center justify-center rounded-md active:bg-green-deep/10"
          >
            {/* Tre streger → X, så tilstanden kan ses. */}
            <span
              aria-hidden="true"
              className={`absolute block h-0.5 w-6 bg-green-deep transition-transform duration-200 ${isOpen ? 'rotate-45' : '-translate-y-2'}`}
            />
            <span
              aria-hidden="true"
              className={`absolute block h-0.5 w-6 bg-green-deep transition-opacity duration-150 ${isOpen ? 'opacity-0' : ''}`}
            />
            <span
              aria-hidden="true"
              className={`absolute block h-0.5 w-6 bg-green-deep transition-transform duration-200 ${isOpen ? '-rotate-45' : 'translate-y-2'}`}
            />
          </button>
        </div>
      </div>

      {/* Altid i DOM'en (så aria-controls peger på noget), skjult når lukket. */}
      {(
        <nav
          id="mobil-menu"
          aria-label="Hovedmenu (mobil)"
          hidden={!isOpen}
          className="flex flex-col gap-1 border-t border-green-deep/10 px-4 pb-4 md:hidden"
        >
          {/* "Menu" står allerede i headeren — her kun de øvrige punkter + opkald. */}
          {nav
            .filter((item) => item.href !== '#menu')
            .map((item) => (
              <a
                key={item.href}
                href={hrefFor(item.href)}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-green-deep hover:bg-green-deep/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-deep"
              >
                {item.label}
              </a>
            ))}
          <a
            href={`tel:${business.phoneHref}`}
            onClick={() => setIsOpen(false)}
            className="press mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-green-deep px-6 font-semibold tabular-nums text-cream hover:bg-green-deep-light"
          >
            Ring {business.phoneDisplay}
          </a>
        </nav>
      )}
    </header>
  )
}

export default Navigation

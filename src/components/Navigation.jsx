import { useEffect, useRef, useState } from 'react'
import { business, hours, nav } from '../content'
import { usePathname } from '../hooks/usePathname'
import Link from './Link'
import SocialLinks, { SocialIconLinks } from './SocialLinks'

// Header: ordmærke til venstre, Ring-handlingen altid ved hånden til højre.
// Mobil: "Ring" + en knap, der åbner et fuldskærms-overlay med de fire sider.
// Desktop: siderne som tekstlinks + Ring-pille.
function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleRef = useRef(null)
  const firstLinkRef = useRef(null)
  const pathname = usePathname()
  const onHome = pathname === '/'

  const isActive = (href) => !href.includes('#') && pathname.replace(/\/+$/, '') === href
  // Anker på forsiden: fra en underside peger det på forsiden først.
  const anchorHref = (href) => (onHome ? href.slice(1) : href)

  const close = () => setIsOpen(false)

  // Overlayet: Escape lukker (fokus tilbage til knappen), siden under må ikke
  // scrolle, og fokus flyttes ind i overlayet.
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const linkClass = (active) =>
    `rounded-sm text-sm font-medium underline-offset-[6px] transition-colors hover:text-fg hover:underline hover:decoration-brass ${
      active ? 'text-fg underline decoration-brass' : 'text-muted'
    }`

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur-sm">
      {/* Spring-til-indhold: kun synlig ved tastaturfokus. */}
      <a
        href="#indhold"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
      >
        Spring til indhold
      </a>

      {/* Fast højde (56/64px + 1px kant) — menuens kategorilinje sticker lige under. */}
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <Link to="/" className="whitespace-nowrap font-display text-2xl leading-none text-fg sm:text-3xl">
          {business.name}
        </Link>

        <nav aria-label="Hovedmenu" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) =>
            item.href.includes('#') ? (
              <a key={item.href} href={anchorHref(item.href)} className={linkClass(false)}>
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                to={item.href}
                className={linkClass(isActive(item.href))}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <SocialIconLinks className="mr-2 hidden text-fg lg:flex" />
          <a
            href={`tel:${business.phoneHref}`}
            className="press inline-flex min-h-11 items-center rounded-full bg-cta px-4 text-sm font-semibold tabular-nums text-cta-fg hover:brightness-110"
          >
            <span className="md:hidden">Ring</span>
            <span className="hidden md:inline">Ring {business.phoneDisplay}</span>
          </a>

          <button
            ref={toggleRef}
            type="button"
            aria-label={isOpen ? 'Luk navigation' : 'Åbn navigation'}
            aria-expanded={isOpen}
            aria-controls="mobil-menu"
            onClick={() => setIsOpen((open) => !open)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full active:bg-fg/10 lg:hidden"
          >
            {/* To streger → X, så tilstanden kan ses. */}
            <span
              aria-hidden="true"
              className={`absolute block h-0.5 w-6 bg-fg transition-transform duration-200 ${isOpen ? 'rotate-45' : '-translate-y-1'}`}
            />
            <span
              aria-hidden="true"
              className={`absolute block h-0.5 w-6 bg-fg transition-transform duration-200 ${isOpen ? '-rotate-45' : 'translate-y-1'}`}
            />
          </button>
        </div>
      </div>

    </header>

      {/* Altid i DOM'en (så aria-controls peger på noget og hydrering passer),
          skjult når lukket. Ligger under headeren, så knappen stadig kan lukke. */}
      <nav
        id="mobil-menu"
        aria-label="Hovedmenu (mobil)"
        hidden={!isOpen}
        className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-bg px-4 pb-8 pt-[7rem] lg:hidden"
      >
        <ul className="divide-y divide-line border-y border-line">
          {nav.map((item, index) => {
            const content = (
              <>
                <span className="font-display text-4xl leading-none text-fg">{item.label}</span>
              </>
            )
            const className = 'flex items-baseline py-5'
            return (
              <li key={item.href}>
                {item.href.includes('#') ? (
                  <a
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={anchorHref(item.href)}
                    onClick={close}
                    className={className}
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    onClick={close}
                    className={className}
                  >
                    {content}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>

        <div className="mt-10">
          <SocialLinks className="mb-6 text-fg" />
          <p className="text-sm text-muted">
            Åbent {hours.daysLong} kl.&nbsp;{hours.time}
          </p>
          <a
            href={`tel:${business.phoneHref}`}
            onClick={close}
            className="press mt-3 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-cta px-6 text-lg font-semibold tabular-nums text-cta-fg hover:brightness-110"
          >
            Ring {business.phoneDisplay}
          </a>
        </div>
      </nav>
    </>
  )
}

export default Navigation

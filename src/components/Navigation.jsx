import { useCallback, useEffect, useRef, useState } from 'react'
import { business, hours, nav, ui } from '../content'
import { usePathname } from '../hooks/usePathname'
import Link from './Link'
import { Wordmark } from './Skilt'

const isCurrent = (pathname, href) => pathname === href

// Desktop (≥ 768 px): sidelinks centreret over skiltet, 17/600, gap 32
// (KOMPONENTER.md §1). Aktuel side står understreget; de andre får en
// understregning, der vokser fra venstre ved hover (MOTION.md).
export function DesktopNav() {
  const pathname = usePathname()
  return (
    <nav aria-label={ui.navLabel} className="hidden justify-center gap-8 pt-5 font-semibold md:flex">
      {nav
        .filter((item) => item.desktop !== false)
        .map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="link-nav"
            aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
          >
            {item.label}
          </Link>
        ))}
    </nav>
  )
}

// Mobil (< 768 px): knappen "Menu" øverst til højre åbner et overlay i fuld
// skærm (KOMPONENTER.md §6). role="dialog" + aria-modal, fokus fanges, Esc
// lukker, og fokus går tilbage til "Menu".
export function MobileMenu({ placement = 'compact' }) {
  const pathname = usePathname()
  // Menuen er åben på den side, den blev åbnet på, så et sideskift (også via
  // browserens tilbage-knap) lukker den uden ekstra effekt.
  const [openOn, setOpenOn] = useState(null)
  const open = openOn === pathname
  const buttonRef = useRef(null)
  const dialogRef = useRef(null)
  const closeRef = useRef(null)

  const close = useCallback((returnFocus = true) => {
    setOpenOn(null)
    // Næste frame: først når dialogen er lukket (og fokus-vagten fjernet).
    if (returnFocus) requestAnimationFrame(() => buttonRef.current?.focus())
  }, [])

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }
      if (event.key !== 'Tab') return
      const focusables = dialogRef.current.querySelectorAll('a[href], button')
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    // Safari springer links over med Tab (kun ⌥Tab når dem), så den simple
    // først/sidst-fælde ovenfor er ikke nok: lander fokus uden for dialogen,
    // mens den er åben, sendes det tilbage til "Luk".
    const onFocusIn = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) closeRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('focusin', onFocusIn)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('focusin', onFocusIn)
    }
  }, [open, close])

  const top = {
    full: 'top-(--menu-btn-top-full)',
    compact: 'top-(--menu-btn-top-compact)',
    menu: 'top-(--menu-btn-top-menu)',
  }[placement]

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpenOn(pathname)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobilmenu"
        className={`absolute right-2 ${top} flex min-h-(--tap-min) min-w-(--tap-min) items-center justify-center px-3 font-semibold underline underline-offset-(--underline-offset-btn) md:hidden`}
      >
        {ui.menuOpen}
      </button>

      <div
        ref={dialogRef}
        id="mobilmenu"
        role="dialog"
        aria-modal="true"
        aria-label={ui.menuDialogLabel}
        data-open={open}
        inert={!open}
        className="overlay fixed inset-0 z-50 flex flex-col bg-cream p-5 md:hidden"
      >
        <div className="flex items-center justify-between">
          {/* lazy: overlayet er skjult ved load, så ordmærket hentes først, når det åbnes */}
          <Wordmark className="w-(--wordmark)" loading="lazy" />
          <button
            ref={closeRef}
            type="button"
            onClick={() => close()}
            className="flex min-h-(--tap-min) min-w-(--tap-min) items-center justify-end font-semibold underline underline-offset-(--underline-offset-btn)"
          >
            {ui.menuClose}
          </button>
        </div>

        <nav aria-label={ui.navLabel} className="mt-8 flex flex-col text-lg leading-none font-semibold">
          {nav.map((item) => {
            const current = isCurrent(pathname, item.href)
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => close(false)}
                aria-current={current ? 'page' : undefined}
                className={`border-b border-line py-3 ${current ? '' : 'no-underline'}`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <a
          href={`tel:${business.phoneHref}`}
          className="bar press mt-auto block bg-black px-4 py-(--overlay-bar-pad) text-center text-cream no-underline"
        >
          <span className="block text-lg font-bold tabular-nums">{business.phoneDisplay}</span>
          <span className="mt-1 block text-xs">{hours.line}</span>
        </a>
      </div>
    </>
  )
}

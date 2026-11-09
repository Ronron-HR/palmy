import { useEffect, useState } from 'react'
import { business } from '../content'
import { usePathname } from '../hooks/usePathname'
import { useOpenStatus } from '../hooks/useOpenStatus'
import RingKnap from './RingKnap'
import Link from './Link'

// Kun mobil: fast bar i bunden med de to ting en sulten gæst skal bruge —
// menukortet og et opkald. Synlig når hero er scrollet forbi, og skjult igen
// fra kontakt-sektionen og ned (så baren aldrig dækker kontaktknappen/footeren).
// Ren scroll-baseret beregning — ingen IntersectionObserver-flimmer nær bunden.
// På /menu er man allerede på menukortet, så der står kun Ring.
function RingNuBar() {
  const [visible, setVisible] = useState(false)
  const status = useOpenStatus()
  const pathname = usePathname()
  const onMenu = pathname.replace(/\/+$/, '') === '/menu'

  useEffect(() => {
    let frame = 0

    const compute = () => {
      frame = 0
      const vh = window.innerHeight
      const scrollY = window.scrollY
      const viewportBottom = scrollY + vh

      // Forsiden har en fuldskærms-hero: vis først når man er scrollet forbi.
      // Undersider har ingen hero og viser baren med det samme.
      const hasHero = Boolean(document.getElementById('forside'))
      const pastHero = hasHero ? scrollY > vh * 0.6 : scrollY > 80

      // Skjul fra kontakt-sektionen og ned (footeren ligger under den).
      // På sider uden kontakt-sektion skjules baren ved sidens egen ring-knap.
      const kontakt = document.getElementById('kontakt') ?? document.getElementById('bestil')
      const hideFrom = kontakt
        ? kontakt.getBoundingClientRect().top + scrollY
        : document.documentElement.scrollHeight
      const reachedBottomZone = viewportBottom >= hideFrom + 80

      setVisible(pastHero && !reachedBottomZone)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`theme-ink fixed inset-x-0 bottom-0 z-50 flex items-center gap-2 border-t border-line bg-bg p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-fg transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {!onMenu && (
        <Link
          to="/menu"
          className="tlink flex-1 justify-center text-base"
        >
          Se menu
        </Link>
      )}
      <RingKnap className={onMenu ? 'flex w-full' : 'flex-[1.6]'}>
        {onMenu ? `${status.cta} – ${business.phoneDisplay}` : `Ring ${business.phoneDisplay}`}
      </RingKnap>
    </div>
  )
}

export default RingNuBar

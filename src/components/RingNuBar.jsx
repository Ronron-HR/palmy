import { useEffect, useState } from 'react'
import { business } from '../content'
import RingKnap from './RingKnap'
import { useOpenStatus } from '../hooks/useOpenStatus'

// Kun mobil: fast bar i bunden. Synlig når hero er scrollet forbi, og skjult
// igen fra kontakt-sektionen og ned (så baren aldrig flimrer over eller dækker
// kontaktknappen/footeren). Ren scroll-baseret beregning — ingen
// IntersectionObserver-flimmer nær bunden.
function RingNuBar() {
  const [visible, setVisible] = useState(false)
  const status = useOpenStatus()

  useEffect(() => {
    let frame = 0

    const compute = () => {
      frame = 0
      const vh = window.innerHeight
      const scrollY = window.scrollY
      const viewportBottom = scrollY + vh

      // Vis først når man er scrollet et godt stykke forbi heroen.
      const pastHero = scrollY > vh * 0.6

      // Skjul fra kontakt-sektionen og ned (footeren ligger under den).
      const kontakt = document.getElementById('kontakt')
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
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-green-deep/10 bg-cream/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <RingKnap variant="green" track="bar" className="flex w-full">
        {status.cta} – {business.phoneDisplay}
      </RingKnap>
    </div>
  )
}

export default RingNuBar

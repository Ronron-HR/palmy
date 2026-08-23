import { useEffect, useState } from 'react'
import { business } from '../content'

// Kun mobil: fast bar i bunden, synlig når hero er scrollet forbi
// og kontaktsektionen ikke er på skærmen.
function RingNuBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('forside')
    const kontakt = document.getElementById('kontakt')
    if (!hero) return

    let heroVisible = true
    let kontaktVisible = false
    const update = () => setVisible(!heroVisible && !kontaktVisible)

    const heroObserver = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting
      update()
    })
    heroObserver.observe(hero)

    let kontaktObserver = null
    if (kontakt) {
      kontaktObserver = new IntersectionObserver(([entry]) => {
        kontaktVisible = entry.isIntersecting
        update()
      })
      kontaktObserver.observe(kontakt)
    }

    return () => {
      heroObserver.disconnect()
      kontaktObserver?.disconnect()
    }
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-green-deep/10 bg-cream/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <a
        href={`tel:${business.phone}`}
        tabIndex={visible ? 0 : -1}
        className="flex items-center justify-center gap-2 rounded-full bg-green-deep px-6 py-3.5 text-base font-semibold text-cream transition-colors hover:bg-green-deep-light"
      >
        Ring og bestil – {business.phoneDisplay}
      </a>
    </div>
  )
}

export default RingNuBar

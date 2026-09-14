import { useEffect, useState } from 'react'
import { business } from '../content'
import RingKnap from './RingKnap'

// Kun mobil: fast bar i bunden, synlig når hero er scrollet forbi og
// hverken kontakt- eller footer-sektionen er på skærmen (så baren aldrig
// dækker kontaktknappen eller footeren).
function RingNuBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('forside')
    if (!hero) return

    let heroVisible = true
    const bottomEls = ['kontakt', 'footer']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    const bottomVisible = new Set()
    const update = () => setVisible(!heroVisible && bottomVisible.size === 0)

    const heroObserver = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting
      update()
    })
    heroObserver.observe(hero)

    const bottomObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) bottomVisible.add(entry.target)
        else bottomVisible.delete(entry.target)
      })
      update()
    })
    bottomEls.forEach((el) => bottomObserver.observe(el))

    return () => {
      heroObserver.disconnect()
      bottomObserver.disconnect()
    }
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-green-deep/10 bg-cream/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <RingKnap variant="green" className="flex w-full">
        Ring og bestil – {business.phoneDisplay}
      </RingKnap>
    </div>
  )
}

export default RingNuBar

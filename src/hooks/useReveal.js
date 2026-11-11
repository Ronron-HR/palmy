import { useEffect, useRef } from 'react'

// Foto-reveal (MOTION.md): fotoet afsløres nedefra, første gang det kommer i
// billedet, og kun én gang. Ref sættes på billedets ramme (ikke <img>: et
// helt klippet element tæller ikke som synligt for IntersectionObserver).
// Uden JavaScript (prerenderet HTML) står fotoet
// bare synligt; først når scriptet kører, "spændes" det (data-reveal="armed").
// Selve bevægelsen står i index.css ([data-reveal]).
export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    el.dataset.reveal = 'armed'
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.reveal = 'in'
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}

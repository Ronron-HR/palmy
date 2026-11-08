import { useEffect, useRef, useState } from 'react'

// Tæller, hvor mange gange et element er kommet ind i billedet IGEN efter at have
// været ude af det. Tallet bruges som `key` på det animerede indhold, så
// CSS-animationen starter forfra hver gang man scroller tilbage til det.
// Første gang for elementer, der allerede er i billedet ved indlæsning, kører
// animationen af sig selv (ren CSS, også uden JavaScript).
//
// Let og hurtigt: én IntersectionObserver pr. element, kun CSS-transform og
// opacity, og kun state-opdatering når elementet kommer ind igen.
export function useReplay({ enter = 0.3, leave = 0.1 } = {}) {
  const ref = useRef(null)
  const [plays, setPlays] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    let out = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio
        if (!entry.isIntersecting || ratio <= leave) {
          out = true
          return
        }
        if (out && ratio >= enter) {
          out = false
          setPlays((n) => n + 1)
        }
      },
      { threshold: [0, leave, enter] },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [enter, leave])

  return [ref, plays]
}

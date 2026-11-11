import { useEffect, useState } from 'react'
import { business, ui } from '../content'

// Ring-bar, kun mobil < 768 px (KOMPONENTER.md §5, MOTION.md).
// Skjult, mens skiltets telefonbjælke er på skærmen; glider op, når den er ude.
// I skjult tilstand er baren `inert` + aria-hidden, så den hverken kan
// fokuseres, klikkes eller læses op.
function RingBar({ targetRef }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const target = targetRef.current
    if (!target || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting))
    io.observe(target)
    return () => io.disconnect()
  }, [targetRef])

  return (
    <a
      href={`tel:${business.phoneHref}`}
      data-visible={visible}
      inert={!visible}
      aria-hidden={visible ? undefined : 'true'}
      className="bar ring-bar fixed inset-x-0 bottom-0 z-40 flex h-(--ringbar-height) items-center justify-center bg-black text-md font-bold text-cream tabular-nums no-underline md:hidden"
    >
      {ui.ringBar}
    </a>
  )
}

export default RingBar

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { billeder } from '../content'
import { galleri, images } from '../media'
import Picture from './Picture'
import LoopVideo from './LoopVideo'

// Billedrullen (genindført fra 6da312c, restylet efter palmy_handoff).
// Billederne glider langsomt af sig selv i en uendelig løkke (listen er
// fordoblet; kopien er skjult for skærmlæsere). Den holder pause ved berøring,
// mus over, fokus, skjult fane, eller når den er uden for skærmen, og der er en
// pause-knap. Ved "reducér bevægelse" starter den pauset. Man kan altid swipe,
// bruge pilene eller piletasterne. Kortene har billedets eget format.
const SPEED = 40 // px pr. sekund — roligt
const RESUME_AFTER_MS = 2000

const motionQuery = '(prefers-reduced-motion: reduce)'
const subscribeMotion = (cb) => {
  const mq = window.matchMedia(motionQuery)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const getReducedMotion = () => window.matchMedia(motionQuery).matches

const Arrow = ({ dir }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-5">
    <path d={dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
)

const PlayPause = ({ playing }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5">
    {playing ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5.5v13l11-6.5z" />}
  </svg>
)

function Card({ item, index }) {
  return (
    <figure className="m-0">
      <div className="roll-media" style={{ aspectRatio: item.ratio }}>
        {item.type === 'image' ? (
          <Picture
            id={item.image}
            sizes="(min-width: 768px) 420px, 75vw"
            className="block h-full w-full object-cover"
            alt={images[item.image].alt}
          />
        ) : (
          <LoopVideo
            id={item.video}
            className="block h-full w-full object-cover"
            style={{ objectPosition: `var(--pos-${item.pos})` }}
          />
        )}
      </div>
      <figcaption className="eyebrow mt-3 text-red">{billeder.captions[index]}</figcaption>
    </figure>
  )
}

function BilledRulle({ label = 'Billedrulle' }) {
  const railRef = useRef(null)
  const firstRef = useRef(null)
  const cloneRef = useRef(null)
  const hoverRef = useRef(false)
  const touchedAt = useRef(0)
  const inView = useRef(false)
  const pausedRef = useRef(false)
  const [userPaused, setUserPaused] = useState(null)
  const reduced = useSyncExternalStore(subscribeMotion, getReducedMotion, () => false)
  const paused = userPaused ?? reduced

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    const rail = railRef.current
    const first = firstRef.current
    const clone = cloneRef.current
    if (!rail || !first || !clone) return
    let frame = 0
    let last = 0
    let pos = rail.scrollLeft
    let lastSet = pos
    const loopWidth = () => clone.offsetLeft - first.offsetLeft
    const touch = () => (touchedAt.current = performance.now())
    const enter = () => (hoverRef.current = true)
    const leave = () => (hoverRef.current = false)

    const tick = (now) => {
      frame = requestAnimationFrame(tick)
      const dt = Math.min(now - last, 64) / 1000
      last = now
      const loop = loopWidth()
      if (loop <= 0) return
      if (Math.abs(rail.scrollLeft - lastSet) > 2) pos = rail.scrollLeft
      const running =
        !pausedRef.current &&
        now - touchedAt.current > RESUME_AFTER_MS &&
        !hoverRef.current &&
        inView.current &&
        !document.hidden &&
        !rail.contains(document.activeElement)
      if (running) {
        pos += SPEED * dt
        if (pos >= loop) pos -= loop
        rail.scrollLeft = pos
        lastSet = rail.scrollLeft
      } else {
        pos = rail.scrollLeft
        lastSet = pos
      }
    }

    const io = new IntersectionObserver(([e]) => (inView.current = e.isIntersecting))
    io.observe(rail)
    rail.addEventListener('pointerdown', touch)
    rail.addEventListener('touchstart', touch, { passive: true })
    rail.addEventListener('wheel', touch, { passive: true })
    rail.addEventListener('keydown', touch)
    rail.addEventListener('mouseenter', enter)
    rail.addEventListener('mouseleave', leave)
    frame = requestAnimationFrame((t) => {
      last = t
      frame = requestAnimationFrame(tick)
    })
    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      rail.removeEventListener('pointerdown', touch)
      rail.removeEventListener('touchstart', touch)
      rail.removeEventListener('wheel', touch)
      rail.removeEventListener('keydown', touch)
      rail.removeEventListener('mouseenter', enter)
      rail.removeEventListener('mouseleave', leave)
    }
  }, [])

  const step = (dir) => {
    const rail = railRef.current
    if (!rail) return
    touchedAt.current = performance.now()
    rail.scrollBy({ left: dir * rail.clientWidth * 0.7, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <div className="roll">
      <ul ref={railRef} role="region" aria-label={label} tabIndex={0} className="roll-rail">
        {galleri.map((item, i) => (
          <li key={item.image ?? item.video} ref={i === 0 ? firstRef : undefined}>
            <Card item={item} index={i} />
          </li>
        ))}
        {galleri.map((item, i) => (
          <li key={`kopi-${item.image ?? item.video}`} ref={i === 0 ? cloneRef : undefined} aria-hidden="true" inert>
            <Card item={item} index={i} />
          </li>
        ))}
      </ul>
      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          aria-label={paused ? 'Start billedrullen' : 'Sæt billedrullen på pause'}
          aria-pressed={paused}
          onClick={() => setUserPaused(!paused)}
          className="roll-btn"
        >
          <PlayPause playing={!paused} />
        </button>
        <button type="button" aria-label="Forrige billeder" onClick={() => step(-1)} className="roll-btn">
          <Arrow dir="prev" />
        </button>
        <button type="button" aria-label="Næste billeder" onClick={() => step(1)} className="roll-btn">
          <Arrow dir="next" />
        </button>
      </div>
    </div>
  )
}

export default BilledRulle

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { galleri, images } from '../media'
import Picture from './Picture'
import LoopVideo from './LoopVideo'

// Hastighed i pixels pr. sekund, og hvor længe efter en berøring/et klik
// galleriet venter, før det ruller videre af sig selv.
const SPEED = 95
const RESUME_AFTER_MS = 1500

const motionQuery = '(prefers-reduced-motion: reduce)'
const subscribeMotion = (callback) => {
  const mq = window.matchMedia(motionQuery)
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}
const getReducedMotion = () => window.matchMedia(motionQuery).matches

function Arrow({ direction }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d={direction === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
    </svg>
  )
}

function PlayPauseIcon({ playing }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      {playing ? (
        <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
      ) : (
        <path d="M8 5.5v13l11-6.5z" />
      )}
    </svg>
  )
}

function Card({ item }) {
  return (
    <>
      {item.type === 'image' ? (
        <Picture
          id={item.image}
          sizes="(min-width: 1024px) 480px, 80vw"
          className="h-full w-full object-cover"
          alt={images[item.image].alt}
        />
      ) : (
        <LoopVideo id={item.video} className="h-full w-full object-cover" />
      )}
    </>
  )
}

const cardClass =
  'h-[60svh] max-h-[640px] min-h-[320px] max-w-[80vw] shrink-0 overflow-hidden rounded-sm bg-surface'

// Rullende galleri. Billederne glider langsomt af sted af sig selv i en uendelig
// løkke (listen er fordoblet; kopien er skjult for skærmlæsere). Det holder pause,
// så snart man rører, holder musen over, giver det fokus, eller fanen skjules, og
// der er en tydelig pause-knap. Ved "reducér bevægelse" starter det pauset.
// Man kan altid swipe, bruge pilene eller piletasterne. Indhold: src/media.js.
function Galleri() {
  const railRef = useRef(null)
  const firstRef = useRef(null)
  const cloneRef = useRef(null)
  const hoverRef = useRef(false)
  const interactedAtRef = useRef(0)
  const inViewRef = useRef(true)
  const pausedRef = useRef(false)
  const [userPaused, setUserPaused] = useState(null)
  const [progress, setProgress] = useState(0)
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, () => false)
  const paused = userPaused ?? reducedMotion

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

    const touch = () => {
      interactedAtRef.current = performance.now()
    }
    const onEnter = () => (hoverRef.current = true)
    const onLeave = () => (hoverRef.current = false)

    const tick = (now) => {
      frame = requestAnimationFrame(tick)
      const dt = Math.min(now - last, 64) / 1000
      last = now

      const loop = loopWidth()
      if (loop <= 0) return

      // Har brugeren selv flyttet skinnen (swipe, piletaster, pil), så følg med.
      if (Math.abs(rail.scrollLeft - lastSet) > 2) pos = rail.scrollLeft

      const idle = now - interactedAtRef.current > RESUME_AFTER_MS
      const running =
        !pausedRef.current &&
        idle &&
        !hoverRef.current &&
        inViewRef.current &&
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
      setProgress((rail.scrollLeft % loop) / loop)
    }

    const observer = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting
    })
    observer.observe(rail)

    rail.addEventListener('pointerdown', touch)
    rail.addEventListener('touchstart', touch, { passive: true })
    rail.addEventListener('wheel', touch, { passive: true })
    rail.addEventListener('keydown', touch)
    rail.addEventListener('mouseenter', onEnter)
    rail.addEventListener('mouseleave', onLeave)
    frame = requestAnimationFrame((t) => {
      last = t
      frame = requestAnimationFrame(tick)
    })

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      rail.removeEventListener('pointerdown', touch)
      rail.removeEventListener('touchstart', touch)
      rail.removeEventListener('wheel', touch)
      rail.removeEventListener('keydown', touch)
      rail.removeEventListener('mouseenter', onEnter)
      rail.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const step = (direction) => {
    const rail = railRef.current
    if (!rail) return
    interactedAtRef.current = performance.now()
    rail.scrollBy({ left: direction * rail.clientWidth * 0.7, behavior: 'smooth' })
  }

  const buttonClass =
    'press flex h-12 w-12 items-center justify-center rounded-full border border-fg/40 text-fg hover:bg-fg/10'

  return (
    <div>
      <ul
        ref={railRef}
        role="region"
        aria-label="Billedgalleri"
        tabIndex={0}
        className="no-scrollbar flex gap-3 overflow-x-auto px-4 sm:gap-4 sm:px-6"
      >
        {galleri.map((item, index) => (
          <li
            key={item.image ?? item.video}
            ref={index === 0 ? firstRef : undefined}
            style={{ aspectRatio: item.ratio }}
            className={cardClass}
          >
            <Card item={item} />
          </li>
        ))}
        {/* Kopi til den uendelige løkke — skjult for skærmlæsere og tastatur. */}
        {galleri.map((item, index) => (
          <li
            key={`kopi-${item.image ?? item.video}`}
            ref={index === 0 ? cloneRef : undefined}
            style={{ aspectRatio: item.ratio }}
            className={cardClass}
            aria-hidden="true"
            inert
          >
            <Card item={item} />
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-6 flex max-w-6xl items-center gap-6 px-4 sm:px-6">
        <div className="h-px flex-1 bg-line">
          <div
            className="h-px origin-left bg-fg"
            style={{ transform: `scaleX(${Math.max(progress, 0.04)})` }}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label={paused ? 'Start automatisk rulning' : 'Pause automatisk rulning'}
            aria-pressed={paused}
            onClick={() => setUserPaused(!paused)}
            className={buttonClass}
          >
            <PlayPauseIcon playing={!paused} />
          </button>
          <button
            type="button"
            aria-label="Forrige billeder"
            onClick={() => step(-1)}
            className={`${buttonClass} hidden md:flex`}
          >
            <Arrow direction="prev" />
          </button>
          <button
            type="button"
            aria-label="Næste billeder"
            onClick={() => step(1)}
            className={`${buttonClass} hidden md:flex`}
          >
            <Arrow direction="next" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Galleri

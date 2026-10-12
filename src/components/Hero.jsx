import { useEffect, useRef } from 'react'
import { hero, business } from '../content'
import RingKnap from './RingKnap'
import AabenStatus from './AabenStatus'
import { useOpenStatus } from '../hooks/useOpenStatus'

function Hero() {
  const status = useOpenStatus()
  const videoRef = useRef(null)

  // Videoen må ikke gøre siden tung:
  //  - den hentes først, når siden er færdigindlæst (preload="none" i markup),
  //    så poster, tekst og knapper aldrig venter på den
  //  - den afspilles kun, mens hero er synlig (sparer CPU når man læser menuen)
  //  - ved reduced motion, "spar data" eller meget langsom forbindelse
  //    startes den aldrig — poster-billedet bliver stående
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true // lydløs som property, ikke kun som attribut

    const connection = navigator.connection
    const skip =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      connection?.saveData === true ||
      /(^|-)2g$/.test(connection?.effectiveType ?? '')
    if (skip) return

    let visible = true
    let started = false
    const play = () => {
      if (!started || !visible) return
      video.play().catch(() => {
        // Autoplay afvist (fx strømsparetilstand) — posteren står tilbage.
      })
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) play()
      else video.pause()
    })
    observer.observe(video)

    const start = () => {
      started = true
      play()
    }
    let idleId = 0
    const schedule = () => {
      idleId = window.requestIdleCallback
        ? window.requestIdleCallback(start, { timeout: 2000 })
        : window.setTimeout(start, 300)
    }
    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('load', schedule)
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId)
      window.clearTimeout(idleId)
    }
  }, [])

  return (
    // Fast højde (samme som det tidligere hero-billede), så videoen aldrig giver
    // layout-spring. Baggrunden er poster-billedet (.hero-fallback i index.css),
    // som ses før videoen er klar, hvis den ikke kan afspilles, og ved reduced motion.
    <section
      id="forside"
      className="hero-fallback relative h-[calc(100dvh-3.5rem)] min-h-[420px] overflow-hidden sm:h-[80vh]"
    >
      {/* Dekorativ baggrundsvideo uden lyd. Mobil-kilderne (lodret 720×1280)
          vælges under 768 px, ellers desktop (1920×1080). */}
      <video
        ref={videoRef}
        className="hero-video absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        poster="/videos/palmy-hero-poster.jpg"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source media="(max-width: 768px)" src="/videos/palmy-hero-mobile.webm" type="video/webm" />
        <source media="(max-width: 768px)" src="/videos/palmy-hero-mobile.mp4" type="video/mp4" />
        <source src="/videos/palmy-hero-desktop.webm" type="video/webm" />
        <source src="/videos/palmy-hero-desktop.mp4" type="video/mp4" />
      </video>
      {/* Mørk overlay mellem video og tekst. */}
      <div aria-hidden="true" className="hero-shade absolute inset-0" />

      <div className="absolute inset-0 flex items-end sm:items-center">
        <div className="mx-auto w-full max-w-5xl px-4 pb-10 sm:px-6 sm:pb-0">
          <div className="max-w-xl">
            <AabenStatus tone="light" className="mb-5" />
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.015em] text-cream sm:text-6xl">
              {hero.heading}
            </h1>
            <p className="mt-4 text-base text-cream/90 sm:text-lg">
              {hero.subheading}
            </p>

            {/* Mobil: to lige brede knapper stablet; fra sm side om side. */}
            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <RingKnap variant="gold">
                {status.cta} – {business.phoneDisplay}
              </RingKnap>
              <a
                href="#menu"
                className="press inline-flex min-h-12 items-center justify-center rounded-full border border-cream/80 px-6 py-3 text-base font-semibold text-cream hover:bg-cream/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              >
                Se menu
              </a>
            </div>

            {status.subLine && (
              <p className="mt-4 text-sm text-cream/80">{status.subLine}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

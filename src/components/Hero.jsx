import { useEffect, useRef } from 'react'
import { hero, hours, business, google } from '../content'
import { heroVideo } from '../media'
import RingKnap from './RingKnap'
import AabenStatus from './AabenStatus'
import Link from './Link'
import Stars from './Stars'
import { SocialIconLinks } from './SocialLinks'
import { useReplay } from '../hooks/useReplay'
import { useOpenStatus } from '../hooks/useOpenStatus'

function ChevronDown() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

// Mobil: fuldskærms-video (lodret wok over gasflamme) med teksten nederst, hvor
// tommelfingeren er. Desktop (lg+): to spor — tekst til venstre på sidens grid, den
// samme lodrette video som et højt, kantløst panel helt ud til højre kant.
// Åbningstiden (dage + tid) står her ÉN gang; hele tidtavlen (forudbestilling 15.00,
// afhentning 16.00, lukker 20.30) bor i BestilNu lige under. Ring er den eneste pille.
function Hero() {
  const status = useOpenStatus()
  const videoRef = useRef(null)
  // Overskriften stiger op igen, hver gang heroen kommer tilbage i billedet.
  const [sectionRef, plays] = useReplay({ enter: 0.5, leave: 0.15 })

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
    // Mindst en skærm høj (headeren er 3,5 rem), men vokser, hvis indholdet kræver det
    // (små telefoner) — teksten må aldrig skubbes op under headeren.
    // Mobil: videoen fylder hele heroen bag teksten. Desktop (lg+): to spor — tekst til
    // venstre på sidens grid, den lodrette video som et højt, kantløst panel helt ud
    // til højre kant. Ingen ramme og ingen streg: videoen står i sit eget format.
    <section
      ref={sectionRef}
      id="forside"
      className="theme-ink relative flex min-h-[calc(100svh-3.5rem)] overflow-hidden bg-bg text-fg lg:grid lg:min-h-[calc(100svh-4.0625rem)] lg:grid-cols-[minmax(0,1fr)_clamp(22rem,32vw,36rem)]"
    >
      <div className="hero-poster absolute inset-0 lg:static lg:order-2">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="none"
          poster={heroVideo.poster}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={heroVideo.webm} type="video/webm" />
          <source src={heroVideo.mp4} type="video/mp4" />
        </video>
        {/* Ensartet blæk-tone mellem video og tekst — kun når teksten ligger over. */}
        <div aria-hidden="true" className="hero-shade absolute inset-0 lg:hidden" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-end px-4 pb-8 pt-10 sm:px-6 lg:order-1 lg:justify-center lg:py-16 lg:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:pr-12">
        <div className="lg:max-w-[46rem]">
          <AabenStatus className="mb-5" />
          <h1 className="font-display text-h1 text-fg">
            <span className="block overflow-hidden pb-[0.06em]">
              <span key={plays} className="rise" style={{ '--d': '30ms' }}>
                {hero.lead}
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em] text-signal">
              <span key={plays} className="rise" style={{ '--d': '110ms' }}>
                {hero.tail}
              </span>
            </span>
          </h1>
          <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-fg lg:text-muted">
            {hero.subheading}
          </p>

          {/* Åbningstiderne, tydeligt og ÉN gang: dage og tid. Hele tidtavlen
              (forudbestilling 15.00 osv.) står i sektionen lige under heroen. */}
          <div className="mt-7 grid grid-cols-[auto_1fr] items-end gap-x-6 border-y border-line py-4">
            <p className="label text-fg">
              Åbent
              <span className="mt-1 block text-base font-semibold normal-case tracking-normal">
                {hours.days}
              </span>
            </p>
            <p className="text-right font-display text-[clamp(2.1rem,1.2rem+3.6vw,3.6rem)] leading-none tabular-nums text-fg">
              {hours.time}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-1">
            <RingKnap className="w-full sm:w-auto">
              {status.cta} – {business.phoneDisplay}
            </RingKnap>
            <Link to="/menu" className="tlink">
              Se menukortet
            </Link>
          </div>

          {/* Rating (scroller til anmeldelserne) og Facebook/Instagram lige ved
              hånden — begge uden at forlade første skærm. */}
          <div className="mt-5 flex items-center justify-between gap-3">
            <a
              href="#anmeldelser"
              className="inline-flex min-h-11 items-center gap-2.5 text-sm font-semibold text-fg hover:text-signal"
            >
              <Stars className="h-3 w-3" />
              <span>
                {google.rating} på Google
                <span className="sr-only"> – læs anmeldelserne</span>
              </span>
              <ChevronDown />
            </a>
            <SocialIconLinks className="text-fg" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

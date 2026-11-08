import { useEffect, useRef } from 'react'
import { hero, heroTider, business, google } from '../content'
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
// tommelfingeren er. Desktop (lg+): delt layout — tekst til venstre, samme
// lodrette video i en høj ramme til højre med en tynd messinglinje. (Desktop-
// udgaven af optagelsen er et groft beskær og ser sløret ud i fuld bredde.)
// Under knapperne: Googles gennemsnit, som scroller ned til anmeldelserne.
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
    <section
      ref={sectionRef}
      id="forside"
      className="leaf-bg relative flex min-h-[calc(100svh-3.5rem)] overflow-hidden bg-emerald-night lg:min-h-[calc(100svh-4.0625rem)] lg:items-center lg:bg-bg"
    >
      <div className="mx-auto flex w-full max-w-6xl lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-6 lg:py-14">
        {/* Videoen. Mobil: fylder hele heroen bag teksten. Desktop: høj ramme. */}
        <div className="hero-poster absolute inset-0 lg:relative lg:inset-auto lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:aspect-[4/5] lg:max-h-[74svh] lg:w-full lg:max-w-md lg:justify-self-end lg:outline lg:outline-1 lg:outline-offset-[14px] lg:outline-brass/70">
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
          {/* Mørk overlay mellem video og tekst — kun når teksten ligger over. */}
          <div aria-hidden="true" className="hero-shade absolute inset-0 lg:hidden" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-end px-4 pb-8 pt-10 sm:px-6 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:justify-center lg:px-0 lg:pb-0 lg:pt-0">
          <AabenStatus className="mb-5 self-start" />
          <h1 className="font-display text-[clamp(2rem,9.6vw,2.45rem)] leading-[1.02] text-fg [text-shadow:0_2px_18px_rgb(0_0_0/0.35)] sm:text-6xl lg:text-7xl lg:[text-shadow:none]">
            <span className="block overflow-hidden pb-1">
              <span key={plays} className="rise" style={{ '--d': '30ms' }}>
                {hero.lead}
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span key={plays} className="rise" style={{ '--d': '110ms' }}>
                {hero.tail}
              </span>
            </span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-fg [text-shadow:0_1px_12px_rgb(0_0_0/0.4)] lg:[text-shadow:none]">
            {hero.subheading}
          </p>

          {/* De tre tider i fokus: hvornår man kan bestille, hente, og hvornår vi lukker. */}
          <ul className="mt-6 grid max-w-md grid-cols-3 border-y border-brass/70">
            {heroTider.map((tid, index) => (
              <li
                key={tid.label}
                className={`py-3 ${index > 0 ? 'border-l border-brass/70 pl-3 sm:pl-5' : 'pr-3 sm:pr-5'}`}
              >
                <span className="block text-sm font-semibold text-fg/85">{tid.label}</span>
                <span className="mt-1 block font-display text-[1.75rem] leading-none tabular-nums text-brass sm:text-4xl">
                  {tid.time}
                </span>
              </li>
            ))}
          </ul>

          {/* Mobil: to lige brede knapper stablet; fra sm side om side. */}
          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
            <RingKnap variant="cta">
              {status.cta} – {business.phoneDisplay}
            </RingKnap>
            <Link
              to="/menu"
              className="press inline-flex min-h-12 items-center justify-center rounded-full border border-fg/40 px-6 py-3 text-base font-semibold text-fg hover:bg-fg/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
            >
              Se menukortet
            </Link>
          </div>

          {/* Scroll-vink til anmeldelserne (Googles gennemsnit) og Facebook/Instagram
              lige ved hånden — begge uden at forlade første skærm. */}
          <div className="mt-5 flex items-center justify-between gap-3">
            <a
              href="#anmeldelser"
              className="inline-flex min-h-11 items-center gap-2.5 text-sm font-semibold text-fg hover:text-brass"
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

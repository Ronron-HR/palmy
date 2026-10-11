import { hero, business } from '../content'
import RingKnap from './RingKnap'
import AabenStatus from './AabenStatus'
import { useOpenStatus } from '../hooks/useOpenStatus'

function Hero() {
  const status = useOpenStatus()

  return (
    <section id="forside" className="relative">
      {/* LCP-billede: WebP med responsive varianter + JPG-fallback. Ingen
          lazy-load, høj prioritet, og forudindlæst i index.html. */}
      <picture>
        <source
          type="image/webp"
          srcSet="/images/palmy-hero-800.webp 800w, /images/palmy-hero-1200.webp 1200w, /images/palmy-hero-1600.webp 1600w"
          sizes="100vw"
        />
        <img
          src="/images/palmy-hero-1200.jpg"
          width={2016}
          height={864}
          fetchPriority="high"
          decoding="async"
          alt={hero.alt}
          className="h-[calc(100dvh-3.5rem)] min-h-[420px] w-full object-cover object-[65%_50%] sm:h-[80vh] sm:object-center"
        />
      </picture>
      {/* Funktionel skygge bag teksten: nedefra på mobil, fra venstre på desktop. */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-deep/90 via-green-deep/30 to-green-deep/10 sm:bg-gradient-to-r sm:from-green-deep/90 sm:via-green-deep/65 sm:via-40% sm:to-transparent sm:to-75%" />

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

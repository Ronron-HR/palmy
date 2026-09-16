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
          className="h-[calc(100dvh-4rem)] min-h-[420px] w-full object-cover sm:h-[80vh]"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-t from-green-deep/85 via-green-deep/25 to-green-deep/10" />

      <div className="absolute inset-0 flex items-end sm:items-center">
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 sm:pb-0">
          <div className="max-w-xl">
            <AabenStatus tone="light" className="mb-5" />
            <h1 className="font-display text-3xl font-semibold leading-tight text-cream sm:text-5xl">
              {hero.heading}
            </h1>
            <p className="mt-4 text-base text-cream/90 sm:text-lg">
              {hero.subheading}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <RingKnap variant="gold" track="content">
                {status.cta} – {business.phoneDisplay}
              </RingKnap>
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/70 px-6 py-3.5 text-base font-semibold text-cream transition-colors hover:bg-cream/10"
              >
                Se menuen
              </a>
              <a
                href="#historie"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/70 px-6 py-3.5 text-base font-semibold text-cream transition-colors hover:bg-cream/10"
              >
                Hør vores historie
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

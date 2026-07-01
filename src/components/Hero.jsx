import { hero } from '../content'

function Hero() {
  return (
    <section id="forside" className="relative">
      {/* PLADSHOLDER — udskiftes når rigtige fotos er taget */}
      <img
        src={hero.image}
        alt="Frisklavet vietnamesisk mad fra Palmy Spisested"
        className="h-[calc(100dvh-4rem)] min-h-[420px] w-full object-cover sm:h-[80vh]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-green-deep/85 via-green-deep/25 to-green-deep/10" />

      <div className="absolute inset-0 flex items-end sm:items-center">
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 sm:pb-0">
          <div className="max-w-xl">
            <h1 className="font-display text-3xl font-semibold leading-tight text-cream sm:text-5xl">
              {hero.heading}
            </h1>
            <p className="mt-4 text-base text-cream/90 sm:text-lg">
              {hero.subheading}
            </p>

            <div className="mt-8">
              <a
                href="#historie"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-green-deep transition-colors hover:bg-gold-light"
              >
                Hør vores historie
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

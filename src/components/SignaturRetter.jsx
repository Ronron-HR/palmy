import { useEffect, useRef, useState } from 'react'
import { signatur } from '../content'
import { dishesByNumber, getDisplayPrice } from '../data/menu'
import NumberBadge from './menu/NumberBadge'

// Kuraterede favoritter som mobile-first swipe-carousel lige under heroen.
// Fotos er behandlet på forhånd (scripts/process-signatur-images.mjs) til 4:5
// WebP i to bredder. Retterne kommer fra menuen (dishesByNumber), så navn/pris
// aldrig kan skride fra kortet. Ingen carousel-lib: native scroll-snap.

const IMG_BASE = '/images/signatur'

// Slides der reelt findes i menuen — beskytter mod et forkert nummer i data.
const slides = signatur.dishes
  .map((item) => ({ ...item, dish: dishesByNumber.get(item.number) }))
  .filter((item) => item.dish)

function SignaturRetter() {
  const trackRef = useRef(null)
  const slideRefs = useRef([])
  const [active, setActive] = useState(0)

  // Følg det aktive slide (kun relevant på mobil, hvor carousellen scroller).
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = slideRefs.current.indexOf(entry.target)
            if (index !== -1) setActive(index)
          }
        })
      },
      { root: track, threshold: 0.6 },
    )

    slideRefs.current.forEach((node) => node && observer.observe(node))
    return () => observer.disconnect()
  }, [])

  function goTo(index) {
    const node = slideRefs.current[index]
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (node) node.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', inline: 'center', block: 'nearest' })
  }

  if (slides.length === 0) return null

  return (
    <section id="signaturretter" className="bg-green-hero py-14 sm:py-20">
      <div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] text-cream sm:text-4xl">
            {signatur.heading}
          </h2>
          <p className="mt-3 max-w-xl text-base text-cream/80 sm:text-lg">{signatur.intro}</p>
        </div>

        {/* Mobil: swipe-carousel (scroll-snap). Desktop: 3-kolonne grid. */}
        <div
          ref={trackRef}
          tabIndex={0}
          role="region"
          aria-label="Udvalgte retter"
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[8vw] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-auto sm:mt-12 sm:grid sm:max-w-5xl sm:snap-none sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-6"
        >
          {slides.map((item, index) => {
            return (
              <figure
                key={item.number}
                ref={(node) => (slideRefs.current[index] = node)}
                className="w-[84vw] max-w-sm shrink-0 snap-center sm:w-auto sm:max-w-none"
              >
                <div className="aspect-square overflow-hidden rounded-md bg-green-deep-light/40">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${IMG_BASE}/${item.image}-800.webp 800w, ${IMG_BASE}/${item.image}-1200.webp 1200w`}
                      sizes="(min-width: 640px) 320px, 84vw"
                    />
                    <img
                      src={`${IMG_BASE}/${item.image}-800.webp`}
                      width={800}
                      height={800}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </picture>
                </div>
                {/* Billedtekst under fotoet — maden dækkes ikke af tekst/gradient. */}
                <figcaption className="mt-3 grid grid-cols-[auto_1fr] items-start gap-x-3 text-left">
                  <span className="pt-0.5">
                    <NumberBadge number={item.dish.number} />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold leading-snug text-cream">
                      {item.dish.name}
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold tabular-nums text-gold-light">
                      {getDisplayPrice(item.dish)}
                    </span>
                  </span>
                </figcaption>
              </figure>
            )
          })}
        </div>

        {/* Diskrete dots — kun på mobil, hvor carousellen scroller. */}
        {/* Diskrete dots — kun på mobil. Selve prikken er lille, men
            trykfladen er 44px høj. */}
        <div className="mt-3 flex justify-center sm:hidden">
          {slides.map((item, index) => (
            <button
              key={item.number}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Vis ret ${index + 1} af ${slides.length}`}
              aria-current={index === active ? 'true' : undefined}
              className="flex h-11 w-9 items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={`block h-2 rounded-full transition-[width,background-color] duration-200 ${
                  index === active ? 'w-6 bg-gold' : 'w-2 bg-cream/40'
                }`}
              />
            </button>
          ))}
        </div>

        <div className="mx-auto mt-6 max-w-5xl px-4 sm:mt-10 sm:px-6">
          <a
            href="#menu"
            className="inline-flex min-h-11 items-center font-semibold text-gold-light underline decoration-gold/60 underline-offset-4 transition-colors hover:text-cream"
          >
            Se hele menukortet
          </a>
        </div>
      </div>
    </section>
  )
}

export default SignaturRetter

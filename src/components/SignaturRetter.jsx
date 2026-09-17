import { useEffect, useRef, useState } from 'react'
import { signatur } from '../content'
import { dishesByNumber, getDisplayPrice } from '../data/menu'
import { useInView } from '../hooks/useInView'
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
  const [sectionRef, inView] = useInView()
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
    if (node) node.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  if (slides.length === 0) return null

  return (
    <section id="signaturretter" className="bg-[#23372a] py-16 sm:py-24">
      <div
        ref={sectionRef}
        className={`transition-all duration-1000 ease-out ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">
            {signatur.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-cream/75 sm:text-lg">
            {signatur.intro}
          </p>
        </div>

        {/* Mobil: swipe-carousel (scroll-snap). Desktop: 3-kolonne grid. */}
        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[8vw] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-auto sm:mt-12 sm:grid sm:max-w-5xl sm:snap-none sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-6"
        >
          {slides.map((item, index) => {
            const isActive = index === active
            return (
              <figure
                key={item.number}
                ref={(node) => (slideRefs.current[index] = node)}
                className="w-[84vw] max-w-sm shrink-0 snap-center sm:w-auto sm:max-w-none"
              >
                <div className="group relative aspect-square overflow-hidden rounded-2xl bg-green-deep-light/40 shadow-lg ring-1 ring-cream/10">
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
                      className={`h-full w-full object-cover transition-transform duration-700 ease-out motion-reduce:transform-none sm:group-hover:scale-105 ${
                        isActive ? 'scale-105 sm:scale-100' : 'scale-100'
                      }`}
                    />
                  </picture>

                  {/* Grøn bund-gradient for læsbar tekst, som i heroen. */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-green-deep/85 via-green-deep/10 to-transparent" />

                  <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4 sm:p-5">
                    <NumberBadge number={item.dish.number} size="large" />
                    <div className="min-w-0 text-left">
                      <p className="font-display text-lg font-semibold leading-tight text-cream sm:text-xl">
                        {item.dish.name}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-gold-light">
                        {getDisplayPrice(item.dish)}
                      </p>
                    </div>
                  </figcaption>
                </div>
              </figure>
            )
          })}
        </div>

        {/* Diskrete dots — kun på mobil, hvor carousellen scroller. */}
        <div className="mt-6 flex justify-center gap-2 sm:hidden">
          {slides.map((item, index) => (
            <button
              key={item.number}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Vis ret ${index + 1} af ${slides.length}`}
              aria-current={index === active}
              className={`h-2 rounded-full transition-all ${
                index === active ? 'w-6 bg-gold' : 'w-2 bg-cream/30'
              }`}
            />
          ))}
        </div>

        {/* Peger videre ned til det fulde menukort. */}
        <div className="mt-10 flex justify-center sm:mt-14">
          <a
            href="#menu"
            className="group inline-flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-light transition-colors hover:text-gold"
          >
            Menu nedenfor
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-5 w-5 animate-bounce motion-reduce:animate-none"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default SignaturRetter

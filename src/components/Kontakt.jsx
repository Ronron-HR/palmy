import { useEffect, useRef, useState } from 'react'
import { business, hours, kontakt } from '../content'

function MapPinIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

// Kontakt/lokation — navn, adresse og telefon (NAP) som ren, crawlbar HTML i
// et <address>-element, så Google og gæster finder de samme oplysninger her,
// i footeren og i schema (src/seo.js).
function Kontakt() {
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef(null)
  // Knappen forsvinder ved klik — giv fokus videre til kortet, så det ikke tabes.
  useEffect(() => {
    if (mapLoaded) mapRef.current?.focus()
  }, [mapLoaded])
  const mapsEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(business.address)}&output=embed`

  return (
    <section id="kontakt" className="bg-cream pb-16 pt-6 sm:pb-20 sm:pt-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 [&>*]:max-w-3xl">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] text-green-deep sm:text-4xl">
          {kontakt.heading}
        </h2>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <address className="text-lg not-italic leading-relaxed text-green-deep/85">
            <span className="block font-display font-semibold text-green-deep">{business.name}</span>
            <span className="block">{business.street}</span>
            <span className="block">
              {business.postalCode} {business.city}
            </span>
          </address>

          <a
            href={`tel:${business.phoneHref}`}
            className="press inline-flex min-h-12 items-center justify-center self-start rounded-full bg-green-deep px-7 text-lg font-semibold tabular-nums text-cream hover:bg-green-deep-light sm:self-auto"
          >
            Ring {business.phoneDisplay}
          </a>
        </div>

        <p className="mt-4 text-sm text-green-deep/75">
          Åbent {hours.daysLong} kl.&nbsp;{hours.time}. {hours.preorderNote}
        </p>

        <div className="mt-8 overflow-hidden rounded-md border border-green-deep/15">
          {mapLoaded ? (
            <iframe
              ref={mapRef}
              src={mapsEmbedSrc}
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${business.name} på Google Maps`}
            />
          ) : (
            <button
              type="button"
              onClick={() => setMapLoaded(true)}
              className="flex h-40 w-full flex-col items-center justify-center gap-2 bg-green-deep/5 transition-colors hover:bg-green-deep/10 active:bg-green-deep/15 sm:h-56"
            >
              <MapPinIcon className="h-7 w-7 text-green-deep/70" />
              <span className="font-semibold text-green-deep">Vis kort</span>
              <span className="text-xs text-green-deep/75">
                Indlæser Google Maps først når du klikker
              </span>
            </button>
          )}
        </div>

        <a
          href={business.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-medium text-green-deep/80 underline underline-offset-4 transition-colors hover:text-green-deep"
        >
          Se på Google Maps <span className="sr-only">(åbner i nyt vindue)</span>
        </a>
      </div>
    </section>
  )
}

export default Kontakt

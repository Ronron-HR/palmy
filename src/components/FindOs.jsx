import { useEffect, useRef, useState } from 'react'
import { business, hours, kontakt } from '../content'
import AabenStatus from './AabenStatus'
import Picture from './Picture'
import RingKnap from './RingKnap'

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

// Åbningstider, adresse og kort samlet ét sted. Navn, adresse og telefon (NAP)
// står som ren, crawlbar HTML i et <address>-element, så Google og gæster
// finder de samme oplysninger her, i footeren og i schema (src/seo.js).
// Ankrene #aabningstider og #kontakt bruges af navigationen og af Ring-baren.
function FindOs() {
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef(null)
  // Knappen forsvinder ved klik — giv fokus videre til kortet, så det ikke tabes.
  useEffect(() => {
    if (mapLoaded) mapRef.current?.focus()
  }, [mapLoaded])
  const mapsEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(business.address)}&output=embed`

  return (
    <section id="kontakt" aria-labelledby="kontakt-titel" className="theme-ink bg-bg text-fg">
      <div className="section-y mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="kontakt-titel" className="font-display text-h2 text-fg">
          {kontakt.heading}
        </h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Tider og adresse */}
          <div className="lg:col-span-5">
            <div id="aabningstider">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <p className="text-lg font-semibold text-fg">Kun {hours.daysLong}.</p>
                <AabenStatus />
              </div>
              <p className="mt-1 text-muted">{hours.closedNote}</p>

              <dl className="mt-6 divide-y divide-line border-y-2 border-fg">
                {hours.schedule.map((entry) => (
                  <div key={entry.day} className="flex items-baseline justify-between gap-4 py-4">
                    <dt className="font-display text-h3 leading-none text-fg">{entry.day}</dt>
                    <dd className="font-display text-h3 leading-none tabular-nums text-signal">
                      {entry.time}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {hours.preorderLine} {hours.pickupLine}
              </p>
            </div>

            <address className="mt-10 text-lg not-italic leading-relaxed text-fg">
              <a
                href={business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-1 transition-colors hover:text-signal"
              >
                <span className="block text-xl font-bold text-fg">{business.name}</span>
                <span className="block text-muted">{business.street}</span>
                <span className="block text-muted">
                  {business.postalCode} {business.city}
                </span>
                <span className="sr-only">(åbner i nyt vindue)</span>
              </a>
            </address>

            <RingKnap className="mt-6 w-full sm:w-auto">Ring {business.phoneDisplay}</RingKnap>
          </div>

          {/* Facade og kort */}
          <div className="lg:col-span-7">
            <Picture
              id="facade"
              sizes="(min-width: 1024px) 640px, 100vw"
              className="aspect-[16/10] w-full object-cover"
            />

            <div className="mt-3 border border-line">
              {mapLoaded ? (
                <iframe
                  ref={mapRef}
                  src={mapsEmbedSrc}
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${business.name} på Google Maps`}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setMapLoaded(true)}
                  className="flex min-h-24 w-full flex-col items-center justify-center gap-1 px-4 py-5 text-center transition-colors hover:bg-fg hover:text-bg"
                >
                  <span className="label inline-flex items-center gap-2 font-bold">
                    <MapPinIcon className="h-5 w-5 text-signal" />
                    Vis kort
                  </span>
                  <span className="text-sm text-muted">Indlæser Google Maps først når du klikker</span>
                </button>
              )}
            </div>

            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tlink mt-2"
            >
              Se på Google Maps <span className="sr-only">(åbner i nyt vindue)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FindOs

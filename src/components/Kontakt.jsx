import { useState } from 'react'
import { business, kontakt } from '../content'

function MapPinIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function Kontakt() {
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapsEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(business.address)}&output=embed`

  return (
    <section id="kontakt" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold text-green-deep sm:text-4xl">
          Kontakt
        </h2>

        <a
          href={`tel:${business.phone}`}
          className="mt-10 inline-flex items-center justify-center rounded-full bg-green-deep px-10 py-4 text-lg font-semibold text-cream transition-colors hover:bg-green-deep-light"
        >
          Ring nu – {business.phoneDisplay}
        </a>

        <p className="mt-8 text-lg text-green-deep/80">{business.address}</p>

        <div className="mt-10 overflow-hidden rounded-2xl shadow-lg">
          {mapLoaded ? (
            <iframe
              src={mapsEmbedSrc}
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Palmy Spisested på Google Maps"
            />
          ) : (
            <button
              type="button"
              onClick={() => setMapLoaded(true)}
              className="flex h-[360px] w-full flex-col items-center justify-center gap-3 border border-green-deep/10 bg-green-deep/5 transition-colors hover:bg-green-deep/10"
            >
              <MapPinIcon className="h-8 w-8 text-green-deep/60" />
              <span className="font-medium text-green-deep">Vis kort</span>
              <span className="text-sm text-green-deep/60">
                Indlæser Google Maps først når du klikker
              </span>
            </button>
          )}
        </div>

        <a
          href={business.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-medium text-green-deep/70 underline underline-offset-4 transition-colors hover:text-green-deep"
        >
          Se på Google Maps
        </a>

        <p className="mt-12 font-display text-xl italic text-gold">{kontakt.closing}</p>
      </div>
    </section>
  )
}

export default Kontakt

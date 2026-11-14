import { forwardRef } from 'react'
import { business, hero } from '../content'
import Link from './Link'
import Picture from './Picture'

// Forsidens hero — "Palmy under palmerne".
// Tekst i sort på creme til venstre (mobil: øverst) med en svag palme bag sig,
// og en dyb palmegrøn scene til højre med palmerne fra Palmys eget logo
// (public/images/palmy-palmer.svg) og Palmys foto af nr. 3 på den blå-hvide
// tallerken i en creme ramme. Maden vises i sit eget format, uden tekst
// ovenpå. "Ring og bestil" er ring-barens mål (forwardRef).
const Hero = forwardRef(function Hero(_, phoneRef) {
  return (
    <section aria-labelledby="hero-titel" className="ph">
      <div className="ph-text">
        <span aria-hidden="true" className="ph-palm ph-palm-text" />
        <p className="eyebrow ph-eyebrow">{hero.eyebrow}</p>
        <h1 id="hero-titel" className="ph-title">
          <span className="block">{hero.titleA}</span>
          <span className="ph-title-b block">{hero.titleB}</span>
        </h1>
        <p className="ph-sub">{hero.sub}</p>
        <div className="ph-actions">
          <Link to="/menu" className="btn no-underline">
            {hero.menuCta} <span aria-hidden="true" className="font-sans">↗</span>
          </Link>
          <a ref={phoneRef} href={`tel:${business.phoneHref}`} className="ph-phone">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="ph-phone-icon">
              <path
                fill="currentColor"
                d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8z"
              />
            </svg>
            <span>
              {hero.phoneCta}
              <span className="ph-phone-num tabular-nums">{business.phoneDisplay}</span>
            </span>
          </a>
        </div>
        <p className="ph-info">
          <span aria-hidden="true" className="ph-dot" />
          {hero.info}
        </p>
      </div>

      <div className="ph-stage">
        <span aria-hidden="true" className="ph-palm ph-palm-stage" />
        <span aria-hidden="true" className="ph-palm ph-palm-stage-b" />
        <figure className="ph-plate">
          <Picture
            id="nudler"
            priority
            sizes="(min-width: 1024px) 460px, (min-width: 768px) 40vw, 76vw"
            className="block h-full w-full object-cover"
          />
          <figcaption className="ph-cap">{hero.caption}</figcaption>
        </figure>
        <figure className="ph-side" aria-hidden="true">
          <Picture id="and" sizes="200px" className="block h-full w-full object-cover" alt="" />
        </figure>
        <p aria-hidden="true" className="ph-vertical">{hero.vertical}</p>
      </div>
    </section>
  )
})

export default Hero

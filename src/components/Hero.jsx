import { forwardRef } from 'react'
import { business, hero } from '../content'
import Link from './Link'
import Picture from './Picture'
import Palm from './Palm'

// Forsidens hero — "Palmy under palmerne".
// Tekst i sort på creme til venstre (mobil: øverst) med en svag palme bag sig,
// og en dyb palmegrøn scene til højre med palmerne fra Palmys eget logo
// (Palm.jsx) og Palmys foto af nr. 3 på den blå-hvide
// tallerken i en creme ramme. Maden vises i sit eget format, uden tekst
// ovenpå. "Ring og bestil" er ring-barens mål (forwardRef).
const Hero = forwardRef(function Hero(_, phoneRef) {
  return (
    <section aria-labelledby="hero-titel" className="ph">
      <div className="ph-text">
        <Palm className="palm-text" seed={2} />
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
            <span>
              {hero.phoneCta}
              <span className="ph-phone-num tabular-nums">{business.phoneDisplay}</span>
            </span>
          </a>
        </div>
        <p className="ph-info">
          {hero.info}
        </p>
      </div>

      <div className="ph-stage">
        <Palm className="palm-stage" seed={0} />
        <Palm className="palm-stage-b" seed={1} />
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

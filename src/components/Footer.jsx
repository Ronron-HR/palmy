import { business, hours, shared, social, ui } from '../content'
import Link from './Link'

// Afslutning (palmy_handoff): tekstbånd, grøn afslutningssektion og sidefod.
// id="kontakt", så gamle links til /#kontakt stadig lander her. Bunden har
// plads til ring-baren på mobil.
function Marquee() {
  const text = shared.marquee.join(' · ')
  const run = (
    <span className="marquee-run">
      {shared.marquee.map((word) => (
        <span key={word}>
          {word}
          <span aria-hidden="true" className="marquee-dot">◆</span>
        </span>
      ))}
    </span>
  )
  return (
    <section className="marquee" aria-label={text}>
      <div className="marquee-track" aria-hidden="true">
        {run}
        {run}
        {run}
        {run}
      </div>
    </section>
  )
}

function Footer({ closing = 'default' }) {
  const c = shared.closing[closing] ?? shared.closing.default
  return (
    <>
      <Marquee />
      <footer id="kontakt" className="site-footer">
        <div className="frame mx-auto">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-end">
            <div>
              <h2 className="font-serif text-xl leading-tight text-cream">{c.heading}</h2>
              <p className="mt-4 max-w-(--col-text) text-md leading-relaxed">{c.text}</p>
            </div>
            <div className="flex flex-col items-start gap-4 md:items-end">
              <a href={`tel:${business.phoneHref}`} className="footer-phone tabular-nums">
                {business.phoneDisplay}
              </a>
              <a href={`tel:${business.phoneHref}`} className="btn btn-light no-underline">
                {shared.ringCta}
              </a>
            </div>
          </div>

          <div className="footer-meta mt-14 grid gap-6 pt-8 text-xs leading-loose sm:grid-cols-2 md:grid-cols-4">
            <p>
              <a href={business.googleMapsUrl} target="_blank" rel="noopener">
                {business.street}
                <br />
                {business.postalCode} {business.city}
              </a>
            </p>
            <p>
              {hours.line}
              <br />
              {hours.preorderShort}
            </p>
            <p>
              <a href={social.instagram}>{ui.instagram}</a>
              <br />
              <a href={social.facebook}>{ui.facebook}</a>
            </p>
            <p>
              <Link to="/anmeldelser">{shared.footerReviews}</Link>
              <br />
              <Link to="/privatliv">{shared.footerPrivacy}</Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer

import { business, faq, findOs, social, ui } from '../content'
import Layout from '../components/Layout'
import Link from '../components/Link'
import Picture from '../components/Picture'

// /find-os (palmy_handoff): to kolonner — nummer, felter og knapper til
// venstre, køkkenfoto til højre — infobånd, sociale links, facade og FAQ.
function FindOs() {
  return (
    <Layout>
      <section className="split pt-10 md:pt-16">
        <div>
          <p className="eyebrow text-red">{findOs.eyebrow}</p>
          <h1 className="page-h1 mt-3 font-serif text-green">{findOs.heading}</h1>
          <a href={`tel:${business.phoneHref}`} className="big-phone mt-6 inline-block tabular-nums">
            {business.phoneDisplay}
          </a>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="field">
              <h2 className="eyebrow">Adresse</h2>
              <p className="mt-2">
                {business.street}
                <br />
                {business.postalCode} {business.city}. {findOs.region}
              </p>
            </div>
            {findOs.blocks
              .filter((block) => !block.phone)
              .map((block) => (
                <div key={block.label} className="field">
                  <h2 className="eyebrow">{block.label.replace(':', '')}</h2>
                  <p className="mt-2">{block.text}</p>
                </div>
              ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href={business.googleMapsUrl} target="_blank" rel="noopener" className="btn no-underline">
              {findOs.mapsCta} <span aria-hidden="true" className="font-sans">↗</span>
            </a>
            <Link to="/anmeldelser" className="text-link">
              {findOs.reviewsCta} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="split-media">
          <Picture
            id="koekkenWok"
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="block h-full w-full object-cover"
          />
        </div>
      </section>

      <ul className="info-band mt-14">
        {findOs.band.map((t) => (
          <li key={t}>{t}</li>
        ))}
        <li>
          <a href={`tel:${business.phoneHref}`} className="tabular-nums">
            {business.phoneDisplay}
          </a>
        </li>
      </ul>

      <section className="split mt-14">
        <div>
          <h2 className="font-serif text-xl leading-tight text-green">{findOs.followHeading}</h2>
          <p className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            <a href={social.instagram} className="text-link">
              {ui.instagram} <span aria-hidden="true">↗</span>
            </a>
            <a href={social.facebook} className="text-link">
              {ui.facebook} <span aria-hidden="true">↗</span>
            </a>
          </p>
          <h2 className="mt-14 font-serif text-xl leading-tight text-green">{findOs.qaHeading}</h2>
          <div className="mt-6 flex flex-col gap-6 leading-relaxed">
            {faq.items.map((item) => (
              <div key={item.question} className="field">
                <h3 className="font-serif text-md text-green">{item.question}</h3>
                <p className="mt-2">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="self-start">
          <Picture
            id="facade"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="block aspect-wide w-full object-cover object-(--pos-facade)"
          />
          <p className="eyebrow mt-3 text-red">{business.street}</p>
        </div>
      </section>
    </Layout>
  )
}

export default FindOs

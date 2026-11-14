import { business, google, hero, home, reviewText, reviewsWithText, shared, steps } from '../content'
import BilledRulle from '../components/BilledRulle'
import { dishesByNumber, formatKr } from '../data/menu'
import Picture from '../components/Picture'
import Layout from '../components/Layout'
import Link from '../components/Link'
import MenuSections from '../components/menu/MenuSections'
import Anmeldelse from '../components/Anmeldelse'

// Forside (palmy_handoff): hero + infobånd (Skilt) · retkort · billedrulle ·
// hele menukortet · sådan bestiller du · familien og anmeldelser · tekstbånd og
// grøn afslutning (Footer).
// Retkort med Palmys egne fotos (palmy_handoff BILLEDER.md: nr. 2, 3 og 6).
const DISH_CARDS = [
  { number: '2', image: 'foraarsruller', category: 'Forret' },
  { number: '3', image: 'nudler', category: 'Hovedret' },
  { number: '6', image: 'and', category: 'Hovedret' },
]

function Home() {
  return (
    <Layout sign="full">
      <section aria-labelledby="frister-titel" className="pt-14 md:pt-20">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <p className="eyebrow text-red">{hero.dishesLabel}</p>
            <h2 id="frister-titel" className="mt-3 font-serif text-xl leading-tight text-green">
              {hero.dishesHeading}
            </h2>
          </div>
          <Link to="/menu" className="text-link">
            {hero.dishesLink} <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <ul className="dish-grid mt-8">
          {DISH_CARDS.map(({ number, image, category }) => {
            const dish = dishesByNumber.get(number)
            return (
              <li key={number} className="reveal">
                <div className="dish-photo">
                  <Picture
                    id={image}
                    sizes="(min-width: 1080px) 340px, (min-width: 700px) 33vw, 100vw"
                    className="block h-full w-full object-contain"
                  />
                </div>
                <p className="eyebrow mt-4 text-red">
                  Nr. {number} · {category}
                </p>
                <p className="mt-2 font-serif text-md leading-snug text-green">{dish.name}</p>
                <p className="price mt-1">{formatKr(dish.price)}</p>
              </li>
            )
          })}
        </ul>
      </section>

      <section aria-labelledby="rulle-titel" className="pt-16 md:pt-24">
        <p className="eyebrow text-red">{shared.rollLabel}</p>
        <h2 id="rulle-titel" className="mt-3 font-serif text-xl leading-tight text-green">
          {shared.rollHeading}
        </h2>
        <div className="mt-8">
          <BilledRulle label={shared.rollHeading} />
        </div>
      </section>

      <div className="pt-6 md:pt-10">
        <MenuSections variant="forside" />
      </div>

      <section aria-labelledby="bestil-titel" className="steps mt-16 md:mt-24">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <p className="eyebrow text-red">{steps.eyebrow}</p>
            <h2 id="bestil-titel" className="mt-3 font-serif text-xl leading-tight text-green">
              {steps.heading}
            </h2>
          </div>
          <a href={`tel:${business.phoneHref}`} className="btn no-underline">
            {shared.ringCta} · <span className="tabular-nums">{business.phoneDisplay}</span>
          </a>
        </div>
        <ol className="steps-grid mt-10">
          {steps.items.map((text, i) => (
            <li key={text}>
              <span className="dish-number font-serif italic text-red">{i + 1}</span>
              <p className="mt-3 text-md leading-desc">{text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-(--col-text) border-l-2 border-gold pl-3 leading-desc text-muted">{steps.note}</p>
      </section>

      <section aria-labelledby="familie-titel" className="split mt-16 md:mt-24">
        <div>
          <p className="eyebrow text-red">{google.heading}</p>
          <h2 id="familie-titel" className="mt-3 font-serif text-xl leading-tight text-green">
            {reviewText.summary(google)}
          </h2>
          <p className="mt-6 max-w-(--col-text) text-md leading-relaxed">
            {home.family}{' '}
            <Link to="/historien">{home.familyLink}</Link>
          </p>
        </div>
        <div>
          {reviewsWithText.slice(0, 2).map((review) => (
            <Anmeldelse key={review.name} review={review} variant="forside" />
          ))}
          <Link to="/anmeldelser" className="text-link">
            {home.allReviews} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default Home

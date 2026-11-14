import { google, hero, home, reviewText, reviewsWithText } from '../content'
import { dishesByNumber, formatKr } from '../data/menu'
import Picture from '../components/Picture'
import Layout from '../components/Layout'
import Link from '../components/Link'
import MenuSections from '../components/menu/MenuSections'
import Anmeldelse from '../components/Anmeldelse'

// Forside — hovedperson: menuen (DESIGN.md "Sektionsplan"):
// 1 skiltet (Layout) · 2 sticky kategori-nav · 3 hele menukortet med karryfoto
// · 4 to-tre linjer om Thi og Nam · 5 anmeldelse 1 og 2 · 6 footer.
// Retkort med Palmys egne fotos (palmy_handoff BILLEDER.md: nr. 2, 3 og 6).
const DISH_CARDS = [
  { number: '2', image: 'foraarsruller', category: 'Forret' },
  { number: '3', image: 'nudler', category: 'Hovedret' },
  { number: '6', image: 'and', category: 'Hovedret' },
]

function Home() {
  return (
    <Layout sign="full" column="wide">
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

      <MenuSections variant="forside" />

      <p className="max-w-(--col-text) pt-14 text-md leading-relaxed md:pt-16">
        {home.family}{' '}
        <Link to="/historien" className="text-base">
          {home.familyLink}
        </Link>
      </p>

      <section className="max-w-(--col-text) pt-10 leading-relaxed">
        <p className="mb-5 font-bold">{reviewText.summary(google)}</p>
        {reviewsWithText.slice(0, 2).map((review) => (
          <Anmeldelse key={review.name} review={review} variant="forside" />
        ))}
        <Link to="/anmeldelser">{home.allReviews}</Link>
      </section>
    </Layout>
  )
}

export default Home

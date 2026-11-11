import { google, home, reviewText, reviewsWithText } from '../content'
import Layout from '../components/Layout'
import Link from '../components/Link'
import MenuSections from '../components/menu/MenuSections'
import Anmeldelse from '../components/Anmeldelse'

// Forside — hovedperson: menuen (DESIGN.md "Sektionsplan"):
// 1 skiltet (Layout) · 2 sticky kategori-nav · 3 hele menukortet med karryfoto
// · 4 to-tre linjer om Thi og Nam · 5 anmeldelse 1 og 2 · 6 footer.
function Home() {
  return (
    <Layout sign="full" column="wide">
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

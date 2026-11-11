import { anmeldelser, google, reviewText, reviewsWithText } from '../content'
import Layout from '../components/Layout'
import Anmeldelse from '../components/Anmeldelse'
import SideTitel from '../components/SideTitel'

// /anmeldelser — typografi som hovedperson: citaterne store (28/1.35), navn
// under, Palmys svar med en tynd streg. Ingen datoer, stjerner eller karrusel.
const withoutText = google.reviews.filter((r) => !r.text).map((r) => r.name)

function Anmeldelser() {
  return (
    <Layout>
      <SideTitel>{anmeldelser.heading}</SideTitel>
      <p className="mt-(--sign-info-gap) font-bold">{reviewText.summary(google)}</p>

      {reviewsWithText.map((review) => (
        <Anmeldelse key={review.name} review={review} variant="side" />
      ))}

      {withoutText.length > 0 && <p className="mt-6">{anmeldelser.alsoRated(withoutText)}</p>}
      <p className="mt-6">
        <a href={google.url} target="_blank" rel="noopener">
          {anmeldelser.writeReview}
        </a>
      </p>
    </Layout>
  )
}

export default Anmeldelser

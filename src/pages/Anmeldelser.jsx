import { anmeldelser, google, reviewText, reviewsWithText } from '../content'
import Layout from '../components/Layout'
import Anmeldelse from '../components/Anmeldelse'
import SideTitel from '../components/SideTitel'

// /anmeldelser: kilde og score fra eksisterende data, citaterne i serif.
const withoutText = google.reviews.filter((r) => !r.text).map((r) => r.name)

function Anmeldelser() {
  return (
    <Layout>
      <SideTitel eyebrow={anmeldelser.eyebrow}>{anmeldelser.heading}</SideTitel>
      <p className="mt-5 font-serif text-lead">{reviewText.summary(google)}</p>
      <div className="max-w-(--col-text)">
        {reviewsWithText.map((review) => (
          <Anmeldelse key={review.name} review={review} variant="side" />
        ))}
        {withoutText.length > 0 && <p className="mt-8 text-md">{anmeldelser.alsoRated(withoutText)}</p>}
        <p className="mt-8">
          <a href={google.url} target="_blank" rel="noopener" className="text-link">
            {anmeldelser.writeReview} <span aria-hidden="true">↗</span>
          </a>
        </p>
      </div>
    </Layout>
  )
}

export default Anmeldelser

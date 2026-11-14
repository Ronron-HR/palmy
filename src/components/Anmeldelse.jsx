import { reviewText } from '../content'

// Én anmeldelse, ordret fra Google (content.js). Ingen datoer eller stjerner.
// variant "forside": mindre citat · "side": stort serif-citat.
function Anmeldelse({ review, variant = 'forside' }) {
  const side = variant === 'side'
  return (
    <figure className={`review m-0 ${side ? 'mt-10 pb-10' : 'pb-8'}`}>
      <blockquote className={`m-0 font-serif text-green ${side ? 'review-quote-lg' : 'review-quote'}`}>
        “{review.text}”
      </blockquote>
      <figcaption className="eyebrow mt-4 text-red">
        {review.name} · {reviewText.source}
      </figcaption>
      {review.reply && (
        <p className="mt-3 border-l-2 border-gold pl-3 text-muted">
          {reviewText.replyPrefix} “{review.reply}”
        </p>
      )}
    </figure>
  )
}

export default Anmeldelse

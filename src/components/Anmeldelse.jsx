import { reviewText } from '../content'

// Én anmeldelse (KOMPONENTER.md §7). Ingen datoer, ingen stjerner, ingen
// karrusel. Teksten er ordret fra Google (content.js).
// - variant "forside": citat 17/1.5, "Navn, Google" 6 under.
// - variant "side":    citat 28/1.35, navn 17/700, streg under.
function Anmeldelse({ review, variant = 'forside' }) {
  const side = variant === 'side'
  return (
    <figure className={side ? 'mt-10 border-b border-line pb-10' : 'mb-(--review-gap) leading-relaxed'}>
      <blockquote className={side ? 'text-lg leading-info' : ''}>“{review.text}”</blockquote>
      <figcaption className={side ? 'mt-(--review-name-gap-side) font-bold' : 'mt-(--review-name-gap)'}>
        {side ? review.name : `${review.name}, ${reviewText.source}`}
      </figcaption>
      {review.reply && (
        <p className={`border-l border-line pl-3 ${side ? 'mt-(--review-reply-gap-side)' : 'mt-2'}`}>
          {reviewText.replyPrefix} “{review.reply}”
        </p>
      )}
    </figure>
  )
}


export default Anmeldelse

import { google } from '../content'
import Stars from './Stars'
import Link from './Link'
import { useReplay } from '../hooks/useReplay'

// Lange anmeldelser sættes i brødtekstskriften (læsbart); korte i display-skriften.
const quoteClass = (text) =>
  text.length > 140
    ? 'text-lg font-medium leading-relaxed text-fg sm:text-xl'
    : 'text-balance text-2xl font-bold leading-tight text-fg sm:text-3xl'

// Gennemsnittet som et stort tal — samme sprog som menunumrene og tidtavlen.
export function Rating({ className = '' }) {
  return (
    <div className={className}>
      <p className="overflow-hidden py-1 font-display text-[clamp(7rem,4rem+14vw,13rem)] leading-[0.88] tabular-nums text-signal">
        <span className="rise">{google.rating}</span>
      </p>
      <div className="mt-4 flex items-center gap-3">
        <Stars className="h-5 w-5" animated delay={120} />
        <p className="text-base font-semibold">
          på Google, {google.count} anmeldelser
        </p>
      </div>
    </div>
  )
}

function Review({ review, delay = 0 }) {
  return (
    <figure>
      <Stars animated delay={delay} />
      <blockquote
        className={`fade mt-4 ${quoteClass(review.text)}`}
        style={{ '--d': `${delay + 140}ms` }}
      >
        {review.text}
      </blockquote>
      <figcaption className="label fade mt-4" style={{ '--d': `${delay + 220}ms` }}>
        {review.name}
      </figcaption>
      {review.reply && (
        <p
          className="fade mt-5 border-l-2 border-signal pl-4 text-base leading-relaxed text-muted"
          style={{ '--d': `${delay + 300}ms` }}
        >
          <span className="font-semibold text-fg">Svar fra Palmy:</span> {review.reply}
        </p>
      )}
    </figure>
  )
}

// Gæsternes egne Google-anmeldelser, ordret, med navn som de står på Google.
//  - variant "teaser": forsiden — gennemsnittet og de to anmeldelser med tekst,
//    med link til /anmeldelser. Sektionen er målet for heroens scroll-vink.
//  - variant "full": /anmeldelser — alle fire (de to uden tekst samles i én linje,
//    så der ikke opstår tomme kort) og knapper til Google.
// Alt hentes fra content.js (`google`).
function AnmeldelserBlok({ variant = 'teaser' }) {
  const withText = google.reviews.filter((r) => r.text)
  const ratingOnly = google.reviews.filter((r) => !r.text)
  const teaser = variant === 'teaser'
  // Animationerne starter forfra, hver gang sektionen kommer tilbage i billedet.
  const [ref, plays] = useReplay()

  return (
    <section
      ref={ref}
      id="anmeldelser"
      aria-labelledby="anmeldelser-titel"
      className="theme-sand bg-bg text-fg"
    >
      <div key={plays} className="section-y mx-auto max-w-6xl px-4 sm:px-6">
        {teaser ? (
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 id="anmeldelser-titel" className="font-display text-h2 text-fg">
                {google.heading}
              </h2>
              <Rating className="mt-8" />
            </div>
            <div className="flex flex-col gap-10 lg:col-span-7">
              <Review review={withText[0]} delay={100} />
              <div className="border-t border-line pt-8">
                <Review review={withText[1]} delay={380} />
              </div>
            </div>
          </div>
        ) : (
          <>
            <h2 id="anmeldelser-titel" className="sr-only">
              {google.heading}
            </h2>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Review review={withText[0]} />
              </div>
              <div className="flex flex-col gap-10 lg:col-span-5">
                {withText.slice(1).map((review) => (
                  <Review key={review.name} review={review} />
                ))}
                {ratingOnly.length > 0 && (
                  <div className="border-t border-line pt-6">
                    <Stars />
                    <p className="mt-3 text-base leading-relaxed text-muted">
                      {ratingOnly.map((r) => r.name).join(' og ')} gav begge 5 for mad og service.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-1">
          {teaser ? (
            <Link to="/anmeldelser" className="tlink">
              Læs alle anmeldelser
            </Link>
          ) : (
            <a href={google.url} target="_blank" rel="noopener noreferrer" className="tlink">
              Skriv en anmeldelse på Google <span className="sr-only">(åbner i nyt vindue)</span>
            </a>
          )}
          {teaser && (
            <a href={google.url} target="_blank" rel="noopener noreferrer" className="tlink">
              Skriv en anmeldelse <span className="sr-only">(åbner i nyt vindue)</span>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

export default AnmeldelserBlok

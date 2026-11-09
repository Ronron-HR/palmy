import { historie } from '../content'
import Link from './Link'
import Picture from './Picture'

// Kort indgang til /historien: billedet af spisesalen til venstre (menuen har
// titlen til venstre, så kompositionen vendes), familiens første kapitel og det
// store citat om drømmen til højre — citatet er sektionens eneste røde linje.
function HistorieTeaser() {
  const [first, pause] = historie.chapters

  return (
    <section
      id="historie"
      aria-labelledby="historie-titel"
      className="theme-ink bg-bg text-fg"
    >
      <div className="section-y mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <Picture
            id="spisesal"
            sizes="(min-width: 1024px) 440px, 100vw"
            className="aspect-[4/5] w-full object-cover object-[50%_35%]"
          />
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <h2 id="historie-titel" className="font-display text-h2 text-fg">
            {historie.heading}
          </h2>
          <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-muted">
            {first.text}
          </p>
          <blockquote className="mt-8 font-display text-[clamp(1.9rem,1.2rem+2.7vw,3.4rem)] leading-[1.02] text-signal">
            {pause.quote}
          </blockquote>
          <Link to="/historien" className="tlink mt-7">
            Læs hele historien
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HistorieTeaser

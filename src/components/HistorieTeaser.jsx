import { historie } from '../content'
import Link from './Link'
import Picture from './Picture'

// Kort indgang til /historien: familiens første kapitel, det store citat om
// drømmen, og to billeder lagt ind over hinanden (spisesalen og karryen).
function HistorieTeaser() {
  const [first, pause] = historie.chapters

  return (
    <section id="historie" aria-labelledby="historie-titel" className="leaf-bg bg-bg">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:gap-20">
        <div className="order-2 lg:col-span-6">
          {/* Collage: spisesalen som stort billede, karryen lagt over i hjørnet. */}
          <div className="relative pb-16 sm:pb-24">
            <Picture
              id="spisesal"
              sizes="(min-width: 1024px) 420px, 80vw"
              className="aspect-[4/5] w-[78%] rounded-sm object-cover object-[50%_35%]"
            />
            <Picture
              id="karry"
              sizes="(min-width: 1024px) 260px, 50vw"
              className="absolute bottom-0 right-0 aspect-square w-[54%] rounded-sm object-cover ring-[10px] ring-bg"
            />
          </div>
        </div>

        <div className="order-1 lg:col-span-6">
          <h2 id="historie-titel" className="font-display text-5xl leading-[1.02] text-fg sm:text-6xl">
            {historie.heading}
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">{first.text}</p>
          <blockquote className="mt-8 max-w-lg border-l-2 border-brass pl-5 font-display text-2xl leading-snug text-fg sm:text-3xl">
            {pause.quote}
          </blockquote>
          <Link
            to="/historien"
            className="press mt-9 inline-flex min-h-12 items-center justify-center rounded-full border border-fg/50 px-6 py-3 text-base font-semibold text-fg hover:bg-fg/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
          >
            Læs hele historien
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HistorieTeaser

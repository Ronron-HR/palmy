import { SECTIONS, getDishesBySection } from '../data/menu'
import { menuInfo } from '../content'
import Link from './Link'
import Picture from './Picture'
import RingKnap from './RingKnap'

// Forsidens vej ind til menuen: kategorierne som en stor, tryk-venlig liste.
// Kategorier og "fra"-priser afledes af data/menu.ts — intet hardcodes her, så
// forsiden aldrig kan skride fra menukortet. Selve menuen bor på /menu.
const sections = SECTIONS.filter((s) => getDishesBySection(s.id).length > 0)

function fromPrice(sectionId) {
  const prices = getDishesBySection(sectionId).flatMap((d) =>
    d.price != null ? [d.price] : (d.variants ?? []).map((v) => v.price),
  )
  return prices.length ? Math.min(...prices) : null
}

function MenuIndgang() {
  return (
    <section id="menu" aria-labelledby="menu-titel" className="theme-ivory bg-bg text-fg">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 id="menu-titel" className="font-display text-5xl leading-none text-fg sm:text-6xl">
            Menukort
          </h2>
          <p className="mt-4 max-w-md text-muted">{menuInfo.numberNote}</p>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {sections.map((section) => {
              const from = fromPrice(section.id)
              return (
                <li key={section.id}>
                  <Link
                    to={`/menu#kort-${section.id}`}
                    className="group flex items-baseline justify-between gap-4 py-5 sm:py-6"
                  >
                    <span className="font-display text-3xl leading-none text-fg transition-colors group-hover:text-brass sm:text-4xl">
                      {section.title}
                    </span>
                    <span className="shrink-0 text-sm tabular-nums text-muted">
                      {from != null && <>fra {from} kr</>}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <Link
              to="/menu"
              className="press inline-flex min-h-12 items-center justify-center rounded-full bg-fg px-6 py-3 text-base font-semibold text-bg hover:bg-fg/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
            >
              Se hele menukortet
            </Link>
            <RingKnap variant="outline">Ring og bestil</RingKnap>
          </div>
        </div>

        {/* Billedet følger efter listen på mobil, og står ved siden af på desktop. */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <Picture
              id="karry"
              sizes="(min-width: 1024px) 440px, 100vw"
              className="aspect-[4/3] w-full rounded-sm object-cover lg:aspect-[4/5]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MenuIndgang

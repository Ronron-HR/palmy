import { SECTIONS, getDishesBySection, dishesByNumber } from '../data/menu'
import { forsideRetter, menuInfo } from '../content'
import Link from './Link'
import DishCard from './menu/DishCard'

// Forsidens menu. Alt hentes fra data/menu.ts — intet hardcodes her, så forsiden
// aldrig kan skride fra menukortet. Hele kortet bor på /menu.
//
//  1. Et udpluk af retter som store numre (samme DishCard som /menu). AFVENTER
//     VERIFICERING mod det trykte kort: vises kun i dev, indtil
//     `forsideRetter.verificeret` er true (se content.js).
//  2. Kategorierne med deres numre ("nr. 3–13, 18–21") og laveste pris — sektionen
//     er komplet uden retfotos og uden udpluk.
const sections = SECTIONS.filter((s) => getDishesBySection(s.id).length > 0)

function fromPrice(sectionId) {
  const prices = getDishesBySection(sectionId).flatMap((d) =>
    d.price != null ? [d.price] : (d.variants ?? []).map((v) => v.price),
  )
  return prices.length ? Math.min(...prices) : null
}

// Sektionens numre som intervaller ("1–2", "3–13, 18–21"). Kun visning — selve
// numrene i data røres aldrig.
function numberRange(sectionId) {
  const raw = getDishesBySection(sectionId)
    .map((d) => d.number)
    .filter((n) => n != null)
  if (raw.length === 0) return null
  const nums = raw.map(Number)
  if (nums.some(Number.isNaN)) return raw.join(', ')
  nums.sort((a, b) => a - b)
  const ranges = []
  for (const n of nums) {
    const last = ranges[ranges.length - 1]
    if (last && n === last[1] + 1) last[1] = n
    else ranges.push([n, n])
  }
  return ranges.map(([a, b]) => (a === b ? `${a}` : `${a}–${b}`)).join(', ')
}

const label = 'label text-muted'

function MenuIndgang() {
  const showDishes = forsideRetter.verificeret || import.meta.env.DEV
  const featured = forsideRetter.numre.map((n) => dishesByNumber.get(n)).filter(Boolean)

  return (
    <section id="menu" aria-labelledby="menu-titel" className="theme-paper bg-bg text-fg">
      <div className="section-y mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="menu-titel" className="font-display text-h2 text-fg">
              Menukort
            </h2>
            <p className="mt-4 max-w-sm text-muted">{menuInfo.numberNote}</p>
            <Link to="/menu" className="tlink mt-5">
              Se hele menukortet
            </Link>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-8">
          {showDishes && featured.length > 0 && (
            <div>
              {!forsideRetter.verificeret && (
                <p className="mb-5 border border-dashed border-chili px-4 py-3 text-sm font-semibold text-chili">
                  Afventer verificering mod det trykte menukort — vises kun lokalt, ikke på
                  den offentlige side.
                </p>
              )}
              <p className={label}>Et udpluk fra kortet</p>
              <ul className="mt-2 divide-y divide-line border-y border-line">
                {featured.map((dish) => (
                  <li key={dish.id}>
                    <DishCard dish={dish} />
                  </li>
                ))}
              </ul>
              <p className={`${label} mt-12`}>Hele kortet</p>
            </div>
          )}

          {/* Kategorierne som menutavlens rækker: titlen i skiltets skrift, numrene
              og laveste pris under. Fuldt omrids vendes om ved hover (blæk/papir). */}
          <ul className={`divide-y divide-line border-y border-line ${showDishes ? 'mt-2' : ''}`}>
            {sections.map((section) => {
              const from = fromPrice(section.id)
              const range = numberRange(section.id)
              return (
                <li key={section.id}>
                  <Link
                    to={`/menu#kort-${section.id}`}
                    className="group block py-5 transition-colors hover:bg-fg hover:text-bg sm:-mx-4 sm:px-4 sm:py-6"
                  >
                    <span className="block font-display text-[clamp(2.4rem,1.3rem+4.6vw,4.5rem)] leading-none">
                      {section.title}
                    </span>
                    <span className="mt-2 flex flex-wrap gap-x-5 text-sm tabular-nums">
                      {range && (
                        <span className="font-semibold text-signal group-hover:text-bg">
                          nr. {range}
                        </span>
                      )}
                      {from != null && (
                        <span className="text-muted group-hover:text-bg">fra {from} kr</span>
                      )}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default MenuIndgang

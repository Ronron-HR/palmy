import { business, hours } from '../content'
import { SECTIONS, getDishesBySection } from '../data/menu'
import RingKnap from './RingKnap'
import SectionHeader from './menu/SectionHeader'
import DishCard from './menu/DishCard'

// Forsidens menu er hele menukortet: alle sektioner ligger fremme, der er
// intet at klikke ud og intet link videre. Retterne renderes med samme
// DishCard som /menu og print-versionen — beskrivelse, valg-linje og fulde
// prislinjer — så de tre visninger aldrig kan skride fra hinanden.
function Menu() {
  return (
    <section id="menu" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center font-display text-3xl font-semibold text-green-deep sm:text-4xl">
          Menu
        </h2>

        <div className="mt-12">
          {SECTIONS.map((section) => {
            const sectionDishes = getDishesBySection(section.id)
            if (sectionDishes.length === 0) return null

            return (
              <div key={section.id} className="mb-10">
                <SectionHeader title={section.title} note={section.note} />
                <div className="divide-y divide-gold/20">
                  {sectionDishes.map((dish) => (
                    <DishCard key={`${dish.section}-${dish.number ?? dish.name}`} dish={dish} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-green-deep/80">Klar til at bestille?</p>
          <RingKnap variant="green" className="mt-4 px-8 py-4 text-lg">
            Ring og bestil – {business.phoneDisplay}
          </RingKnap>
          <p className="mt-3 text-sm text-green-deep/60">
            Vi tager imod bestillinger {hours.days.toLowerCase()} kl. {hours.time}.
          </p>
          <p className="mt-1 text-sm text-green-deep/60">{hours.preorderNote}</p>
        </div>
      </div>
    </section>
  )
}

export default Menu

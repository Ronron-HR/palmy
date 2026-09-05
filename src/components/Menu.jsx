import { business, hours } from '../content'
import { SECTIONS, getDishesBySection, getDisplayPrice, formatChoicesQuestion } from '../data/menu'
import RingKnap from './RingKnap'
import NumberBadge from './menu/NumberBadge'

function DishRow({ dish }) {
  return (
    <div className="flex items-start gap-3 py-4">
      <NumberBadge number={dish.number} />
      <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <span className="text-green-deep">{dish.name}</span>
          {dish.choices && (
            <p className="mt-0.5 text-sm text-green-deep/70">
              Vælg: {formatChoicesQuestion(dish.choices)}
            </p>
          )}
          {dish.note && <p className="mt-0.5 text-sm italic text-green-deep/60">{dish.note}</p>}
        </div>
        <span className="whitespace-nowrap font-medium text-green-deep">
          {getDisplayPrice(dish)}
        </span>
      </div>
    </div>
  )
}

function DishList({ dishes }) {
  return (
    <div className="divide-y divide-gold/30">
      {dishes.map((dish) => (
        <DishRow key={`${dish.section}-${dish.number ?? dish.name}`} dish={dish} />
      ))}
    </div>
  )
}

function Menu() {
  return (
    <section id="menu" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center font-display text-3xl font-semibold text-green-deep sm:text-4xl">
          Menu
        </h2>

        {/* Hele menukortet ligger fremme — ingen sektioner at klikke ud, og
            intet link videre til /menu. Kunden skal kunne læse hver ret med
            det samme. */}
        <div className="mt-12 divide-y divide-gold/30">
          {SECTIONS.map(({ id, title, note }) => {
            const sectionDishes = getDishesBySection(id)
            if (sectionDishes.length === 0) return null

            return (
              <div key={id} className="py-6">
                <h3 className="font-display text-xl font-semibold text-green-deep">{title}</h3>
                {note && <p className="mt-1 text-sm italic text-green-deep/60">{note}</p>}
                <div className="mt-2">
                  <DishList dishes={sectionDishes} />
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
        </div>
      </div>
    </section>
  )
}

export default Menu

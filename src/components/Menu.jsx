import { business, hours } from '../content'
import { SECTIONS, getDishesBySection, getDisplayPrice, formatChoicesQuestion } from '../data/menu'
import RingKnap from './RingKnap'
import NumberBadge from './menu/NumberBadge'
import Link from './Link'

function ChevronIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

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

        <div className="mt-12 divide-y divide-gold/30">
          {SECTIONS.map(({ id, title }, index) => (
            <details key={id} name="menu-category" open={index === 0} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="font-display text-xl font-semibold text-green-deep">
                  {title}
                </span>
                <ChevronIcon className="h-4 w-4 flex-shrink-0 text-green-deep transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="pt-4">
                <DishList dishes={getDishesBySection(id)} />
              </div>
            </details>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-green-deep/80">Klar til at bestille?</p>
          <RingKnap variant="green" className="mt-4 px-8 py-4 text-lg">
            Ring og bestil – {business.phoneDisplay}
          </RingKnap>
          <p className="mt-3 text-sm text-green-deep/60">
            Vi tager imod bestillinger {hours.days.toLowerCase()} kl. {hours.time}.
          </p>
          <Link
            to="/menu"
            className="mt-4 inline-block text-sm font-medium text-green-deep/70 underline decoration-gold/50 underline-offset-4 hover:text-green-deep"
          >
            Se hele menukortet →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Menu

import { menu, business, hours } from '../content'

const categories = [
  { key: 'forretter', title: 'Forretter' },
  { key: 'hovedretter', title: 'Hovedretter' },
  { key: 'ekstraRetter', title: 'Ekstra retter' },
  { key: 'boernemenu', title: 'Børnemenu' },
  { key: 'drikkevarer', title: 'Drikkevarer' },
  { key: 'tilbehoer', title: 'Tilbehør' },
]

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
    <div className="flex items-center gap-4 py-4">
      <div className="flex flex-1 items-baseline justify-between gap-4">
        <span className="text-green-deep">{dish.navn}</span>
        <span className="whitespace-nowrap font-medium text-green-deep">{dish.pris}</span>
      </div>
    </div>
  )
}

function DishList({ dishes }) {
  return (
    <div className="divide-y divide-gold/30">
      {dishes.map((dish) => (
        <DishRow key={dish.navn} dish={dish} />
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
          {categories.map(({ key, title }, index) => (
            <details key={key} name="menu-category" open={index === 0} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="font-display text-xl font-semibold text-green-deep">
                  {title}
                </span>
                <ChevronIcon className="h-4 w-4 flex-shrink-0 text-green-deep transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="pt-4">
                <DishList dishes={menu[key]} />
              </div>
            </details>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-green-deep/80">Klar til at bestille?</p>
          <a
            href={`tel:${business.phone}`}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-green-deep px-8 py-4 text-lg font-semibold text-cream transition-colors hover:bg-green-deep-light"
          >
            Ring og bestil – {business.phoneDisplay}
          </a>
          <p className="mt-3 text-sm text-green-deep/60">
            Vi tager imod bestillinger {hours.days.toLowerCase()} kl. {hours.time}.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Menu

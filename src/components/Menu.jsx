import { menu } from '../content'

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
      {dish.billede && (
        <>
          {/* PLADSHOLDER — udskiftes når rigtige fotos er taget */}
          <img
            src={dish.billede}
            alt=""
            loading="lazy"
            className="h-16 w-16 flex-shrink-0 rounded-lg object-cover shadow-sm sm:h-20 sm:w-20"
          />
        </>
      )}
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

        <p className="mt-16 text-center text-lg text-green-deep/80">
          Ring og bestil – vi tager imod bestillinger fra kl. 16.00.
        </p>
      </div>
    </section>
  )
}

export default Menu

import { SECTIONS, getDishesBySection } from '../data/menu'
import SectionHeader from '../components/menu/SectionHeader'
import DishCard from '../components/menu/DishCard'
import Link from '../components/Link'

// Kundemenu — offentlig side. Renderes udelukkende ud fra data/menu.ts,
// i fast sektionsrækkefølge (aldrig sorteret på menunummer).
function MenuPage() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <h1 className="font-display text-4xl font-semibold text-green-deep sm:text-5xl">
            Menukort
          </h1>
          <p className="mt-3 text-green-deep/70">Palmy Spisested — vietnamesisk mad</p>
        </div>

        <div className="mt-12 columns-1 gap-x-12 md:columns-2 [&>*]:break-inside-avoid">
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

        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <Link
            to="/"
            className="text-sm font-medium text-green-deep/70 underline decoration-gold/50 underline-offset-4 hover:text-green-deep"
          >
            ← Tilbage til forsiden
          </Link>
          <Link
            to="/menu/print"
            className="text-xs text-green-deep/40 hover:text-green-deep/70"
          >
            Print-venlig version
          </Link>
        </div>
      </div>
    </section>
  )
}

export default MenuPage

import { business, hours, menuInfo } from '../content'
import RingKnap from './RingKnap'
import MenuSections from './menu/MenuSections'

// Forsidens menu er hele menukortet: alle sektioner ligger fremme. Retterne
// renderes med samme MenuSections/DishCard som /menu (og DishCard i print),
// så visningerne aldrig kan skride fra hinanden.
function Menu() {
  return (
    <section id="menu" aria-labelledby="menu-titel" className="bg-cream pb-16 pt-2 sm:pb-24 sm:pt-4">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 [&>*]:max-w-3xl">
        <h2
          id="menu-titel"
          className="font-display text-3xl font-semibold tracking-[-0.01em] text-green-deep sm:text-4xl"
        >
          Menukort
        </h2>
        <p className="mt-3 max-w-xl text-sm text-green-deep/75">{menuInfo.numberNote}</p>

        <div className="mt-6">
          <MenuSections idPrefix="menu" />
        </div>

        <div className="mt-6 border-t border-green-deep/10 pt-8">
          <p className="font-display text-xl font-semibold text-green-deep">Klar til at bestille?</p>
          <p className="mt-1 text-sm text-green-deep/75">
            Vi tager imod bestillinger {hours.daysLong} kl.&nbsp;{hours.time}.
          </p>
          <RingKnap variant="green" className="mt-4">
            Ring {business.phoneDisplay}
          </RingKnap>
        </div>
      </div>
    </section>
  )
}

export default Menu

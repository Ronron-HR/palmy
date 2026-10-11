import { business, hours, menuInfo } from '../content'
import MenuSections from '../components/menu/MenuSections'
import RingKnap from '../components/RingKnap'
import Link from '../components/Link'

// Kundemenu — offentlig side. Renderes udelukkende ud fra data/menu.ts,
// i fast sektionsrækkefølge (aldrig sorteret på menunummer).
function MenuPage() {
  return (
    <main id="indhold" className="bg-cream pb-16 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 [&>*]:max-w-3xl">
        <h1 className="font-display text-4xl font-semibold tracking-[-0.015em] text-green-deep sm:text-5xl">
          Menukort
        </h1>
        <p className="mt-3 max-w-xl text-green-deep/80">
          Ring på{' '}
          <a
            href={`tel:${business.phoneHref}`}
            className="font-semibold text-green-deep underline decoration-gold/60 underline-offset-4"
          >
            {business.phoneDisplay}
          </a>{' '}
          og bestil til afhentning – {hours.daysLong}{' '}
          <span className="whitespace-nowrap">kl. {hours.time}</span>.
        </p>
        <p className="mt-2 max-w-xl text-sm text-green-deep/75">{menuInfo.numberNote}</p>

        <div className="mt-6">
          <MenuSections idPrefix="kort" headingLevel={2} />
        </div>

        <div id="bestil" className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-green-deep/10 pt-8">
          <RingKnap variant="green">
            Ring {business.phoneDisplay}
          </RingKnap>
          <div className="flex gap-5 text-sm">
            <Link
              to="/"
              className="text-green-deep/75 underline decoration-gold/60 underline-offset-4 hover:text-green-deep"
            >
              Til forsiden
            </Link>
            <Link
              to="/menu/print"
              className="text-green-deep/75 underline decoration-gold/60 underline-offset-4 hover:text-green-deep"
            >
              Printvenlig udgave
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MenuPage

import { business, hours, menuInfo } from '../content'
import Layout from '../components/Layout'
import MenuSections from '../components/menu/MenuSections'
import LoopVideo from '../components/LoopVideo'
import AabenStatus from '../components/AabenStatus'
import RingKnap from '../components/RingKnap'
import Link from '../components/Link'
import { useOpenStatus } from '../hooks/useOpenStatus'

// Kundemenu — hele menukortet. Renderes udelukkende ud fra data/menu.ts, i fast
// sektionsrækkefølge (aldrig sorteret på menunummer). På desktop står en
// "Ring og bestil"-rude fast ved siden af menuen, så man kan ringe, mens man læser.
function MenuPage() {
  const status = useOpenStatus()

  return (
    <Layout>
      <header className="relative isolate overflow-hidden border-b border-line">
        <LoopVideo
          id="karrySimrer"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-50"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/55 to-bg/25"
        />
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-32">
          <h1 className="font-display text-6xl leading-none text-fg sm:text-8xl">Menukort</h1>
          <p className="mt-5 max-w-md text-lg text-fg/85">{menuInfo.numberNote}</p>
        </div>
      </header>

      <div className="theme-ivory bg-bg text-fg">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-2 sm:px-6 sm:pb-24 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-8">
          <MenuSections idPrefix="kort" headingLevel={2} />
        </div>

        <aside id="bestil" aria-label="Bestil" className="lg:col-span-4">
          <div className="rounded-sm border border-line bg-surface p-6 lg:sticky lg:top-24">
            <AabenStatus className="mb-4" />
            <a
              href={`tel:${business.phoneHref}`}
              className="inline-flex min-h-11 items-center font-display text-4xl leading-none tabular-nums text-fg hover:text-brass"
            >
              {business.phoneDisplay}
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Al bestilling sker over telefonen — nævn nummeret fra kortet.
              <br />
              Åbent {hours.daysLong} kl.&nbsp;{hours.time}. {hours.preorderLine}
            </p>
            <RingKnap variant="cta" className="mt-5 w-full">
              {status.cta}
            </RingKnap>
            <Link
              to="/menu/print"
              className="mt-4 inline-flex min-h-11 items-center text-sm text-muted underline decoration-brass underline-offset-[6px] hover:text-fg"
            >
              Printvenlig udgave
            </Link>
          </div>
        </aside>
      </div>
      </div>
    </Layout>
  )
}

export default MenuPage

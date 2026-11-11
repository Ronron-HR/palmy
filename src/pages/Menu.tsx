import { business, hours, menuInfo } from '../content'
import Layout from '../components/Layout'
import MenuSections from '../components/menu/MenuSections'
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
    <Layout column="wide" menuPage>
      <header className="theme-ink bg-bg text-fg">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-20">
          <h1 className="font-display text-h1 text-fg">Menukort</h1>
          <p className="mt-5 max-w-md text-lg text-muted">{menuInfo.numberNote}</p>
        </div>
      </header>

      <div className="theme-paper bg-bg text-fg">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-0 sm:px-6 sm:pb-24 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-8">
          <MenuSections idPrefix="kort" headingLevel={2} />
        </div>

        <aside id="bestil" aria-label="Bestil" className="lg:col-span-4">
          <div className="theme-red bg-bg p-6 text-fg lg:sticky lg:top-40">
            <AabenStatus className="mb-4" />
            <a
              href={`tel:${business.phoneHref}`}
              className="inline-flex min-h-11 items-center font-display text-[clamp(2.6rem,2rem+2vw,3.4rem)] leading-none tabular-nums text-fg"
            >
              {business.phoneDisplay}
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Al bestilling sker over telefonen — nævn nummeret fra kortet.
              <br />
              Åbent {hours.daysLong} kl.&nbsp;{hours.time}. {hours.preorderLine}
            </p>
            <RingKnap className="mt-5 w-full">{status.cta}</RingKnap>
            <Link to="/menu/print" className="tlink mt-3">
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

import { billeder } from '../content'
import Layout from '../components/Layout'
import Galleri from '../components/Galleri'
import RingKnap from '../components/RingKnap'
import Link from '../components/Link'

function Billeder() {
  return (
    <Layout>
      <div className="theme-ink bg-bg pb-16 pt-14 text-fg sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="font-display text-h1 text-fg">
            {billeder.heading}
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted">{billeder.intro}</p>
        </div>

        <div className="mt-10 sm:mt-14">
          <Galleri />
        </div>

        <div className="mx-auto mt-14 flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-2 px-4 sm:px-6">
          <RingKnap className="w-full sm:w-auto">Ring og bestil</RingKnap>
          <Link
            to="/menu"
            className="tlink"
          >
            Se menukortet
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Billeder

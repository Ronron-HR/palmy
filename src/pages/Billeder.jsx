import { billeder } from '../content'
import Layout from '../components/Layout'
import Galleri from '../components/Galleri'
import RingKnap from '../components/RingKnap'
import Link from '../components/Link'

function Billeder() {
  return (
    <Layout>
      <div className="leaf-bg bg-bg pb-16 pt-16 sm:pb-24 sm:pt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="font-display text-6xl leading-none text-fg sm:text-8xl">
            {billeder.heading}
          </h1>
          <p className="mt-5 max-w-md text-lg text-fg/85">{billeder.intro}</p>
        </div>

        <div className="mt-10 sm:mt-14">
          <Galleri />
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-3 px-4 sm:flex sm:flex-wrap sm:px-6">
          <RingKnap variant="cta">Ring og bestil</RingKnap>
          <Link
            to="/menu"
            className="press inline-flex min-h-12 items-center justify-center rounded-full border border-fg/40 px-6 py-3 text-base font-semibold text-fg hover:bg-fg/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
          >
            Se menukortet
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Billeder

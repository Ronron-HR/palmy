import { billeder, social } from '../content'
import Layout from '../components/Layout'
import BilledRulle from '../components/BilledRulle'
import Galleri from '../components/Galleri'
import SideTitel from '../components/SideTitel'

// /billeder: billedrullen øverst, derefter alle fotos og loops i et grid.
function Billeder() {
  return (
    <Layout>
      <SideTitel eyebrow={billeder.eyebrow}>{billeder.heading}</SideTitel>
      <p className="mt-5 max-w-(--col-text) font-serif text-lead leading-snug">{billeder.intro}</p>
      <div className="mt-10">
        <BilledRulle label={billeder.heading} />
      </div>
      <Galleri />
      <p className="mt-12">
        <a href={social.instagram} className="text-link">
          {billeder.follow} <span aria-hidden="true">↗</span>
        </a>
      </p>
    </Layout>
  )
}

export default Billeder

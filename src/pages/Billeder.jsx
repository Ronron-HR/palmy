import { billeder } from '../content'
import Layout from '../components/Layout'
import Galleri from '../components/Galleri'
import SideTitel from '../components/SideTitel'

// /billeder — fotos som hovedperson: én spalte, fire fotos og to lydløse loops.
function Billeder() {
  return (
    <Layout>
      <SideTitel>{billeder.heading}</SideTitel>
      <p className="mt-2 leading-body">{billeder.intro}</p>
      <Galleri />
    </Layout>
  )
}

export default Billeder

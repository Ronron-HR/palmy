import Layout from '../components/Layout'
import Hero from '../components/Hero'
import BestilNu from '../components/BestilNu'
import MenuIndgang from '../components/MenuIndgang'
import HistorieTeaser from '../components/HistorieTeaser'
import AnmeldelserBlok from '../components/AnmeldelserBlok'
import FindOs from '../components/FindOs'
import Faq from '../components/Faq'

// Forsiden er en indgang, ikke hele sitet: hero, tidtavle, menuen, et glimt af
// historien, gæsternes ord, og hvor og hvornår man finder os. Køkkenbillederne bor
// på /billeder.
function Home() {
  return (
    <Layout sign="full" column="wide">
      <Hero />
      <BestilNu />
      <MenuIndgang />
      <HistorieTeaser />
      <AnmeldelserBlok variant="teaser" />
      <FindOs />
      <Faq />
    </Layout>
  )
}

export default Home

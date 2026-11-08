import Layout from '../components/Layout'
import Hero from '../components/Hero'
import BestilNu from '../components/BestilNu'
import MenuIndgang from '../components/MenuIndgang'
import HistorieTeaser from '../components/HistorieTeaser'
import KoekkenStribe from '../components/KoekkenStribe'
import AnmeldelserBlok from '../components/AnmeldelserBlok'
import FindOs from '../components/FindOs'
import Faq from '../components/Faq'

// Forsiden er en indgang, ikke hele sitet: hero, vejen ind til menuen, et
// glimt af historien og køkkenet, og hvor og hvornår man finder os.
function Home() {
  return (
    <Layout>
      <Hero />
      <BestilNu />
      <MenuIndgang />
      <HistorieTeaser />
      <KoekkenStribe />
      <AnmeldelserBlok variant="teaser" />
      <FindOs />
      <Faq />
    </Layout>
  )
}

export default Home

import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import SignaturRetter from '../components/SignaturRetter'
import Historie from '../components/Historie'
import Menu from '../components/Menu'
import Aabningstider from '../components/Aabningstider'
import Faq from '../components/Faq'
import Kontakt from '../components/Kontakt'
import Footer from '../components/Footer'
import RingNuBar from '../components/RingNuBar'

function Home() {
  return (
    <>
      <Navigation />
      <main id="indhold">
        <Hero />
        <SignaturRetter />
        <Historie />
        <Menu />
        <Aabningstider />
        <Faq />
        <Kontakt />
      </main>
      <Footer />
      <RingNuBar />
    </>
  )
}

export default Home

import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import SignaturRetter from '../components/SignaturRetter'
import Historie from '../components/Historie'
import Menu from '../components/Menu'
import Aabningstider from '../components/Aabningstider'
import Kontakt from '../components/Kontakt'
import Footer from '../components/Footer'
import RingNuBar from '../components/RingNuBar'

function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <SignaturRetter />
      <Historie />
      <Menu />
      <Aabningstider />
      <Kontakt />
      <Footer />
      <RingNuBar />
    </>
  )
}

export default Home

import Navigation from './Navigation'
import Footer from './Footer'
import FoelgOs from './FoelgOs'
import RingNuBar from './RingNuBar'

// Fælles ramme om alle offentlige sider: header, indhold, "Følg Palmy"-båndet,
// footer og den faste Ring-bar på mobil. <main id="indhold"> er målet
// for "Spring til indhold" og for fokus efter sideskift (se Link.jsx).
function Layout({ children }) {
  return (
    <>
      <Navigation />
      <main id="indhold">{children}</main>
      <FoelgOs />
      <Footer />
      <RingNuBar />
    </>
  )
}

export default Layout

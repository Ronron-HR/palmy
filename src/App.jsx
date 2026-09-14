import { usePathname } from './hooks/usePathname'
import Home from './pages/Home'
import MenuPage from './pages/Menu'
import Bestilling from './pages/Bestilling'
import MenuPrint from './pages/MenuPrint'
import Privatliv from './pages/Privatliv'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

// Lille intern router uden ekstern afhængighed — projektet har få faste ruter,
// så en fuld routerpakke er ikke nødvendig.
function App() {
  const pathname = usePathname()

  if (pathname === '/bestilling') return <Bestilling />
  if (pathname === '/menu/print') return <MenuPrint />
  if (pathname === '/privatliv') return <Privatliv />

  if (pathname === '/menu') {
    return (
      <>
        <Navigation />
        <MenuPage />
        <Footer />
      </>
    )
  }

  return <Home />
}

export default App

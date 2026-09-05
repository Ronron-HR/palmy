import { usePathname } from './hooks/usePathname'
import Home from './pages/Home'
import MenuPage from './pages/Menu'
import Bestilling from './pages/Bestilling'
import MenuPrint from './pages/MenuPrint'
import Navigation from './components/Navigation'
import RingNuBar from './components/RingNuBar'

// Lille intern router uden ekstern afhængighed — projektet har kun fire
// faste ruter, så en fuld routerpakke er ikke nødvendig.
function App() {
  const pathname = usePathname()

  if (pathname === '/bestilling') return <Bestilling />
  if (pathname === '/menu/print') return <MenuPrint />

  if (pathname === '/menu') {
    return (
      <>
        <Navigation />
        <MenuPage />
        <RingNuBar />
      </>
    )
  }

  return <Home />
}

export default App

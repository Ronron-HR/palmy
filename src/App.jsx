import { usePathname } from './hooks/usePathname'
import { useDocumentHead } from './hooks/useDocumentHead'
import Home from './pages/Home'
import MenuPage from './pages/Menu'
import Bestilling from './pages/Bestilling'
import MenuPrint from './pages/MenuPrint'
import Privatliv from './pages/Privatliv'
import NotFound from './pages/NotFound'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

// Lille intern router uden ekstern afhængighed — projektet har få faste ruter,
// så en fuld routerpakke er ikke nødvendig. Ruterne prerenderes til statisk
// HTML ved build (src/entry-server.jsx + scripts/prerender.mjs); metadata pr.
// rute bor i src/seo.js.
function App() {
  const rawPathname = usePathname()
  // '/menu/' og '/menu' er samme side (hosten 301'er selv trailing slash).
  const pathname = rawPathname.length > 1 ? rawPathname.replace(/\/+$/, '') : rawPathname
  useDocumentHead(pathname)

  if (pathname === '/') return <Home />
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

  return <NotFound />
}

export default App

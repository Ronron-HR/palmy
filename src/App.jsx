import { usePathname } from './hooks/usePathname'
import { useDocumentHead } from './hooks/useDocumentHead'
import Home from './pages/Home'
import MenuPage from './pages/Menu'
import Historien from './pages/Historien'
import Billeder from './pages/Billeder'
import Anmeldelser from './pages/Anmeldelser'
import Bestilling from './pages/Bestilling'
import MenuPrint from './pages/MenuPrint'
import Privatliv from './pages/Privatliv'
import NotFound from './pages/NotFound'

// Lille intern router uden ekstern afhængighed — projektet har få faste ruter,
// så en fuld routerpakke er ikke nødvendig. Ruterne prerenderes til statisk
// HTML ved build (src/entry-server.jsx + scripts/prerender.mjs); metadata pr.
// rute bor i src/seo.js.
const PAGES = {
  '/': Home,
  '/menu': MenuPage,
  '/historien': Historien,
  '/billeder': Billeder,
  '/anmeldelser': Anmeldelser,
  '/bestilling': Bestilling,
  '/menu/print': MenuPrint,
  '/privatliv': Privatliv,
}

function App() {
  const rawPathname = usePathname()
  // '/menu/' og '/menu' er samme side (hosten 301'er selv trailing slash).
  const pathname = rawPathname.length > 1 ? rawPathname.replace(/\/+$/, '') : rawPathname
  useDocumentHead(pathname)

  const Page = PAGES[pathname] ?? NotFound
  return <Page />
}

export default App

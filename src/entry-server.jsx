import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { setSsrPathname } from './hooks/usePathname'
import { PRERENDER_ROUTES, renderHead, renderSitemap } from './seo'

// Build-tids prerendering (kaldes af scripts/prerender.mjs). Renderer hver
// rute til statisk HTML, så Google — og gæster på langsomt net — får
// restaurantnavn, H1, adresse, menu og tekster direkte i HTML'en uden at
// vente på JavaScript. Klienten hydrerer bagefter (src/main.jsx).
export function render(pathname) {
  setSsrPathname(pathname)
  const html = renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  return { html, head: renderHead(pathname) }
}

export { PRERENDER_ROUTES, renderSitemap }

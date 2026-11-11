import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// Selvhostede skrifter (DESIGN.md): kun de snit, designet bruger.
import '@fontsource/libre-caslon-text/latin-700.css'
import '@fontsource/libre-caslon-text/latin-400-italic.css'
import '@fontsource/source-sans-3/latin-400.css'
import '@fontsource/source-sans-3/latin-400-italic.css'
import '@fontsource/source-sans-3/latin-600.css'
import '@fontsource/source-sans-3/latin-700.css'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Produktion: siden er prerenderet ved build (scripts/prerender.mjs), så vi
// hydrerer den eksisterende HTML. Dev-serveren har et tomt #root → createRoot.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}

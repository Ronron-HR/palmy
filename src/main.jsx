import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource/gloock/latin-400.css'
import '@fontsource-variable/hanken-grotesk/index.css'
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

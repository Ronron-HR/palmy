import { useEffect, useState } from 'react'

// Minimal pathname-router — ingen ny afhængighed. Dækker de faste ruter
// '/', '/menu', '/privatliv', '/bestilling' og '/menu/print' som App.jsx slår
// op i. Alt andet renderes som 404.

let patched = false

// Ved prerendering (scripts/prerender.mjs) findes der intet window; entry-server
// sætter ruten her, før hver side renderes til statisk HTML.
let ssrPathname = '/'
export function setSsrPathname(pathname) {
  ssrPathname = pathname
}

function patchHistory() {
  if (patched || typeof window === 'undefined') return
  patched = true

  const rawPushState = window.history.pushState.bind(window.history)
  const rawReplaceState = window.history.replaceState.bind(window.history)

  window.history.pushState = (...args) => {
    rawPushState(...args)
    window.dispatchEvent(new Event('locationchange'))
  }
  window.history.replaceState = (...args) => {
    rawReplaceState(...args)
    window.dispatchEvent(new Event('locationchange'))
  }
  window.addEventListener('popstate', () => {
    window.dispatchEvent(new Event('locationchange'))
  })
}

export function navigate(path) {
  if (typeof window === 'undefined') return
  window.history.pushState({}, '', path)
  // Ny side skal starte fra toppen — ellers lander man midt på siden, når man
  // fx klikker "Menukort" i footeren.
  window.scrollTo(0, 0)
}

export function usePathname() {
  const [pathname, setPathname] = useState(() =>
    typeof window === 'undefined' ? ssrPathname : window.location.pathname,
  )

  useEffect(() => {
    patchHistory()
    const onLocationChange = () => setPathname(window.location.pathname)
    window.addEventListener('locationchange', onLocationChange)
    return () => window.removeEventListener('locationchange', onLocationChange)
  }, [])

  return pathname
}

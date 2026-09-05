import { useEffect, useState } from 'react'

// Minimal pathname-router — ingen ny afhængighed. Dækker de faste ruter
// '/', '/menu', '/bestilling' og '/menu/print' som App.jsx slår op i.

let patched = false

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
}

export function usePathname() {
  const [pathname, setPathname] = useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname,
  )

  useEffect(() => {
    patchHistory()
    const onLocationChange = () => setPathname(window.location.pathname)
    window.addEventListener('locationchange', onLocationChange)
    return () => window.removeEventListener('locationchange', onLocationChange)
  }, [])

  return pathname
}

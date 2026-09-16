import { useEffect } from 'react'
import { getRouteSeo } from '../seo'

// Holder <title>, description, robots og canonical i sync med ruten ved
// klient-navigation (Link-komponenten skifter side uden reload). Ved første
// indlæsning matcher værdierne allerede den prerenderede HTML, så dette er
// en no-op — og i dev-serveren (ingen prerender) sætter den de rigtige tags.

function setMeta(selector, attr, value, create) {
  let node = document.head.querySelector(selector)
  if (!node) {
    node = create()
    document.head.appendChild(node)
  }
  node.setAttribute(attr, value)
}

export function useDocumentHead(pathname) {
  useEffect(() => {
    const seo = getRouteSeo(pathname)
    document.title = seo.title
    setMeta('meta[name="description"]', 'content', seo.description, () => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'description')
      return m
    })
    setMeta('meta[name="robots"]', 'content', seo.robots, () => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'robots')
      return m
    })
    const canonical = document.head.querySelector('link[rel="canonical"]')
    if (seo.canonical) {
      setMeta('link[rel="canonical"]', 'href', seo.canonical, () => {
        const l = document.createElement('link')
        l.setAttribute('rel', 'canonical')
        return l
      })
    } else if (canonical) {
      canonical.remove()
    }
  }, [pathname])
}

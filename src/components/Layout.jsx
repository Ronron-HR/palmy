import { useRef } from 'react'
import { ui } from '../content'
import { hasNavigated, usePathname } from '../hooks/usePathname'
import { MobileMenu } from './Navigation'
import Skilt from './Skilt'
import Footer from './Footer'
import RingBar from './RingBar'

// Fælles ramme om alle offentlige sider:
//   desktop-links → skiltet (fuldt på Forside, kompakt ellers) → indhold →
//   footer, plus "Menu"-knap/overlay og ring-bar på mobil.
// column "wide" = 1040-spalten (Forside, Menu), "text" = 680 (øvrige).
// <main id="indhold"> er målet for "Spring til indhold" og for fokus efter
// sideskift (Link.jsx).
function Layout({ children, sign = 'compact', menuPage = false, closing = 'default' }) {
  const pathname = usePathname()
  const phoneRef = useRef(null)

  return (
    <div key={pathname} className={hasNavigated() ? 'page' : undefined}>
      <a
        href="#indhold"
        className="sr-only z-30 bg-black px-4 py-2 text-cream no-underline focus:not-sr-only focus:absolute focus:top-3 focus:left-4"
      >
        {ui.skipLink}
      </a>
      <div className="frame relative mx-auto">
        <MobileMenu />
        <Skilt ref={phoneRef} variant={sign} menuPage={menuPage} />
        <main id="indhold">{children}</main>
      </div>
      <Footer closing={closing} />
      <RingBar targetRef={phoneRef} />
    </div>
  )
}

export default Layout

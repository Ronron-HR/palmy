import { useRef } from 'react'
import { ui } from '../content'
import { usePathname } from '../hooks/usePathname'
import { DesktopNav, MobileMenu } from './Navigation'
import Skilt from './Skilt'
import Footer from './Footer'
import RingBar from './RingBar'

// Fælles ramme om alle offentlige sider:
//   desktop-links → skiltet (fuldt på Forside, kompakt ellers) → indhold →
//   footer, plus "Menu"-knap/overlay og ring-bar på mobil.
// column "wide" = 1040-spalten (Forside, Menu), "text" = 680 (øvrige).
// <main id="indhold"> er målet for "Spring til indhold" og for fokus efter
// sideskift (Link.jsx).
function Layout({ children, sign = 'compact', column = 'text', menuPage = false }) {
  const pathname = usePathname()
  const phoneRef = useRef(null)
  const wide = column === 'wide'
  const placement = sign === 'full' ? 'full' : menuPage ? 'menu' : 'compact'

  return (
    <div key={pathname} className="page">
      <a
        href="#indhold"
        className="sr-only z-30 bg-black px-4 py-2 text-cream no-underline focus:not-sr-only focus:absolute focus:top-3 focus:left-4"
      >
        {ui.skipLink}
      </a>
      <DesktopNav />
      <div
        className={`relative mx-auto px-(--gutter-mobile) ${wide ? 'frame-wide' : 'max-w-(--col-text)'}`}
      >
        <MobileMenu placement={placement} />
        <Skilt ref={phoneRef} variant={sign} menuPage={menuPage} />
        <main id="indhold">{children}</main>
        <Footer bleed={wide} />
      </div>
      <RingBar targetRef={phoneRef} />
    </div>
  )
}

export default Layout

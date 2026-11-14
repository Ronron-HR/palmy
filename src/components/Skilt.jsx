import { forwardRef } from 'react'
import { business, hours, nav, shared, ui } from '../content'
import { usePathname } from '../hooks/usePathname'
import Hero from './Hero'
import Link from './Link'

// Skiltet "Bestil på forhånd" fra disken (KOMPONENTER.md §1 og §2).
// - variant "full": kun Forside. Logo, tagline, h1, sætning, stor telefonbjælke
//   (52/88 px), linjen med tider og adresse og de to infoblokke.
// - variant "compact": alle andre sider. Ordmærke (link til /) + bjælke 28 px.
// Telefonbjælken videresender sin ref, så ring-baren kan se, hvornår det store
// nummer er ude af skærmen (MOTION.md).

const WORDMARK = { src: '/logo/palmy-ordmaerke-moerk-transparent.svg', width: 1651, height: 493 } // viewBox 825,5 × 246,5

export const Wordmark = ({ className = '', loading }) => (
  <img
    src={WORDMARK.src}
    width={WORDMARK.width}
    height={WORDMARK.height}
    alt={ui.logoAlt}
    loading={loading}
    className={`block h-auto ${className}`}
  />
)

// Fælles header (palmy_handoff "Hovednavigation"): logo til venstre, links og
// "Ring og bestil" til højre på desktop. Mobil: logo + "Menu"-knappen
// (Navigation.jsx); ring-baren i bunden er telefonen.
export const SiteHeader = forwardRef(function SiteHeader(_, phoneRef) {
  const pathname = usePathname()
  return (
    <header className="site-header flex items-center justify-between gap-6 pt-4 pb-2 md:pt-6">
      <Link to="/" className="no-underline">
        <Wordmark className="w-(--wordmark)" />
      </Link>
      <nav aria-label={ui.navLabel} className="hidden items-center gap-x-8 md:flex">
        {nav
          .filter((item) => item.main)
          .map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="nav-link"
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        <a ref={phoneRef} href={`tel:${business.phoneHref}`} className="btn btn-ring no-underline">
          {shared.ringCta}
        </a>
      </nav>
    </header>
  )
})

// Forsiden: header + hero (Hero.jsx) + infobånd.
const FullSign = forwardRef(function FullSign(_, phoneRef) {
  return (
    <>
      <SiteHeader />
      <Hero ref={phoneRef} />
      <ul className="info-band -mx-(--gutter-mobile) mt-0 md:mx-0">
        <li>{hours.line}</li>
        <li>Forudbestil fra kl. {hours.preorderStart.replace(':', '.')}</li>
        <li>
          <a href={`tel:${business.phoneHref}`} className="tabular-nums">
            {business.phoneDisplay}
          </a>
        </li>
      </ul>
    </>
  )
})

const CompactSign = forwardRef(function CompactSign(_, phoneRef) {
  return <SiteHeader ref={phoneRef} />
})

const Skilt = forwardRef(function Skilt({ variant = 'compact' }, phoneRef) {
  return variant === 'full' ? (
    <FullSign ref={phoneRef} />
  ) : (
    <CompactSign ref={phoneRef} />
  )
})

export default Skilt

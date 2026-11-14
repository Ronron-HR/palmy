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

// Små streg-ikoner til infobåndet.
const ICON = {
  clock: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z',
}
const BandIcon = ({ d }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="band-icon" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

// Forsiden: header + hero (Hero.jsx) + infobånd.
const FullSign = forwardRef(function FullSign(_, phoneRef) {
  return (
    <>
      <SiteHeader />
      <Hero ref={phoneRef} />
      <ul className="info-band -mx-(--gutter-mobile) mt-0 md:mx-0 lg:mt-8">
        <li className="band-item">
          <BandIcon d={ICON.clock} />
          <span>
            <span className="band-label">Åbent</span>
            Fredag &amp; lørdag {hours.time}
          </span>
        </li>
        <li className="band-item">
          <BandIcon d={ICON.calendar} />
          <span>
            <span className="band-label">Forudbestil</span>
            Fra kl. {hours.preorderStart.replace(':', '.')}
          </span>
        </li>
        <li className="band-item">
          <BandIcon d={ICON.phone} />
          <span>
            <span className="band-label">Ring</span>
            <a href={`tel:${business.phoneHref}`} className="tabular-nums">
              {business.phoneDisplay}
            </a>
          </span>
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

import { forwardRef } from 'react'
import { business, frame, hours, sign, ui } from '../content'
import Link from './Link'

// Skiltet "Bestil på forhånd" fra disken (KOMPONENTER.md §1 og §2).
// - variant "full": kun Forside. Logo, tagline, h1, sætning, stor telefonbjælke
//   (52/88 px), linjen med tider og adresse og de to infoblokke.
// - variant "compact": alle andre sider. Ordmærke (link til /) + bjælke 28 px.
// Telefonbjælken videresender sin ref, så ring-baren kan se, hvornår det store
// nummer er ude af skærmen (MOTION.md).

const LOGO = { src: '/logo/palmy-logo-moerk-transparent.svg', width: 1000, height: 609 }
const WORDMARK = { src: '/logo/palmy-ordmaerke-moerk-transparent.svg', width: 1000, height: 326 }

export const Wordmark = ({ className = '' }) => (
  <img
    src={WORDMARK.src}
    width={WORDMARK.width}
    height={WORDMARK.height}
    alt={ui.logoAlt}
    className={`block h-auto ${className}`}
  />
)

const FullSign = forwardRef(function FullSign(_, phoneRef) {
  return (
    <>
      <header className="flex flex-col items-center pt-(--sign-top-m) text-center md:pt-8">
        <img
          src={LOGO.src}
          width={LOGO.width}
          height={LOGO.height}
          alt={ui.logoAlt}
          fetchPriority="high"
          className="block h-auto w-(--logo-full-m) md:w-(--logo-full-d)"
        />
        <p className="mt-1 font-serif text-base italic md:mt-(--sign-tagline-d)">{frame.tagline}</p>
      </header>

      <div className="pt-4 md:pt-10">
        <h1 className="font-serif text-lg leading-heading font-bold text-green">{sign.heading}</h1>
        <p className="mt-1 mb-3 leading-desc md:mt-(--sign-lead-d) md:mb-4 md:leading-body">
          {sign.lead}
        </p>

        <a
          ref={phoneRef}
          href={`tel:${business.phoneHref}`}
          className="bar press block bg-black px-4 pt-3 pb-(--sign-bar-pad-b-m) text-center text-cream no-underline md:pt-(--sign-bar-pad-t-d) md:pb-4"
        >
          <span className="block text-phone leading-none font-bold tracking-phone tabular-nums md:tracking-none lg:text-phone-desktop">
            {business.phoneDisplay}
          </span>
          <span className="mt-2 block text-xs">{hours.preorderShort}</span>
        </a>

        <p className="mt-(--sign-info-gap) leading-desc md:leading-normal">
          {hours.line} ·{' '}
          <a href={business.googleMapsUrl} target="_blank" rel="noopener">
            {business.street}
          </a>
        </p>

        <div className="mt-(--sign-blocks-top-m) flex flex-col gap-(--sign-info-gap) leading-info md:mt-5 md:gap-(--sign-blocks-gap-d) md:leading-desc">
          {sign.blocks.map((block) => (
            <p key={block.label} className="border-l border-gold pl-3">
              <b>{block.label}</b>
              <br />
              {block.text}
            </p>
          ))}
        </div>
      </div>
    </>
  )
})

const CompactSign = forwardRef(function CompactSign({ menuPage }, phoneRef) {
  return (
    <>
      <header className={`flex justify-center pt-5 ${menuPage ? 'md:pt-6' : ''}`}>
        <Link to="/" className="no-underline">
          <Wordmark className={`w-(--wordmark) ${menuPage ? 'md:w-(--wordmark-menu-d)' : ''}`} />
        </Link>
      </header>

      <a
        ref={phoneRef}
        href={`tel:${business.phoneHref}`}
        className="bar press mt-5 flex items-baseline justify-between gap-3 bg-black px-4 py-3 text-cream no-underline"
      >
        <span className="text-lg font-bold whitespace-nowrap tabular-nums">{business.phoneDisplay}</span>
        <span className="text-right text-xs leading-snug">{hours.preorderShort}</span>
      </a>
    </>
  )
})

const Skilt = forwardRef(function Skilt({ variant = 'compact', menuPage = false }, phoneRef) {
  return variant === 'full' ? (
    <FullSign ref={phoneRef} />
  ) : (
    <CompactSign ref={phoneRef} menuPage={menuPage} />
  )
})

export default Skilt

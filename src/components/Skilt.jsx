import { forwardRef } from 'react'
import { business, frame, hero, hours, sign, ui } from '../content'
import Picture from './Picture'
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

// Forsidens hero (palmy_handoff "Palmy Spisested"): stor overskrift til
// venstre, foto af Thi og Nam til højre med lodret label og stemplet "Lavet
// med kærlighed" på billedkanten. På mobil: tekst over billedet, stemplet
// inde i billedet. Knappen "Ring og bestil" er ring-barens mål.
const FullSign = forwardRef(function FullSign(_, phoneRef) {
  return (
    <>
      <header className="flex items-center justify-between gap-4 pt-5 md:pt-6">
        <Link to="/" className="no-underline" aria-label={ui.logoAlt}>
          <Wordmark className="w-(--wordmark)" />
        </Link>
      </header>

      <section aria-labelledby="hero-titel" className="hero mt-6 flex flex-wrap items-stretch gap-x-10 gap-y-8 md:mt-10">
        <div className="hero-text relative z-10 flex flex-[1_1_320px] flex-col justify-center">
          <p className="intro eyebrow text-red" style={{ '--d': 0 }}>{hero.eyebrow}</p>
          <h1 id="hero-titel" className="intro hero-h1 mt-4 font-serif text-green" style={{ '--d': 1 }}>
            {hero.lines.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h1>
          <p className="intro mt-5 font-serif text-lead leading-snug" style={{ '--d': 2 }}>{frame.tagline}.</p>
          <div className="intro mt-8 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ '--d': 3 }}>
            <Link to="/menu" className="btn no-underline">
              {hero.menuCta} <span aria-hidden="true" className="font-sans">↗</span>
            </Link>
            <a ref={phoneRef} href={`tel:${business.phoneHref}`} className="btn btn-phone no-underline">
              {hero.phoneCta} <span className="tabular-nums">{business.phoneDisplay}</span>
            </a>
          </div>
        </div>

        <div className="hero-media relative flex-[1.45_1_380px]">
          <figure className="relative m-0 h-full overflow-hidden bg-food">
            <Picture
              id="thiOgNam"
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="hero-img block h-full w-full object-cover"
            />
          </figure>
          <p aria-hidden="true" className="vertical-label hidden md:flex">{hero.vertical}</p>
          <p className="stamp">
            <span>{hero.stamp}</span>
          </p>
        </div>
      </section>

      <ul className="info-band -mx-(--gutter-mobile) mt-10 md:mx-0 md:mt-14">
        <li>{hours.line}</li>
        <li>{hours.preorderShort}</li>
        <li>
          <a href={`tel:${business.phoneHref}`} className="tabular-nums">{business.phoneDisplay}</a>
        </li>
      </ul>

      <div className="mt-8 grid gap-4 leading-desc md:mt-10 md:grid-cols-2 md:gap-10">
        <p className="max-w-(--col-text) text-md">{sign.lead}</p>
        <div className="flex flex-col gap-(--sign-info-gap)">
          {sign.blocks.map((block) => (
            <p key={block.label} className="border-l-2 border-gold pl-3">
              <b>{block.label}</b> {block.text}
            </p>
          ))}
          <p className="border-l-2 border-gold pl-3">
            <a href={business.googleMapsUrl} target="_blank" rel="noopener">{business.address}</a>
          </p>
        </div>
      </div>
    </>
  )
})

const CompactSign = forwardRef(function CompactSign({ menuPage }, phoneRef) {
  return (
    <>
      <header className={`flex justify-center pt-(--wordmark-top) ${menuPage ? 'md:pt-(--wordmark-top-menu-d)' : ''}`}>
        <Link to="/" className="no-underline">
          <Wordmark className={`w-(--wordmark) ${menuPage ? 'md:w-(--wordmark-menu-d)' : ''}`} />
        </Link>
      </header>

      <a
        ref={phoneRef}
        href={`tel:${business.phoneHref}`}
        className={`bar press mt-(--wordmark-gap) ${menuPage ? 'md:mt-(--wordmark-gap-menu-d)' : ''} flex items-baseline justify-between gap-3 bg-black px-4 py-3 text-cream no-underline`}
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

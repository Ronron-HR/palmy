import { forwardRef } from 'react'
import { business, hero } from '../content'
import Link from './Link'
import Picture from './Picture'

// Forsidens hero — "Palmy under palmerne".
// Tekst på creme til venstre (mobil: øverst), en dyb palmegrøn flade med
// håndtegnede palmeblade til højre, og Palmys eget foto af nr. 3 på den
// blå-hvide tallerken i en creme ramme. Maden vises i sit eget format, uden
// beskæring og uden tekst ovenpå. Knapperne er synlige uden scroll på mobil.
// "Ring og bestil" er ring-barens mål (forwardRef).

// Et palmeblad: en buet midterribbe og fyldte, smalle småblade, længst på
// midten og vinklet mod spidsen. Genereres én gang ved import.
function frond() {
  const p0 = [30, 392]
  const p1 = [130, 200]
  const p2 = [392, 34]
  const at = (t, u = 1 - t) => [
    u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
    u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
  ]
  const tan = (t) => {
    const dx = 2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0])
    const dy = 2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1])
    const l = Math.hypot(dx, dy)
    return [dx / l, dy / l]
  }
  const r = (n) => Math.round(n * 10) / 10
  const rib = `M${p0[0]} ${p0[1]}Q${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]}`
  let leaves = ''
  for (let i = 0; i < 15; i++) {
    const t = 0.16 + i * 0.056
    const [x, y] = at(t)
    const [tx, ty] = tan(t)
    const len = 34 + Math.sin(Math.PI * Math.min((t - 0.1) * 1.25, 1)) * 96
    for (const side of [1, -1]) {
      // retning: vinkelret på ribben, vippet mod spidsen
      let dx = -ty * side + tx * 0.8
      let dy = tx * side + ty * 0.8
      const l = Math.hypot(dx, dy)
      dx /= l
      dy /= l
      const ex = x + dx * len
      const ey = y + dy * len
      const w = len * 0.11
      const mx = x + dx * len * 0.45 + tx * len * 0.08
      const my = y + dy * len * 0.45 + ty * len * 0.08
      leaves += `M${r(x)} ${r(y)}Q${r(mx - dy * w)} ${r(my + dx * w)} ${r(ex)} ${r(ey)}Q${r(mx + dy * w)} ${r(my - dx * w)} ${r(x)} ${r(y)}Z`
    }
  }
  return { rib, leaves }
}
const FROND = frond()

function Frond({ className }) {
  return (
    <svg viewBox="0 0 440 440" aria-hidden="true" focusable="false" className={className}>
      <path d={FROND.leaves} fill="currentColor" />
      <path d={FROND.rib} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

const Hero = forwardRef(function Hero(_, phoneRef) {
  return (
    <section aria-labelledby="hero-titel" className="ph">
      <div className="ph-text">
        <p className="eyebrow text-red">{hero.eyebrow}</p>
        <h1 id="hero-titel" className="ph-title">
          <span className="block">{hero.titleA}</span>
          <span className="ph-title-b block">{hero.titleB}</span>
        </h1>
        <p className="ph-sub">{hero.sub}</p>
        <div className="ph-actions">
          <Link to="/menu" className="btn no-underline">
            {hero.menuCta} <span aria-hidden="true" className="font-sans">↗</span>
          </Link>
          <a ref={phoneRef} href={`tel:${business.phoneHref}`} className="ph-phone">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="ph-phone-icon">
              <path
                fill="currentColor"
                d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8z"
              />
            </svg>
            <span>
              {hero.phoneCta}
              <span className="ph-phone-num tabular-nums">{business.phoneDisplay}</span>
            </span>
          </a>
        </div>
        <p className="ph-info">
          <span aria-hidden="true" className="ph-dot" />
          {hero.info}
        </p>
      </div>

      <div className="ph-stage">
        <Frond className="ph-frond ph-frond-a" />
        <Frond className="ph-frond ph-frond-b" />
        <figure className="ph-plate">
          <Picture
            id="nudler"
            priority
            sizes="(min-width: 1024px) 460px, (min-width: 768px) 40vw, 76vw"
            className="block h-full w-full object-cover"
          />
          <figcaption className="ph-cap">{hero.caption}</figcaption>
        </figure>
        <figure className="ph-side" aria-hidden="true">
          <Picture id="and" sizes="200px" className="block h-full w-full object-cover" alt="" />
        </figure>
        <p aria-hidden="true" className="ph-vertical">{hero.vertical}</p>
      </div>
    </section>
  )
})

export default Hero

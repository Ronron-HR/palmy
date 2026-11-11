import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SECTIONS, getDishesBySection } from '../../data/menu'
import { menuText } from '../../content'
import { useReveal } from '../../hooks/useReveal'
import Picture from '../Picture'
import SectionHeader from './SectionHeader'
import DishCard from './DishCard'

// Hele menukortet i fast sektionsrækkefølge, med sticky kategori-navigation
// (KOMPONENTER.md §3–4) og karryfotoet efter Hovedretter. Bruges af både
// Forside og /menu, så de to visninger ikke kan skride fra hinanden.
// Numre og rækkefølge kommer udelukkende fra data/menu.ts.
//
// variant "forside" | "menu" styrer kun afstande (prototyperne er forskellige):
//   kategori-nav over: 16/32 (Forside) og 24/24 (Menu); kategori-padding 24 / 32.

const sections = SECTIONS.filter((s) => getDishesBySection(s.id).length > 0)
const PHOTO_AFTER = 'hovedretter'
const INTRO_KEY = 'palmy-menu-intro'

// useLayoutEffect giver en advarsel under prerender; på serveren er det no-op.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Klik: scroll til sektionen med offset = kategori-navigationens højde.
// `behavior: smooth`, `auto` ved reduced motion (KOMPONENTER.md §4).
function jumpTo(id, nav, behavior) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - (nav?.offsetHeight ?? 0)
  window.scrollTo({ top, behavior: behavior ?? (reducedMotion() ? 'auto' : 'smooth') })
}

function MenuSections({ variant = 'menu' }) {
  const [active, setActive] = useState(sections[0].id)
  const navRef = useRef(null)
  const underlineRef = useRef(null)
  const photoRef = useReveal()

  // Den aktive streg glider til den aktive knap (MOTION.md): translateX +
  // scaleX på en 1 px bred streg. Den aktive knap scrolles ind i navigationen.
  const placeUnderline = useCallback(() => {
    const nav = navRef.current
    const line = underlineRef.current
    const btn = nav?.querySelector(`[data-cat="${active}"]`)
    if (!nav || !line || !btn) return
    // Stregen står på navigationens bundkant (bottom: -1px); y ≠ 0 kun hvis knapperne ombrydes.
    const y = btn.offsetTop + btn.offsetHeight - nav.clientHeight
    line.style.transform = `translate(${btn.offsetLeft}px, ${y}px) scaleX(${btn.offsetWidth})`
    if (nav.scrollWidth > nav.clientWidth) {
      nav.scrollTo({ left: Math.max(0, btn.offsetLeft - 24), behavior: reducedMotion() ? 'auto' : 'smooth' })
    }
  }, [active])

  useIsoLayoutEffect(() => {
    placeUnderline()
  }, [placeUnderline])

  useEffect(() => {
    const onResize = () => placeUnderline()
    window.addEventListener('resize', onResize)
    document.fonts?.ready.then(onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [placeUnderline])

  // Aktiv kategori ved scroll: den sidste sektion, hvis top ≤ nav-højde + 12.
  useEffect(() => {
    const nodes = sections.map((s) => document.getElementById(s.id)).filter(Boolean)
    const navHeight = () => navRef.current?.offsetHeight ?? 0
    let frame = 0
    const compute = () => {
      frame = 0
      let current = sections[0].id
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= navHeight() + 12) current = node.id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Direkte link til en kategori (fx /menu#boernemenu) efter klient-navigation.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id && sections.some((s) => s.id === id)) jumpTo(id, navRef.current, 'auto')
  }, [])

  // Menuens første load: kategorierne toner ind forskudt, kun første gang i
  // sessionen (MOTION.md). index.html sætter data-menu-intro før første
  // paint; her noteres det i sessionen, og attributten fjernes, når
  // animationen er færdig, så den ikke kører igen ved sideskift.
  useEffect(() => {
    const root = document.documentElement
    if (!root.hasAttribute('data-menu-intro')) return
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      // Privat tilstand uden sessionStorage: animationen kører bare igen.
    }
    const t = setTimeout(() => root.removeAttribute('data-menu-intro'), 800)
    return () => clearTimeout(t)
  }, [])

  const onNavClick = (event, id) => {
    event.preventDefault()
    setActive(id)
    jumpTo(id, navRef.current)
    window.history.replaceState(null, '', `#${id}`)
  }

  const forside = variant === 'forside'

  return (
    <>
      <nav
        ref={navRef}
        aria-label={menuText.navLabel}
        className={`cat-nav sticky top-0 z-20 -mx-(--gutter-mobile) flex overflow-x-auto border-b border-line bg-cream px-3 md:mx-0 md:flex-wrap md:gap-(--cat-gap-d) md:overflow-visible md:px-0 ${
          forside ? 'mt-4 md:mt-8' : 'mt-6'
        }`}
      >
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            data-cat={section.id}
            aria-current={active === section.id ? 'true' : undefined}
            onClick={(e) => onNavClick(e, section.id)}
            className="cat-link flex min-h-(--nav-height) flex-none items-center px-(--cat-btn-pad) font-semibold no-underline"
          >
            {section.title}
          </a>
        ))}
        <span
          ref={underlineRef}
          aria-hidden="true"
          className="cat-underline pointer-events-none absolute -bottom-px left-0 md:bottom-0 h-(--cat-underline) w-px origin-left bg-black"
        />
      </nav>

      {sections.map((section, i) => {
        const dishes = getDishesBySection(section.id)
        return (
          <div key={section.id}>
            <section
              id={section.id}
              aria-labelledby={`${section.id}-titel`}
              style={{ '--i': i }}
              className={`cat pb-2 md:pt-(--cat-pad-t-d) md:pb-0 ${forside ? 'pt-6' : 'pt-8'}`}
            >
              <SectionHeader id={`${section.id}-titel`} title={section.title} note={section.note} />
              <ul className={dishes.length > 2 ? 'md:columns-2 md:gap-(--menu-col-gap)' : ''}>
                {dishes.map((dish) => (
                  <li key={dish.id} className="break-inside-avoid">
                    <DishCard dish={dish} />
                  </li>
                ))}
              </ul>
            </section>

            {section.id === PHOTO_AFTER && (
              <div ref={photoRef} className="menu-photo -mx-(--gutter-mobile) mt-8 mb-4 md:mx-0 md:mt-12 md:mb-2 md:max-w-(--col-text)">
                <Picture
                  id="karry"
                  sizes="(min-width: 768px) 680px, 100vw"
                  className="block aspect-dish w-full object-cover object-center"
                />
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

export default MenuSections

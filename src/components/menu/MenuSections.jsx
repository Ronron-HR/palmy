import { useEffect, useRef, useState } from 'react'
import { SECTIONS, getDishesBySection } from '../../data/menu'
import SectionHeader from './SectionHeader'
import DishCard from './DishCard'

// Hele menukortet i fast sektionsrækkefølge + en kategorilinje, der springer
// til hver sektion. Kategoriskift scroller kun — intet skjules, sorteres eller
// omnummereres, så rettenumrene altid står præcis som på kortet.
// Bruges af forsiden og /menu, så de to visninger ikke kan skride fra hinanden.
const visibleSections = SECTIONS.filter((s) => getDishesBySection(s.id).length > 0)

function MenuSections({ columns = false, idPrefix = 'menu', headingLevel = 3 }) {
  const [active, setActive] = useState(visibleSections[0]?.id)

  // Markér den sektion, der aktuelt fylder toppen af skærmen.
  useEffect(() => {
    const nodes = visibleSections
      .map((s) => document.getElementById(`${idPrefix}-${s.id}`))
      .filter(Boolean)
    if (nodes.length === 0) return

    // Aktiv = den sidste sektion, hvis top er nået op under header +
    // kategorilinje (sektioner lander 136/152px fra toppen efter et spring).
    const LINE = 160
    let frame = 0
    const compute = () => {
      frame = 0
      let current = nodes[0]
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= LINE) current = node
      }
      // Helt nede kan den sidste sektion ikke nå linjen — vælg den, når den ses.
      const last = nodes[nodes.length - 1]
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      if (atBottom && last.getBoundingClientRect().top < window.innerHeight) current = last
      setActive(current.id.slice(idPrefix.length + 1))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    // Også ved indlæsning, fx et direkte link til /menu#kort-boernemenu.
    onScroll()
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [idPrefix])

  // Hold den aktive kategori synlig i den vandrette liste (mobil) — kun
  // vandret scroll af listen, aldrig af siden.
  const listRef = useRef(null)
  useEffect(() => {
    const list = listRef.current
    const link = list?.querySelector('[aria-current="true"]')
    if (!list || !link || list.scrollWidth <= list.clientWidth) return
    // Uden animation: en smooth scroll af listen afbrydes af sidens egen
    // smooth scroll og stopper midtvejs.
    const linkBox = link.getBoundingClientRect()
    const listBox = list.getBoundingClientRect()
    const target =
      list.scrollLeft + (linkBox.left - listBox.left) - (listBox.width - linkBox.width) / 2
    list.scrollTo({ left: Math.max(0, target), behavior: 'auto' })
  }, [active])

  return (
    <>
      <nav
        aria-label="Menukategorier"
        className="sticky top-[57px] z-30 -mx-4 border-b border-green-deep/10 bg-cream/95 backdrop-blur-sm sm:top-[65px] sm:mx-0"
      >
        {/* Mobil: blød udtoning i højre kant viser, at listen kan scrolles. */}
        <ul
          ref={listRef}
          className="no-scrollbar relative flex gap-1 overflow-x-auto px-4 py-2 [mask-image:linear-gradient(to_right,#000_85%,transparent)] sm:px-0 sm:[mask-image:none]"
        >
          {visibleSections.map((section) => {
            const isActive = active === section.id
            return (
              <li key={section.id} className="shrink-0">
                <a
                  href={`#${idPrefix}-${section.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => setActive(section.id)}
                  className={`inline-flex min-h-10 items-center rounded-md px-3 text-sm font-medium transition-[background-color,color,transform] duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep ${
                    isActive
                      ? 'bg-green-deep text-cream'
                      : 'text-green-deep/80 hover:bg-green-deep/[0.06] hover:text-green-deep'
                  }`}
                >
                  {section.title}
                </a>
              </li>
            )
          })}
          {/* Luft efter sidste fane, så den aktive fane aldrig ligger i udtoningen. */}
          <li aria-hidden="true" className="w-12 shrink-0 sm:hidden" />
        </ul>
      </nav>

      <div className={`mt-8 ${columns ? 'gap-x-14 md:columns-2 [&>*]:break-inside-avoid' : ''}`}>
        {visibleSections.map((section) => (
          <section
            key={section.id}
            id={`${idPrefix}-${section.id}`}
            aria-labelledby={`${idPrefix}-${section.id}-titel`}
            className="mb-10 scroll-mt-16 sm:scroll-mt-20"
          >
            <SectionHeader
              id={`${idPrefix}-${section.id}-titel`}
              title={section.title}
              note={section.note}
              level={headingLevel}
            />
            <ul className="divide-y divide-green-deep/10">
              {getDishesBySection(section.id).map((dish) => (
                <li key={dish.id}>
                  <DishCard dish={dish} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}

export default MenuSections

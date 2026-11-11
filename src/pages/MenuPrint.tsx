import { SECTIONS, getDishesBySection } from '../data/menu'
import { internt } from '../content'
import SectionHeader from '../components/menu/SectionHeader'
import DishCard from '../components/menu/DishCard'
import Link from '../components/Link'
import { Wordmark } from '../components/Skilt'

// Printlayout — A4 liggende, to kolonner, til trykkeriet. Ingen navigation
// og ingen links i selve print-outputtet; skærmknapperne herover forsvinder
// via `print:hidden` når siden rent faktisk printes/gemmes som PDF.
// v3: samme menurække og kategorititler som /menu, tokens fra tokens.css.
const t = internt.print

function MenuPrint() {
  return (
    <div className="overflow-x-auto bg-cream py-8">
      <style>{`
        @page {
          size: A4 landscape;
          margin: 12mm;
        }
        .menu-print-page {
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }
      `}</style>

      <div className="mb-6 flex justify-center gap-4 print:hidden">
        <Link to="/menu" className="inline-flex min-h-(--tap-min) items-center border border-black px-4 font-semibold no-underline">
          {t.back}
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="press inline-flex min-h-(--tap-min) items-center bg-black px-4 font-semibold text-cream"
        >
          {t.print}
        </button>
      </div>

      <div className="menu-print-page mx-auto min-h-(--a4-landscape-h) w-(--a4-landscape-w) bg-cream p-10">
        <div className="flex flex-col items-center">
          <Wordmark className="w-(--wordmark)" />
          <h1 className="mt-2 font-serif text-md leading-heading font-bold text-green">{t.heading}</h1>
        </div>

        <div className="mt-8 columns-2 gap-(--menu-col-gap)">
          {SECTIONS.map((section) => {
            const sectionDishes = getDishesBySection(section.id)
            if (sectionDishes.length === 0) return null

            return (
              <div key={section.id} className="mb-8 break-inside-avoid">
                <SectionHeader title={section.title} note={section.note} level={2} />
                {sectionDishes.map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MenuPrint

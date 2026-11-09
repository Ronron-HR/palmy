import { SECTIONS, getDishesBySection } from '../data/menu'
import SectionHeader from '../components/menu/SectionHeader'
import DishCard from '../components/menu/DishCard'
import Link from '../components/Link'

// Printlayout — A4 liggende, to kolonner, til trykkeriet. Ingen navigation
// og ingen links i selve print-outputtet; skærmknapperne herover forsvinder
// via `print:hidden` når siden rent faktisk printes/gemmes som PDF.
function MenuPrint() {
  return (
    <div className="paper overflow-x-auto bg-white py-8">
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
        <Link
          to="/menu"
          className="border border-green-deep/20 inline-flex min-h-11 items-center px-4 text-sm font-medium text-green-deep hover:bg-green-deep/5"
        >
          ← Tilbage til menukort
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-11 items-center bg-green-deep px-4 text-sm font-semibold text-cream"
        >
          Udskriv / gem som PDF
        </button>
      </div>

      <div
        className="menu-print-page mx-auto bg-cream p-10"
        style={{ width: '297mm', minHeight: '210mm' }}
      >
        <h1 className="text-center font-display text-3xl font-bold uppercase tracking-widest text-green-deep">
          Palmy Spisested
        </h1>
        <p className="mt-1 text-center text-sm uppercase tracking-[0.3em] text-gold-deep">Menukort</p>

        <div className="mt-8 columns-2 gap-x-12 [&>*]:break-inside-avoid">
          {SECTIONS.map((section) => {
            const sectionDishes = getDishesBySection(section.id)
            if (sectionDishes.length === 0) return null

            return (
              <div key={section.id} className="mb-8">
                <SectionHeader title={section.title} note={section.note} level={2} />
                <div className="divide-y divide-line">
                  {sectionDishes.map((dish) => (
                    <DishCard key={dish.id} dish={dish} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MenuPrint

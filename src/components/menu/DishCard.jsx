import { formatChoicesQuestion } from '../../data/menu'
import NumberBadge from './NumberBadge'
import PriceList from './PriceList'

// Én ret i kundemenuen. Fast 3-kolonne grid — [nummer] [navn/tekst] [pris] —
// så priserne flugter lodret gennem hele menuen, og lange titler wrapper i
// deres egen midterkolonne (ikke flex/justify-between, der skubbede prisen ned
// på en ny linje for lange retter).
function DishCard({ dish }) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-start gap-x-3 gap-y-1 py-3">
      {/* Kolonne 1: nummer-badge (tom for retter uden nummer, men beholder gitteret). */}
      <div>
        <NumberBadge number={dish.number} />
      </div>

      {/* Kolonne 2: navn, evt. STÆRK, undertekst, valg, note. */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-display font-semibold text-slate-dish">{dish.name}</span>
          {dish.spicy && (
            <span className="text-xs font-bold uppercase tracking-wide text-red-warm">Stærk</span>
          )}
        </div>
        {dish.description && (
          <p className="mt-0.5 text-sm italic text-slate-dish/70">{dish.description}</p>
        )}
        {dish.choices && (
          <p className="mt-0.5 text-sm text-green-deep/70">
            Vælg: {formatChoicesQuestion(dish.choices)}
          </p>
        )}
        {dish.note && <p className="mt-0.5 text-sm italic text-slate-dish/50">{dish.note}</p>}
      </div>

      {/* Kolonne 3: pris, altid højrestillet og lodret flugtende. */}
      <div className="justify-self-end">
        <PriceList dish={dish} />
      </div>
    </div>
  )
}

export default DishCard

import NumberBadge from './NumberBadge'
import PriceList from './PriceList'

// Én ret i kundemenuen: nummer-badge, navn, kursiv undertekst, evt.
// STÆRK-markering, og pris (fast eller variantliste) til højre.
function DishCard({ dish }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <NumberBadge number={dish.number} />
      <div className="flex flex-1 flex-wrap items-start justify-between gap-x-4 gap-y-1">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-display font-semibold text-slate-dish">{dish.name}</span>
            {dish.spicy && (
              <span className="text-xs font-bold uppercase tracking-wide text-red-warm">
                Stærk
              </span>
            )}
          </div>
          {dish.description && (
            <p className="mt-0.5 text-sm italic text-slate-dish/60">{dish.description}</p>
          )}
          {dish.choices && (
            <p className="mt-0.5 text-sm text-green-deep/70">Vælg: {dish.choices.join(' / ')}</p>
          )}
          {dish.note && <p className="mt-0.5 text-sm italic text-slate-dish/50">{dish.note}</p>}
        </div>
        <PriceList dish={dish} />
      </div>
    </div>
  )
}

export default DishCard

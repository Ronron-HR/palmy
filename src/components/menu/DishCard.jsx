import { formatChoicesQuestion } from '../../data/menu'
import NumberBadge from './NumberBadge'
import PriceList from './PriceList'

// Én ret i menukortet som en tekstlinje, ikke et kort. Fast 3-kolonne grid —
// [nummer] [navn/tekst] [pris] — så priserne flugter lodret gennem hele
// menuen, og lange titler wrapper i deres egen midterkolonne.
// Nummeret er dish.number (tekst fra kortet) — aldrig et indeks eller en counter.
function DishCard({ dish }) {
  return (
    <div className="grid grid-cols-[2rem_1fr_auto] items-start gap-x-3 py-3.5 sm:grid-cols-[2.25rem_1fr_auto]">
      <div className="pt-px">
        <NumberBadge number={dish.number} />
      </div>

      <div className="min-w-0">
        <p className="text-pretty font-display text-[1.05rem] font-semibold leading-snug text-slate-dish">
          {dish.name}
          {dish.spicy && ' '}
          {dish.spicy && (
            <span className="ml-0.5 align-[0.1em] font-body text-xs font-semibold text-red-warm">
              Stærk
            </span>
          )}
        </p>
        {dish.description && (
          <p className="mt-1 text-sm italic leading-relaxed text-slate-dish/75">{dish.description}</p>
        )}
        {dish.choices && (
          <p className="mt-1 text-sm text-green-deep/80">
            Vælg: {formatChoicesQuestion(dish.choices)}
          </p>
        )}
        {dish.note && <p className="mt-1 text-sm italic text-slate-dish/70">{dish.note}</p>}
      </div>

      {/* Varianter fylder i bredden: på smalle skærme lægges de under teksten
          (højrestillet, så priserne stadig flugter); fra sm i højre kolonne. */}
      <div
        className={
          dish.variants
            ? 'col-span-2 col-start-2 mt-2 sm:col-span-1 sm:col-start-3 sm:row-start-1 sm:mt-0 sm:justify-self-end sm:pt-px'
            : 'justify-self-end pt-px'
        }
      >
        <PriceList dish={dish} />
      </div>
    </div>
  )
}

export default DishCard

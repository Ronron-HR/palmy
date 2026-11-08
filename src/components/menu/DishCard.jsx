import { formatChoicesQuestion } from '../../data/menu'
import NumberBadge from './NumberBadge'
import PriceList from './PriceList'

// Én ret i menukortet som en tekstlinje, ikke et kort. Fast 3-kolonne grid —
// [nummer] [navn/tekst] [pris] — så priserne flugter lodret gennem hele
// menuen, og lange titler wrapper i deres egen midterkolonne.
// Nummeret er dish.number (tekst fra kortet) — aldrig et indeks eller en counter.
function DishCard({ dish }) {
  return (
    <div className="grid grid-cols-[3.1rem_1fr_auto] items-start gap-x-3 py-5 sm:grid-cols-[4.6rem_1fr_auto] sm:gap-x-4">
      <NumberBadge number={dish.number} />

      <div className="min-w-0">
        <p className="text-pretty font-display text-[1.45rem] leading-[1.15] text-fg sm:text-2xl">
          {dish.name}
          {dish.spicy && ' '}
          {dish.spicy && (
            <span className="ml-1 align-[0.15em] font-body text-sm font-semibold text-chili">
              Stærk
            </span>
          )}
        </p>
        {dish.description && (
          <p className="mt-1.5 text-base leading-relaxed text-muted">{dish.description}</p>
        )}
        {dish.choices && (
          <p className="mt-1.5 text-base text-fg/85">
            Vælg: {formatChoicesQuestion(dish.choices)}
          </p>
        )}
        {dish.note && <p className="mt-1.5 text-base text-muted">{dish.note}</p>}
      </div>

      {/* Varianter fylder i bredden: på smalle skærme lægges de under teksten
          (højrestillet, så priserne stadig flugter); fra sm i højre kolonne. */}
      <div
        className={
          dish.variants
            ? 'col-span-2 col-start-2 mt-3 sm:col-span-1 sm:col-start-3 sm:row-start-1 sm:mt-0 sm:justify-self-end sm:pt-1'
            : 'justify-self-end pt-1'
        }
      >
        <PriceList dish={dish} />
      </div>
    </div>
  )
}

export default DishCard

import { menuText } from '../../content'
import NumberBadge from './NumberBadge'
import PriceList from './PriceList'

// Menurækken (KOMPONENTER.md §3): [cirkel] [navn/beskrivelse/note] [pris].
// Grid 32px minmax(0,1fr) auto, kolonneafstand 12 (mobil) / 16 (desktop),
// padding 14 0, 1 px streg under. Menuen er et dokument, ikke kort.
// `choices` vises ikke her — kortets egen note ("Vælg ris eller nudler")
// står i `note`. Choices bruges af /bestilling.
function DishCard({ dish }) {
  return (
    <div className="menu-row grid grid-cols-[var(--num-col)_minmax(0,1fr)_auto] items-start gap-x-3 border-b border-line py-(--row-pad) md:gap-x-4">
      <NumberBadge number={dish.number} />

      <div className="flex min-w-0 flex-col gap-(--row-text-gap)">
        <p className="font-serif text-md leading-snug text-green">
          {dish.name}
          {dish.spicy && (
            <span className="badge-spicy ml-2 inline-block border border-red px-(--badge-pad-x) py-(--badge-pad-y) align-middle font-sans text-xs font-bold tracking-eyebrow text-red">
              {menuText.spicy}
            </span>
          )}
        </p>
        {dish.description && <p className="leading-desc text-muted">{dish.description}</p>}
        {dish.note && <p className="choice-tag mt-1 self-start">{dish.note}</p>}
      </div>

      <PriceList dish={dish} />
    </div>
  )
}

export default DishCard

// Nummercirklen fra menukortet (KOMPONENTER.md §3): 32×32, sort, creme tal
// 17/700 tabular-nums. Retter uden nummer (drikkevarer, tilbehør) får en tom
// celle i samme bredde, så navnene flugter. Nummeret er dish.number (tekst fra
// kortet) — aldrig et indeks.
// size="large" bruges kun af den interne /bestilling.
function NumberBadge({ number, size = 'normal' }) {
  if (number == null) return <span aria-hidden="true" className="block size-(--circle)" />
  const dims = size === 'large' ? 'size-16 text-lg' : 'size-(--circle) text-base'
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-circle bg-black font-bold text-cream tabular-nums ${dims}`}
    >
      {number}
    </span>
  )
}

export default NumberBadge

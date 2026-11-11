import { getPriceLines } from '../../data/menu'

// Prisen yderst til højre: 17/700 tabular-nums, nowrap. Varianter stablet, én
// pr. linje ("And 115 kr."), præcis som på kortet (KOMPONENTER.md §3).
function PriceList({ dish, className = '' }) {
  return (
    <p
      className={`flex flex-col items-end leading-snug font-bold whitespace-nowrap tabular-nums ${className}`}
    >
      {getPriceLines(dish).map((line) => (
        <span key={line}>{line}</span>
      ))}
    </p>
  )
}

export default PriceList

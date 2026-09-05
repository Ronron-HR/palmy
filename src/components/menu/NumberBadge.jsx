// Mørkegrøn cirkel med hvidt tal — menunummeret, som på det trykte kort.
// Retter uden nummer (drikkevarer, tilbehør) har number === null og
// renderer ingen badge.
function NumberBadge({ number, size = 'normal' }) {
  if (number == null) return null

  const sizeClasses =
    size === 'large'
      ? 'h-14 w-14 text-2xl sm:h-16 sm:w-16 sm:text-3xl'
      : 'h-7 w-7 text-xs sm:h-8 sm:w-8 sm:text-sm'

  return (
    <span
      className={`inline-flex flex-shrink-0 items-center justify-center rounded-full bg-green-deep font-display font-semibold text-cream ${sizeClasses}`}
    >
      {number}
    </span>
  )
}

export default NumberBadge

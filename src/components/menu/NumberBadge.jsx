// Menunummeret, som på det trykte kort — det gæsterne siger i telefonen. Sat i
// skiltets skrift som et stort, tabulært tal i signal-rød (som numrene på en
// menutavle), så det er det første øjet finder i hver række. Retter uden nummer
// (drikkevarer, tilbehør) har number === null og renderer intet. Nummeret er tekst
// og vises præcis som i data — aldrig et indeks eller en counter.
function NumberBadge({ number, size = 'normal' }) {
  if (number == null) return null

  const sizeClasses = size === 'large' ? 'text-6xl sm:text-7xl' : 'text-num'

  return (
    <span className={`block font-display tabular-nums text-signal ${sizeClasses}`}>
      {number}
    </span>
  )
}

export default NumberBadge

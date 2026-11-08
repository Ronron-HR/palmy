// Menunummeret, som på det trykte kort — det gæsterne siger i telefonen. Sat som
// et stort, tabulært messing-tal (som et racernummer), så det er det første øjet
// finder i hver række. Retter uden nummer (drikkevarer, tilbehør) har number ===
// null og renderer intet. Nummeret er tekst og vises præcis som i data — aldrig
// et indeks eller en counter.
function NumberBadge({ number, size = 'normal' }) {
  if (number == null) return null

  const sizeClasses = size === 'large' ? 'text-6xl sm:text-7xl' : 'text-[2.4rem] sm:text-5xl'

  return (
    <span className={`block font-display leading-[0.9] tabular-nums text-brass ${sizeClasses}`}>
      {number}
    </span>
  )
}

export default NumberBadge

// Anmeldelsesstjerner i messing. Almindelig femtakket rating-stjerne; farven
// følger temaets `signal`.
const STAR = 'M12 2.6l2.8 6.2 6.7.7-5 4.5 1.4 6.6L12 17.2 6.1 20.6l1.4-6.6-5-4.5 6.7-.7z'

function Stars({ count = 5, className = 'h-4 w-4', animated = false, delay = 0 }) {
  return (
    <span className="inline-flex gap-1" role="img" aria-label={`${count} ud af 5 stjerner`}>
      {Array.from({ length: count }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className={`${className} text-signal ${animated ? 'pop' : ''}`}
          style={animated ? { '--d': `${delay + i * 60}ms` } : undefined}
        >
          <path d={STAR} />
        </svg>
      ))}
    </span>
  )
}

export default Stars

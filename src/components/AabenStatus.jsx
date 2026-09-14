import { useEffect, useState } from 'react'
import { getOpenStatus } from '../lib/openStatus'

// Live status-pille: "Åbent nu" / "Forudbestilling åben" / "Lukket nu".
// Opdaterer hvert minut, så den altid er korrekt uden at genindlæse siden.
// tone: 'dark' til lys baggrund (grøn tekst), 'light' til mørk baggrund (cream).
const styles = {
  dark: {
    open: 'bg-green-deep/10 text-green-deep ring-green-deep/20',
    preorder: 'bg-gold/15 text-green-deep ring-gold/40',
    closed: 'bg-green-deep/5 text-green-deep/60 ring-green-deep/15',
    dotLive: 'bg-green-deep',
    dotClosed: 'bg-green-deep/40',
  },
  light: {
    open: 'bg-gold/20 text-cream ring-gold/40',
    preorder: 'bg-gold/20 text-cream ring-gold/40',
    closed: 'bg-cream/10 text-cream/75 ring-cream/25',
    dotLive: 'bg-gold',
    dotClosed: 'bg-cream/50',
  },
}

function AabenStatus({ tone = 'dark', className = '' }) {
  const [status, setStatus] = useState(() => getOpenStatus())

  useEffect(() => {
    const tick = () => setStatus(getOpenStatus())
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])

  const t = styles[tone] ?? styles.dark
  const isLive = status.state !== 'closed'

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ring-1 ${t[status.state]} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${isLive ? t.dotLive : t.dotClosed} ${
          status.state === 'open' ? 'motion-safe:animate-pulse' : ''
        }`}
      />
      {status.label}
    </span>
  )
}

export default AabenStatus

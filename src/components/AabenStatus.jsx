import { useOpenStatus } from '../hooks/useOpenStatus'

// Live status-pille: OPEN (grøn prik), PREORDER (guld prik), CLOSED (grå prik).
// UNKNOWN er den neutrale tilstand i den prerenderede HTML, før klienten har
// beregnet den rigtige status (se hooks/useOpenStatus.js).
// tone: 'dark' til lys baggrund (grøn tekst), 'light' til mørk baggrund (cream).
const pill = {
  dark: {
    live: 'bg-gold/15 text-green-deep ring-gold/40',
    closed: 'bg-green-deep/5 text-green-deep/70 ring-green-deep/15',
  },
  light: {
    live: 'bg-gold/20 text-cream ring-gold/40',
    closed: 'bg-cream/10 text-cream/75 ring-cream/25',
  },
}

const dotByState = {
  OPEN: 'bg-green-500',
  PREORDER: 'bg-gold',
  CLOSED: 'bg-neutral-400',
  UNKNOWN: 'bg-neutral-400',
}

function AabenStatus({ tone = 'dark', className = '' }) {
  const status = useOpenStatus()
  const t = pill[tone] ?? pill.dark
  const isLive = status.state === 'OPEN' || status.state === 'PREORDER'

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ring-1 ${
        isLive ? t.live : t.closed
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${dotByState[status.state] ?? dotByState.CLOSED} ${
          status.state === 'OPEN' ? 'motion-safe:animate-pulse' : ''
        }`}
      />
      {status.label}
    </span>
  )
}

export default AabenStatus

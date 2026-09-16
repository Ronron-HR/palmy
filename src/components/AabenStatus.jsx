import { useOpenStatus } from '../hooks/useOpenStatus'

// Live status-pille — vises KUN når der sker noget: PREORDER (guld prik, fra
// kl. 15.00 på åbningsdage) og OPEN (grøn pulserende prik). Når der er lukket
// (CLOSED) og i den prerenderede HTML (UNKNOWN) renderes ingenting; heroens
// underlinje fortæller i stedet, hvornår vi næste gang tager imod bestillinger.
// tone: 'dark' til lys baggrund (grøn tekst), 'light' til mørk baggrund (cream).
const pill = {
  dark: 'bg-gold/15 text-green-deep ring-gold/40',
  light: 'bg-gold/20 text-cream ring-gold/40',
}

const dotByState = {
  OPEN: 'bg-green-500 motion-safe:animate-pulse',
  PREORDER: 'bg-gold',
}

function AabenStatus({ tone = 'dark', className = '' }) {
  const status = useOpenStatus()
  const isLive = status.state === 'OPEN' || status.state === 'PREORDER'
  if (!isLive) return null

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ring-1 ${
        pill[tone] ?? pill.dark
      } ${className}`}
    >
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${dotByState[status.state]}`} />
      {status.label}
    </span>
  )
}

export default AabenStatus

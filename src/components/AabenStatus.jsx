import { useOpenStatus } from '../hooks/useOpenStatus'

// Live status-pille — vises KUN når der sker noget: PREORDER (gul prik, fra
// kl. 15.00 på åbningsdage) og OPEN (grøn prik). Når der er lukket (CLOSED) og
// i den prerenderede HTML (UNKNOWN) renderes ingenting; heroens underlinje
// fortæller i stedet, hvornår vi næste gang tager imod bestillinger.
const dotByState = {
  OPEN: 'bg-open',
  PREORDER: 'bg-accent',
}

function AabenStatus({ className = '' }) {
  const status = useOpenStatus()
  const isLive = status.state === 'OPEN' || status.state === 'PREORDER'
  if (!isLive) return null

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-fg/10 px-3 py-1.5 text-sm font-semibold text-fg ring-1 ring-fg/20 ${className}`}
    >
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${dotByState[status.state]}`} />
      {status.label}
    </span>
  )
}

export default AabenStatus

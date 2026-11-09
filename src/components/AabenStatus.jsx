import { useOpenStatus } from '../hooks/useOpenStatus'

// Live status — vises KUN når der sker noget: PREORDER (signal-prik, fra kl. 15.00
// på åbningsdage) og OPEN (grøn prik). Når der er lukket (CLOSED) og i den
// prerenderede HTML (UNKNOWN) renderes ingenting; heroens underlinje fortæller i
// stedet, hvornår vi næste gang tager imod bestillinger. Ren tekst med en lille
// firkantet prik — ingen kapsel.
const dotByState = {
  OPEN: 'bg-open',
  PREORDER: 'bg-accent',
}

function AabenStatus({ className = '' }) {
  const status = useOpenStatus()
  const isLive = status.state === 'OPEN' || status.state === 'PREORDER'
  if (!isLive) return null

  return (
    <span className={`label inline-flex items-center gap-2.5 text-fg ${className}`}>
      <span aria-hidden="true" className={`h-2 w-2 ${dotByState[status.state]}`} />
      {status.label}
    </span>
  )
}

export default AabenStatus

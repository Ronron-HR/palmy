import { business } from '../content'

// cta = den ene primære handling på sitet ("Ring og bestil").
// outline = sekundær (også et opkald, men uden fyld).
const variants = {
  cta: 'bg-cta text-cta-fg hover:brightness-110 focus-visible:outline-fg',
  outline: 'border border-fg/40 text-fg hover:bg-fg/10 focus-visible:outline-fg',
}

// Ringer direkte op ved tryk (tel:-link). Browseren/OS'et beder selv om
// bekræftelse før opkaldet – det kan intet website slå fra, så vi holder
// flowet til det ene nødvendige tryk i stedet for at lægge en popup foran.
function RingKnap({ variant = 'cta', className = '', children }) {
  return (
    <a
      href={`tel:${business.phoneHref}`}
      className={`press inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  )
}

export default RingKnap

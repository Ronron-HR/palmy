import { business } from '../content'

const variants = {
  gold: 'bg-gold text-green-deep hover:bg-gold-light focus-visible:outline-cream',
  green: 'bg-green-deep text-cream hover:bg-green-deep-light focus-visible:outline-green-deep',
}

// Ringer direkte op ved tryk (tel:-link). Browseren/OS'et beder selv om
// bekræftelse før opkaldet – det kan intet website slå fra, så vi holder
// flowet til det ene nødvendige tryk i stedet for at lægge en popup foran.
function RingKnap({ variant = 'green', className = '', children }) {
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

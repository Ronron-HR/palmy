import { business } from '../content'

const variants = {
  gold: 'bg-gold text-green-deep hover:bg-gold-light',
  green: 'bg-green-deep text-cream hover:bg-green-deep-light',
}

// Ringer direkte op ved tryk (tel:-link). Browseren/OS'et beder selv om
// bekræftelse før opkaldet – det kan intet website slå fra, så vi holder
// flowet til det ene nødvendige tryk i stedet for at lægge en popup foran.
function RingKnap({ variant = 'green', className = '', children }) {
  return (
    <a
      href={`tel:${business.phone}`}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  )
}

export default RingKnap

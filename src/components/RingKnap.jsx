import { business } from '../content'

// Den ENESTE knap på sitet ("Ring og bestil"): en skarp rektangel i chili. Alle
// andre handlinger er tekstlinks (`.tlink`, se index.css) — aldrig knapper.
//
// Ringer direkte op ved tryk (tel:-link). Browseren/OS'et beder selv om
// bekræftelse før opkaldet – det kan intet website slå fra, så vi holder
// flowet til det ene nødvendige tryk i stedet for at lægge en popup foran.
function RingKnap({ className = '', children }) {
  return (
    <a
      href={`tel:${business.phoneHref}`}
      className={`press label inline-flex min-h-12 items-center justify-center gap-2 bg-cta px-6 py-3 font-bold tabular-nums text-cta-fg hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
    >
      {children}
    </a>
  )
}

export default RingKnap

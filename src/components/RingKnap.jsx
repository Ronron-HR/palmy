import { useEffect, useState } from 'react'
import { business, hours } from '../content'

const variants = {
  gold: 'bg-gold text-green-deep hover:bg-gold-light',
  green: 'bg-green-deep text-cream hover:bg-green-deep-light',
}

// Knap der åbner en lille bestillings-popup med nummer og åbningstider.
// Selve opkaldet sker først på "Ring nu" inde i popup'en.
function RingKnap({ variant = 'green', className = '', children }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold transition-colors ${variants[variant]} ${className}`}
      >
        {children}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ring og bestil"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-green-deep/60 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-cream p-6 text-center shadow-xl"
          >
            <p className="font-display text-2xl font-semibold text-green-deep">
              Bestil hos {business.name}
            </p>
            <p className="mt-4 font-display text-3xl font-semibold tracking-wide text-green-deep">
              {business.phoneDisplay}
            </p>
            <p className="mt-2 text-sm text-green-deep/60">
              Åbent {hours.days.toLowerCase()} kl. {hours.time}
            </p>

            <a
              href={`tel:${business.phone}`}
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-green-deep px-6 py-3.5 text-base font-semibold text-cream transition-colors hover:bg-green-deep-light"
            >
              Ring nu
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-3 text-sm text-green-deep/60 transition-colors hover:text-green-deep"
            >
              Luk
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default RingKnap

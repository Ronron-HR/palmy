import { hours } from '../content'
import AabenStatus from './AabenStatus'

function ClockIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

function BagIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  )
}

function Aabningstider() {
  return (
    <section id="aabningstider" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold text-green-deep sm:text-4xl">
          Åbningstider
        </h2>

        <div className="mt-6 flex justify-center">
          <AabenStatus />
        </div>

        <div className="mt-10 flex flex-col items-center divide-y divide-gold/30 sm:flex-row sm:justify-center sm:divide-x sm:divide-y-0">
          {hours.schedule.map((entry) => (
            <div key={entry.day} className="px-10 py-6 sm:py-0">
              <p className="font-display text-2xl font-semibold text-green-deep sm:text-3xl">
                {entry.day}
              </p>
              <p className="mt-2 text-xl text-gold sm:text-2xl">{entry.time}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-lg text-green-deep/80">{hours.note}</p>

        {/* Tydeligt forudbestilling → afhentning-flow. */}
        <div className="mx-auto mt-8 grid max-w-lg gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border border-gold/25 bg-white/60 p-5 text-left">
            <ClockIcon className="mt-0.5 h-6 w-6 flex-shrink-0 text-gold" />
            <div>
              <p className="font-display text-lg font-semibold text-green-deep">Forudbestilling</p>
              <p className="mt-1 text-sm text-green-deep/70">{hours.preorderLine}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-gold/25 bg-white/60 p-5 text-left">
            <BagIcon className="mt-0.5 h-6 w-6 flex-shrink-0 text-gold" />
            <div>
              <p className="font-display text-lg font-semibold text-green-deep">Afhentning</p>
              <p className="mt-1 text-sm text-green-deep/70">{hours.pickupLine}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Aabningstider

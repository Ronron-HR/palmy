import { hours } from '../content'
import AabenStatus from './AabenStatus'

// Åbningstider på grøn flade — bryder rækken af cream-sektioner og giver
// tiderne én tydelig plads. Ren liste, ingen ikonkort.
function Aabningstider() {
  return (
    <section id="aabningstider" className="bg-green-deep py-16 text-cream sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 [&>*]:max-w-3xl">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] sm:text-4xl">
            Åbningstider
          </h2>
          <AabenStatus tone="light" />
        </div>

        <p className="mt-3 text-lg text-cream/85">
          Kun {hours.daysLong}. {hours.closedNote}
        </p>

        <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {hours.schedule.map((entry) => (
            <div key={entry.day} className="border-t border-gold/40 pt-4">
              <dt className="font-display text-2xl font-semibold">{entry.day}</dt>
              <dd className="mt-1 text-xl tabular-nums text-gold-light">{entry.time}</dd>
            </div>
          ))}
          <div className="border-t border-gold/40 pt-4">
            <dt className="font-semibold">Forudbestilling</dt>
            <dd className="mt-1 text-cream/85">{hours.preorderLine}</dd>
          </div>
          <div className="border-t border-gold/40 pt-4">
            <dt className="font-semibold">Afhentning</dt>
            <dd className="mt-1 text-cream/85">{hours.pickupLine}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

export default Aabningstider

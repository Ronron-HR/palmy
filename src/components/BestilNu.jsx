import { bestilTidligt } from '../content'
import AabenStatus from './AabenStatus'

// "Bestil nu": restaurantens budskab — jo tidligere man ringer, jo bedre — som en
// tidtavle med store messing-tal for dagens tre tidspunkter. Bevidst uden
// animation og uden egen Ring-knap: den faste bar i bunden (mobil) og headeren
// (desktop) har den altid ved hånden.
function BestilNu() {
  return (
    <section
      id="bestil-nu"
      aria-labelledby="bestil-nu-titel"
      className="theme-teak grain bg-bg text-fg"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <AabenStatus className="mb-6" />
        <h2
          id="bestil-nu-titel"
          className="max-w-2xl font-display text-4xl leading-[1.05] text-fg sm:text-6xl"
        >
          {bestilTidligt.heading}
        </h2>

        <ol className="mt-10 grid max-w-3xl grid-cols-3 border-y border-brass/50">
          {bestilTidligt.steps.map((step, index) => (
            <li
              key={step.time}
              className={`py-6 ${index > 0 ? 'border-l border-brass/50 pl-4 sm:pl-8' : 'pr-4 sm:pr-8'}`}
            >
              <span className="block font-display text-[2.1rem] leading-none tabular-nums text-brass sm:text-7xl">
                {step.time}
              </span>
              <span className="mt-3 block text-sm leading-snug text-muted">{step.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default BestilNu

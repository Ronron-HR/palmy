import { bestilTidligt } from '../content'

// "Bestil nu": restaurantens budskab — jo tidligere man ringer, jo bedre — som en
// tidtavle: tre enorme tal på den ene chili-flade på siden. Det ENESTE sted, hvor
// alle tre tider står sammen (heroen viser kun åbningstiden). Bevidst uden
// animation og uden egen Ring-knap: den faste bar i bunden (mobil) og headeren
// (desktop) har den altid ved hånden.
function BestilNu() {
  return (
    <section
      id="bestil-nu"
      aria-labelledby="bestil-nu-titel"
      className="theme-red bg-bg text-fg"
    >
      <div className="section-y mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="bestil-nu-titel" className="max-w-3xl font-display text-h2 text-fg">
          {bestilTidligt.heading}
        </h2>

        <ol className="mt-10 grid grid-cols-3 border-y border-line sm:mt-14">
          {bestilTidligt.steps.map((step, index) => (
            <li
              key={step.time}
              className={`py-6 sm:py-10 ${index > 0 ? 'border-l border-line pl-3 sm:pl-10' : 'pr-3 sm:pr-10'}`}
            >
              <span className="block font-display text-board tabular-nums text-fg">
                {step.time}
              </span>
              <span className="mt-3 block max-w-[15ch] text-sm leading-snug text-muted sm:mt-5 sm:text-base">
                {step.text}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default BestilNu

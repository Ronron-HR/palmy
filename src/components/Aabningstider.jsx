import { hours } from '../content'

function Aabningstider() {
  return (
    <section id="aabningstider" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold text-green-deep sm:text-4xl">
          Åbningstider
        </h2>

        <div className="mt-12 flex flex-col items-center divide-y divide-gold/30 sm:flex-row sm:justify-center sm:divide-x sm:divide-y-0">
          {hours.schedule.map((entry) => (
            <div key={entry.day} className="px-10 py-6 sm:py-0">
              <p className="font-display text-2xl font-semibold text-green-deep sm:text-3xl">
                {entry.day}
              </p>
              <p className="mt-2 text-xl text-gold sm:text-2xl">{entry.time}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-lg text-green-deep/80">{hours.note}</p>
      </div>
    </section>
  )
}

export default Aabningstider

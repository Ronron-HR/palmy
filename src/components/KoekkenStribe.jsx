import Link from './Link'
import { videos, videoSources } from '../media'

// Tre stillbilleder fra køkkenet side om side — gasflamme, wok og karry (posteren fra
// hver af køkken-loopene, som kører på /billeder). Billeder i stedet for video holder
// forsiden let: strimlen vises kun ca. 120 px bred.
function KoekkenStribe() {
  return (
    <section aria-labelledby="koekken-titel" className="theme-teak grain bg-bg text-fg">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="koekken-titel" className="font-display text-5xl leading-none text-fg sm:text-6xl">
            Fra køkkenet
          </h2>
          <Link
            to="/billeder"
            className="inline-flex min-h-11 items-center text-base font-semibold text-fg underline decoration-brass underline-offset-[6px] hover:text-brass"
          >
            Se alle billeder
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
          {['flammeWok', 'karrySimrer', 'wokRejer'].map((id) => (
            <img
              key={id}
              src={videoSources(videos[id]).poster}
              width="720"
              height="1280"
              alt=""
              loading="lazy"
              decoding="async"
              className="aspect-[9/16] w-full rounded-sm bg-surface object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default KoekkenStribe

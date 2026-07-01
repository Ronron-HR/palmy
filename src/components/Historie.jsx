import { business, frame, historie, hours } from '../content'
import { useInView } from '../hooks/useInView'

const barClasses =
  'relative z-10 flex h-9 items-center justify-center gap-2 bg-green-deep px-4 text-[10px] font-medium uppercase tracking-[0.15em] text-cream/70 lg:justify-between lg:px-8'

function SideText({ side }) {
  const label = side === 'left' ? frame.sideLabelLeft : business.name

  return (
    <div
      className={`pointer-events-none absolute inset-y-0 z-0 hidden w-9 items-center justify-center lg:flex ${
        side === 'left' ? 'left-0' : 'right-0'
      }`}
    >
      <span
        className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.3em] text-gold/70"
        style={{
          writingMode: 'vertical-rl',
          transform: side === 'left' ? 'rotate(180deg)' : undefined,
        }}
      >
        {label}
      </span>
    </div>
  )
}

function Historie() {
  const [textRef, textInView] = useInView()
  const [imageRef, imageInView] = useInView()

  return (
    <section id="historie" className="relative bg-cream">
      {/* Mobil: stablet komposition, telefon er mest fremtrædende */}
      <div className="flex flex-col items-center gap-2 bg-green-deep px-6 py-7 text-center lg:hidden">
        <a href={`tel:${business.phone}`} className="text-xl font-semibold text-cream">
          {business.phoneDisplay}
        </a>
        <span className="text-sm text-cream/80">{business.address}</span>
        <span className="text-sm text-cream/60">
          {hours.daysShort} · {hours.time}
        </span>
      </div>

      {/* Desktop: tynd enkeltlinje-bjælke */}
      <div className="relative z-10 hidden h-9 items-center justify-between gap-2 border-b border-cream/10 bg-green-deep px-8 text-[10px] font-medium uppercase tracking-[0.15em] text-cream/70 lg:flex">
        <span>{business.address}</span>
        <span>
          {hours.daysShort} · {hours.time}
        </span>
        <span>Tlf. {business.phoneDisplay}</span>
      </div>

      <SideText side="left" />
      <SideText side="right" />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div
          ref={imageRef}
          className={`order-1 transition-all duration-1000 ease-out lg:order-2 ${
            imageInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          {/* PLADSHOLDER — udskiftes når rigtige fotos er taget */}
          <img
            src={historie.image}
            alt="Thi og Nam tilbereder mad hos Palmy Spisested"
            loading="lazy"
            className="aspect-4/3 w-full rounded-2xl object-cover shadow-lg"
          />
        </div>

        <div
          ref={textRef}
          className={`relative order-2 transition-all duration-1000 ease-out lg:order-1 ${
            textInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 flex select-none items-center justify-center overflow-hidden"
          >
            <span className="whitespace-nowrap font-display text-[3.25rem] font-semibold leading-none text-gold/10 lg:text-[6rem]">
              Velkommen
            </span>
          </div>

          <h2 className="font-display text-3xl font-semibold text-green-deep sm:text-4xl">
            Historien om Palmy
          </h2>

          <div className="mt-8 flex flex-col gap-6">
            {historie.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 20)}
                className="text-lg leading-relaxed text-green-deep/85"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <p className="mt-10 font-display text-xl italic text-gold">
            {historie.closing}
          </p>
        </div>
      </div>

      <div className={`${barClasses} border-t border-cream/10`}>
        <span className="hidden lg:inline">{frame.website}</span>
        <span>{frame.tagline}</span>
        <span className="hidden lg:inline">{frame.social}</span>
      </div>
    </section>
  )
}

export default Historie

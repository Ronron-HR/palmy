import { historie } from '../content'
import { useInView } from '../hooks/useInView'

function Historie() {
  const [textRef, textInView] = useInView()
  const [imageRef, imageInView] = useInView()

  return (
    <section id="historie" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
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
            className="aspect-4/3 w-full rounded-2xl object-cover shadow-lg"
          />
        </div>

        <div
          ref={textRef}
          className={`order-2 transition-all duration-1000 ease-out lg:order-1 ${
            textInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <h2 className="font-display text-3xl font-semibold text-green-deep sm:text-4xl">
            Historien om Thi &amp; Nam
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
    </section>
  )
}

export default Historie

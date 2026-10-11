import { historie } from '../content'

// Familiens historie som ren, læsbar tekst. Ingen vandmærker, sidetekster
// eller fade-in — teksten er synlig i den prerenderede HTML.
function Historie() {
  return (
    <section id="historie" className="bg-cream">
      <div className="mx-auto max-w-5xl px-4 py-16 [&>*]:max-w-3xl sm:px-6 sm:py-24">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] text-green-deep sm:text-4xl">
          {historie.heading}
        </h2>

        <div className="mt-6 flex max-w-[62ch] flex-col gap-5">
          {historie.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 20)} className="text-lg leading-relaxed text-green-deep/85">
              {paragraph}
            </p>
          ))}
        </div>

        <p className="mt-8 font-display text-xl italic text-gold-deep">{historie.closing}</p>
      </div>
    </section>
  )
}

export default Historie

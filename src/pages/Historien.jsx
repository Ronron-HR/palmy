import { historie } from '../content'
import Layout from '../components/Layout'
import Link from '../components/Link'
import Picture from '../components/Picture'

// Historien (palmy_handoff): intro i to kolonner med køkkenfoto, familiens
// fortælling (ordret, tre kapitler) med citat, tre fotos og link til menuen.
function Historien() {
  const chapters = historie.chapters
  return (
    <Layout>
      <section className="split pt-10 md:pt-16">
        <div className="flex flex-col justify-center">
          <p className="eyebrow text-red">{historie.eyebrow}</p>
          <h1 className="page-h1 mt-3 font-serif text-green">{historie.heading}</h1>
          <p className="mt-6 max-w-(--col-text) font-serif text-lead leading-snug">{historie.lead}</p>
        </div>
        <div className="split-media">
          <Picture
            id="koekkenKarry"
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="block h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="split mt-16 md:mt-24">
        <h2 className="font-serif text-xl leading-tight text-green">{historie.h2}</h2>
        <div className="flex max-w-(--col-text) flex-col gap-8 text-md leading-long">
          {chapters.map((chapter) => (
            <div key={chapter.title}>
              <h3 className="eyebrow text-red">{chapter.title}</h3>
              <p className="mt-3">{chapter.text}</p>
              {chapter.quote && <blockquote className="quote mt-6">{chapter.quote}</blockquote>}
            </div>
          ))}
          <p>{historie.outro}</p>
        </div>
      </section>

      <ul className="trio mt-16 md:mt-24">
        <li className="trio-media" style={{ aspectRatio: '4 / 5' }}>
          <Picture id="koekkenWok" sizes="(min-width: 768px) 33vw, 100vw" className="block h-full w-full object-cover" />
        </li>
        <li className="trio-media" style={{ aspectRatio: '925 / 1410' }}>
          <Picture id="foraarsruller" sizes="(min-width: 768px) 33vw, 100vw" className="block h-full w-full object-cover" />
        </li>
        <li className="trio-media" style={{ aspectRatio: '1082 / 1250' }}>
          <Picture id="and" sizes="(min-width: 768px) 33vw, 100vw" className="block h-full w-full object-cover" />
        </li>
      </ul>

      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
        <p className="text-md">{historie.closing}</p>
        <Link to="/menu" className="btn no-underline">
          {historie.menuLink} <span aria-hidden="true" className="font-sans">↗</span>
        </Link>
      </div>
    </Layout>
  )
}

export default Historien

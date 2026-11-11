import { historie } from '../content'
import Layout from '../components/Layout'
import Link from '../components/Link'
import Picture from '../components/Picture'
import SideTitel from '../components/SideTitel'

// Historien (typografi som hovedperson): familiens tekst ordret i tre kapitler,
// citatet stort i serif, spisesalen (4:5, maks. 560) og facaden (16:9).
// Kommer der et foto af Thi og Nam, erstatter det spisesalen (BILLEDKORT.md).
function Kapitel({ title, text, first = false }) {
  return (
    <div className="flex flex-col gap-3 text-md leading-long">
      <h2 className={`font-bold ${first ? 'mt-2' : ''}`}>{title}</h2>
      <p>{text}</p>
    </div>
  )
}

function Historien() {
  const [opskrifter, pause, genaabnet] = historie.chapters
  return (
    <Layout>
      <SideTitel>{historie.heading}</SideTitel>

      <div className="mt-6">
        <Kapitel title={opskrifter.title} text={opskrifter.text} first />
      </div>

      <Picture
        id="spisesal"
        sizes="(min-width: 768px) 560px, 100vw"
        className="mt-10 block aspect-dish w-full max-w-(--img-historien) object-cover object-(--pos-spisesal)"
      />

      <div className="mt-10">
        <Kapitel title={pause.title} text={pause.text} />
      </div>

      <blockquote className="my-12 font-serif text-xl leading-heading font-bold text-balance text-green">
        {pause.quote}
      </blockquote>

      <Kapitel title={genaabnet.title} text={genaabnet.text} />

      <Picture
        id="facade"
        sizes="(min-width: 768px) 640px, 100vw"
        className="mt-10 block aspect-wide w-full object-cover object-(--pos-facade)"
      />

      <div className="mt-10 flex flex-col gap-3 text-md leading-long">
        <p>{historie.outro}</p>
        <p>{historie.closing}</p>
        <p className="mt-2 text-base">
          <Link to="/menu">{historie.menuLink}</Link>
        </p>
      </div>
    </Layout>
  )
}

export default Historien

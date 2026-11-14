import { billeder } from '../content'
import { galleri } from '../media'
import { useReveal } from '../hooks/useReveal'
import Picture from './Picture'
import LoopVideo from './LoopVideo'

// /billeder: grid med billedernes eget format, billedtekst under hvert.
// Fotos afsløres nedefra én gang.
function Foto({ item }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="gallery-media" style={{ aspectRatio: item.ratio }}>
      <Picture
        id={item.image}
        sizes="(min-width: 1100px) 360px, (min-width: 640px) 50vw, 100vw"
        className="block h-full w-full object-cover"
      />
    </div>
  )
}

function Galleri() {
  return (
    <ul className="gallery-grid mt-14">
      {galleri.map((item, i) => (
        <li key={item.image ?? item.video}>
          <figure className="m-0">
            {item.type === 'image' ? (
              <Foto item={item} />
            ) : (
              <div className="gallery-media" style={{ aspectRatio: item.ratio }}>
                <LoopVideo
                  id={item.video}
                  className="block h-full w-full object-cover"
                  style={{ objectPosition: `var(--pos-${item.pos})` }}
                />
              </div>
            )}
            <figcaption className="eyebrow mt-3 text-red">{billeder.captions[i]}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
}

export default Galleri

import { billeder } from '../content'
import { galleri } from '../media'
import { useReveal } from '../hooks/useReveal'
import Picture from './Picture'
import LoopVideo from './LoopVideo'

// Billeder-siden: én spalte, 48 mellem billederne, billedtekst 14 under.
// Fotos afsløres nedefra én gang (MOTION.md); videoer følger LoopVideo.
const ASPECT = { dish: 'aspect-dish', wide: 'aspect-wide' }
const SIZES = '(min-width: 768px) 640px, 100vw'

function Foto({ item }) {
  const ref = useReveal()
  return (
    <div ref={ref}>
      <Picture
        id={item.image}
        sizes={SIZES}
        className={`block w-full object-cover ${ASPECT[item.aspect]}`}
        style={{ objectPosition: `var(--pos-${item.pos})` }}
      />
    </div>
  )
}

function Galleri() {
  return (
    <div className="mt-8 flex flex-col gap-12">
      {galleri.map((item, i) => (
        <figure key={item.image ?? item.video}>
          {item.type === 'image' ? (
            <Foto item={item} />
          ) : (
            <LoopVideo
              id={item.video}
              className={`block h-auto w-full bg-black object-cover ${ASPECT[item.aspect]}`}
              style={{ objectPosition: `var(--pos-${item.pos})` }}
            />
          )}
          <figcaption className="mt-2 text-xs">{billeder.captions[i]}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export default Galleri

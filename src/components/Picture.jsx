import { images } from '../media'

// <picture> med AVIF først og WebP som fallback (BILLEDKORT.md). width/height
// fra den midterste størrelse, så siden aldrig hopper; srcset lader browseren
// vælge bredden efter `sizes`. loading="lazy" er standard; `priority` kun for
// billeder i første skærm. `imgRef` bruges af foto-reveal (useReveal).
function Picture({ id, sizes = '100vw', priority = false, className = '', alt, imgRef, style }) {
  const img = images[id]
  const url = (w, h, ext) =>
    img.handoff
      ? `/images/${img.dir}/${img.handoff}-${w}.webp`
      : `/images/${img.dir}/palmy-${img.name}-${w}x${h}.${ext}`
  const srcset = (ext) => img.sizes.map(([w, h]) => `${url(w, h, ext)} ${w}w`).join(', ')
  const [fw, fh] = img.sizes[Math.min(1, img.sizes.length - 1)]

  return (
    <picture>
      {!img.webpOnly && <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />}
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        ref={imgRef}
        src={url(fw, fh, 'webp')}
        width={fw}
        height={fh}
        alt={alt ?? img.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        className={className}
        style={style}
      />
    </picture>
  )
}

export default Picture

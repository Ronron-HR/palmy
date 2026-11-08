import { images } from '../media'

// <picture> med AVIF først og WebP som fallback. width/height sættes fra det
// valgte (midterste) format, så siden aldrig hopper; srcset lader browseren
// vælge bredden efter `sizes`. Under folden: loading="lazy" (default). Kun
// hero-lignende billeder skal have priority.
function Picture({ id, sizes = '100vw', priority = false, className = '', alt }) {
  const img = images[id]
  const url = (w, h, ext) => `/images/${img.dir}/palmy-${img.name}-${w}x${h}.${ext}`
  const srcset = (ext) => img.sizes.map(([w, h]) => `${url(w, h, ext)} ${w}w`).join(', ')
  const [fw, fh] = img.sizes[Math.min(1, img.sizes.length - 1)]

  return (
    <picture>
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={url(fw, fh, 'webp')}
        width={fw}
        height={fh}
        alt={alt ?? img.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        className={className}
      />
    </picture>
  )
}

export default Picture

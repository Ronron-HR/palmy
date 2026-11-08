import { useEffect, useRef } from 'react'
import { videos, videoSources } from '../media'

// Kort, lydløst loop fra køkkenet. Dekorativt (aria-hidden), og det gør ikke
// siden tung:
//  - preload="none": intet hentes, før videoen nærmer sig skærmen
//  - spiller kun mens den er synlig (sparer CPU/batteri)
//  - ved reduced motion, "spar data" og meget langsom forbindelse startes den
//    aldrig — posteren bliver stående
function LoopVideo({ id, className = '' }) {
  const ref = useRef(null)
  const sources = videoSources(videos[id])

  useEffect(() => {
    const video = ref.current
    if (!video) return
    video.muted = true // lydløs som property, ikke kun som attribut

    const connection = navigator.connection
    const skip =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      connection?.saveData === true ||
      /(^|-)2g$/.test(connection?.effectiveType ?? '')
    if (skip) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay afvist (fx strømsparetilstand) — posteren står tilbage.
          })
        } else {
          video.pause()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className={`loop-video ${className}`}
      muted
      loop
      playsInline
      preload="none"
      poster={sources.poster}
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={sources.webm} type="video/webm" />
      <source src={sources.mp4} type="video/mp4" />
    </video>
  )
}

export default LoopVideo

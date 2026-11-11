import { useEffect, useRef } from 'react'
import { videos, videoSources } from '../media'

// Kort, lydløst loop fra køkkenet (MOTION.md "Videoer"):
// - muted playsinline loop preload="none" poster aria-hidden. Ingen autoplay.
//   Posteren sættes, når videoen er nær skærmen (sparer ~110 KB ved load).
// - Afspilles kun, når mindst 50 % er i billedet; pauses, så snart den forlader.
// - prefers-reduced-motion: reduce eller navigator.connection.saveData:
//   afspilning startes aldrig — kun posterbilledet vises.
function LoopVideo({ id, className = '', style }) {
  const ref = useRef(null)
  const sources = videoSources(videos[id])

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (!('IntersectionObserver' in window)) {
      video.poster = sources.poster
      return
    }
    video.muted = true // også som property (iOS)

    // Posteren hentes først, når videoen er under en skærmhøjde væk, så den
    // ikke konkurrerer med sidens første billede.
    const near = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          video.poster = sources.poster
          near.disconnect()
        }
      },
      { rootMargin: '100% 0px' },
    )
    near.observe(video)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = navigator.connection?.saveData === true
    if (reduced || saveData) return () => near.disconnect()

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.intersectionRatio >= 0.5) video.play().catch(() => {})
          else video.pause()
        }
      },
      { threshold: [0, 0.5] },
    )
    io.observe(video)
    return () => {
      near.disconnect()
      io.disconnect()
    }
  }, [sources.poster])

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      muted
      loop
      playsInline
      preload="none"
      width={720}
      height={1280}
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={sources.webm} type="video/webm" />
      <source src={sources.mp4} type="video/mp4" />
    </video>
  )
}

export default LoopVideo

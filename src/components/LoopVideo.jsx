import { useEffect, useRef } from 'react'
import { videos, videoSources } from '../media'

// Kort, lydløst loop fra køkkenet (MOTION.md "Videoer"):
// - muted playsinline loop preload="none" poster aria-hidden. Ingen autoplay.
// - Afspilles kun, når mindst 50 % er i billedet; pauses, så snart den forlader.
// - prefers-reduced-motion: reduce eller navigator.connection.saveData:
//   afspilning startes aldrig — kun posterbilledet vises.
function LoopVideo({ id, className = '', style }) {
  const ref = useRef(null)
  const sources = videoSources(videos[id])

  useEffect(() => {
    const video = ref.current
    if (!video || !('IntersectionObserver' in window)) return
    video.muted = true // også som property (iOS)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = navigator.connection?.saveData === true
    if (reduced || saveData) return

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
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      muted
      loop
      playsInline
      preload="none"
      poster={sources.poster}
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

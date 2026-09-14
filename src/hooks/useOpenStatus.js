import { useEffect, useState } from 'react'
import { getOpenStatus } from '../lib/openStatus'

// Live åben/lukket-status der genberegnes hvert minut, så badge og CTA'er
// altid er korrekte uden at siden skal genindlæses.
export function useOpenStatus() {
  const [status, setStatus] = useState(() => getOpenStatus())

  useEffect(() => {
    const tick = () => setStatus(getOpenStatus())
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])

  return status
}

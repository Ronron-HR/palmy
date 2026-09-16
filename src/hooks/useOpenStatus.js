import { useSyncExternalStore } from 'react'
import { hours } from '../content'
import { getOpenStatus } from '../lib/openStatus'

// Live åben/lukket-status der genberegnes hvert minut, så badge og CTA'er
// altid er korrekte uden at siden skal genindlæses.
//
// Implementeret som ekstern store (useSyncExternalStore) af én grund: siderne
// prerenderes til statisk HTML ved build, og build-tidspunktet siger intet om
// hvornår gæsten kigger. Serveren rendrer derfor en neutral, altid-sand
// status ("Åbent fredag & lørdag"); React hydrerer med den og skifter straks
// til den rigtige, live status — uden hydration-fejl.

const SERVER_STATUS = Object.freeze({
  state: 'UNKNOWN',
  label: `Åbent ${hours.days.toLowerCase()}`,
  cta: 'Ring og bestil',
  subLine: null,
})

const listeners = new Set()
let snapshot = null
let timer = null

function refresh() {
  snapshot = getOpenStatus()
  listeners.forEach((listener) => listener())
}

function subscribe(listener) {
  listeners.add(listener)
  if (listeners.size === 1) {
    refresh()
    timer = setInterval(refresh, 60_000)
  }
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0 && timer) {
      clearInterval(timer)
      timer = null
    }
  }
}

function getSnapshot() {
  if (!snapshot) snapshot = getOpenStatus()
  return snapshot
}

function getServerSnapshot() {
  return SERVER_STATUS
}

export function useOpenStatus() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

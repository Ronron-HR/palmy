import { hours } from '../content'

// Live åben/lukket-status ud fra den besøgendes egen ur (restaurant og gæster
// er i samme tidszone). Returnerer en tilstand + kort tekst, så tiderne på
// siden faktisk virker og ikke kun står som statisk tekst.
//
// Tilstande:
//   'open'     – afhentning i gang (16.00–20.30 fre/lør)
//   'preorder' – forudbestilling åben, afhentning ikke startet (15.00–16.00)
//   'closed'   – lukket; `detail` fortæller hvornår der åbnes igen

const WEEKDAYS = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag']

function minutesToLabel(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}.${String(m).padStart(2, '0')}`
}

// Find næste åbningsdag/-tidspunkt fra (day, minutes) og frem.
function nextOpening(day, minutes) {
  for (let offset = 0; offset < 8; offset++) {
    const d = (day + offset) % 7
    if (!hours.openDays.includes(d)) continue
    // Samme dag tæller kun med, hvis vi er før afhentning slutter.
    if (offset === 0 && minutes >= hours.openUntilMinutes) continue

    let whenDay
    if (offset === 0) whenDay = 'i dag'
    else if (offset === 1) whenDay = 'i morgen'
    else whenDay = WEEKDAYS[d]

    return `Åbner ${whenDay} kl. ${minutesToLabel(hours.openFromMinutes)}`
  }
  return `Åbner ${WEEKDAYS[hours.openDays[0]]} kl. ${minutesToLabel(hours.openFromMinutes)}`
}

export function getOpenStatus(now = new Date()) {
  const day = now.getDay()
  const minutes = now.getHours() * 60 + now.getMinutes()
  const isOpenDay = hours.openDays.includes(day)

  if (isOpenDay && minutes >= hours.openFromMinutes && minutes < hours.openUntilMinutes) {
    return {
      state: 'open',
      label: 'Åbent nu',
      detail: `Afhentning indtil kl. ${hours.openUntil}.`,
    }
  }

  if (isOpenDay && minutes >= hours.preorderFromMinutes && minutes < hours.openFromMinutes) {
    return {
      state: 'preorder',
      label: 'Forudbestilling åben',
      detail: `Ring og bestil nu – afhentning fra kl. ${hours.openFrom}.`,
    }
  }

  return {
    state: 'closed',
    label: 'Lukket nu',
    detail: nextOpening(day, minutes),
  }
}

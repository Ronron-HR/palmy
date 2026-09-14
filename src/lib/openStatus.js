import { hours } from '../content'

// Live åben/lukket-status i TRE tilstande, altid beregnet i eksplicit
// Europe/Copenhagen (ikke brugerens egen enhed), så en gæst i en anden tidszone
// stadig ser restaurantens rigtige status.
//
//   OPEN      – åbningsdag, 16.00–20.30 (afhentning i gang)
//   PREORDER  – åbningsdag, 15.00–16.00 (tager imod forudbestillinger)
//   CLOSED    – alt andet; `subLine` peger på NÆSTE forudbestillingstidspunkt
//
// Manuelle lukkedage (hours.closedDates) overtrumfer åbningsdage og slår BÅDE
// OPEN og PREORDER fra.

const WEEKDAYS_DA = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag']
const WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

const toMinutes = (hm) => {
  const [h, m] = hm.split(':').map(Number)
  return h * 60 + m
}
const dkTime = (hm) => hm.replace(':', '.')

// Nuværende ugedag (0-6), minutter siden midnat og ISO-dato i Europe/Copenhagen.
function copenhagenParts(date) {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Copenhagen',
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  })
  const p = Object.fromEntries(fmt.formatToParts(date).map((x) => [x.type, x.value]))
  return {
    day: WEEKDAY_INDEX[p.weekday],
    minutes: Number(p.hour) * 60 + Number(p.minute),
    isoDate: `${p.year}-${p.month}-${p.day}`,
  }
}

function isClosedDate(isoDate) {
  return hours.closedDates.includes(isoDate)
}

// Tekst til næste forudbestillingsvindue (peger på 15.00, hvor telefonen først
// tages — ikke på åbningstidspunktet). Springer lukkedage og ikke-åbningsdage
// over. ISO-datoer beregnes i UTC-middag, så DST aldrig flytter en hel dag.
function nextPreorderLine(day, minutes, isoDate) {
  const preMin = toMinutes(hours.preorderStart)
  const baseNoonUtc = new Date(`${isoDate}T12:00:00Z`).getTime()

  for (let offset = 0; offset < 14; offset++) {
    const wd = (day + offset) % 7
    if (!hours.openDays.includes(wd)) continue
    const iso = new Date(baseNoonUtc + offset * 86400000).toISOString().slice(0, 10)
    if (isClosedDate(iso)) continue
    // I dag tæller kun med, hvis forudbestillingsvinduet ikke allerede er startet.
    if (offset === 0 && minutes >= preMin) continue

    const when = offset === 0 ? 'i dag' : offset === 1 ? 'i morgen' : WEEKDAYS_DA[wd]
    return `Vi tager imod forudbestillinger fra ${when} kl. ${dkTime(hours.preorderStart)}`
  }
  return `Vi tager imod forudbestillinger fra kl. ${dkTime(hours.preorderStart)}`
}

export function getOpenStatus(now = new Date()) {
  const { day, minutes, isoDate } = copenhagenParts(now)
  const openDay = hours.openDays.includes(day) && !isClosedDate(isoDate)

  const pre = toMinutes(hours.preorderStart)
  const open = toMinutes(hours.openTime)
  const close = toMinutes(hours.closeTime)

  if (openDay && minutes >= open && minutes < close) {
    return {
      state: 'OPEN',
      label: `Åbent nu – lukker ${dkTime(hours.closeTime)}`,
      cta: 'Ring og bestil',
      subLine: null,
    }
  }

  if (openDay && minutes >= pre && minutes < open) {
    return {
      state: 'PREORDER',
      label: 'Tager imod forudbestillinger',
      cta: 'Ring og forudbestil',
      subLine: `Afhentning fra kl. ${dkTime(hours.openTime)}`,
    }
  }

  return {
    state: 'CLOSED',
    label: 'Lukket nu',
    cta: 'Ring og bestil',
    subLine: nextPreorderLine(day, minutes, isoDate),
  }
}

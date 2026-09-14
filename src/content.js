// ÉNESTE KILDE TIL FAKTA — telefon, adresse, tider, priser, tekster.
// Ret KUN her. Komponenter må aldrig hardcode disse værdier.

export const business = {
  name: 'Palmy Spisested',
  phone: '+45 81 75 42 99',
  phoneDisplay: '81 75 42 99',
  address: 'Hjortshøj Stationsvej 6, 8530 Hjortshøj',
  googleMapsUrl: 'https://maps.google.com/?q=Hjortshøj+Stationsvej+6,+8530+Hjortshøj',
}

// ── Tider ét sted ────────────────────────────────────────────
// De tre tidspunkter findes KUN her (HH:MM). Alle visningstekster og den live
// åben/lukket-status (src/lib/openStatus.js) afledes af dem, så tiderne aldrig
// kommer i utakt.
const preorderStart = '15:00' // telefonen åbner for forudbestilling
const openTime = '16:00' // første afhentning
const closeTime = '20:30' // sidste afhentning / lukketid
const dk = (t) => t.replace(':', '.') // '16:00' → '16.00' (dansk visning)

export const hours = {
  days: 'Fredag & lørdag',
  daysShort: 'Fre & lør',
  // openDays: 0=søndag … 5=fredag, 6=lørdag.
  openDays: [5, 6],
  // Manuelle lukkedage (ISO 'yyyy-mm-dd') der OVERTRUMFER openDays — slår både
  // OPEN og PREORDER fra (helligdage, ferie). Fx: ['2025-12-24', '2025-12-25'].
  closedDates: [],
  preorderStart, // '15:00'
  openTime, // '16:00'
  closeTime, // '20:30'
  time: `${dk(openTime)}–${dk(closeTime)}`,
  schedule: [
    { day: 'Fredag', time: `${openTime}–${closeTime}` },
    { day: 'Lørdag', time: `${openTime}–${closeTime}` },
  ],
  note: 'Vi har kun åbent fredag og lørdag – så kig forbi, mens vi har åbent.',
  // Kort linje brugt flere steder (menu, kontakt, footer).
  preorderNote: `Forudbestil fra kl. ${dk(preorderStart)} – afhent fra kl. ${dk(openTime)} og helt frem til lukketid kl. ${dk(closeTime)}.`,
  // Todelt forklaring til Åbningstider-sektionen.
  preorderLine: `Ring og forudbestil allerede fra kl. ${dk(preorderStart)}.`,
  pickupLine: `Afhentning fra kl. ${dk(openTime)} og frem til vi lukker kl. ${dk(closeTime)}.`,
}

export const menuInfo = {
  numberNote:
    'Numrene følger vores menukort – du kan bestille efter nummer, når du ringer.',
}

export const frame = {
  website: 'palmyspisested.com',
  tagline: 'Vietnamesisk mad med kærlighed',
  // PLADSHOLDER — indsæt rigtigt Instagram/Facebook-handle, eller udelad
  social: '@palmyspisested',
  sideLabelLeft: 'Åbent fredag & lørdag',
}

export const nav = [
  { label: 'Forside', href: '#forside' },
  { label: 'Menu', href: '#menu' },
  { label: 'Historie', href: '#historie' },
  { label: 'Kontakt', href: '#kontakt' },
]

export const hero = {
  image: '/images/palmy-hero-banner.png',
  heading: 'Smag kvalitet – frisklavet mad hver weekend.',
  subheading: 'Ring og bestil – vi har åbent fredag og lørdag, 16:00–20:30.',
}

// Kuraterede favoritter til foto-carousellen under heroen. `number` peger på
// en ret i data/menu.ts — navn og pris hentes DERFRA (aldrig hardcode her), så
// sektionen aldrig kan skride fra menukortet. `image` er filnavn-stammen i
// /images/signatur/ (script: scripts/process-signatur-images.mjs).
export const signatur = {
  heading: 'Smag et par af favoritterne',
  intro: 'Et lille udpluk fra kortet – frisklavet, som du får det hos os.',
  dishes: [
    { number: 3, image: 'nr3', alt: 'Stegte nudler med kylling, broccoli og gulerod på tallerken' },
    { number: 6, image: 'nr6', alt: 'Sprødstegt and med ris og mørk kinesisk sød sauce' },
    { number: 4, image: 'nr4', alt: 'Stegte nudler med oksekød og friske grøntsager' },
  ],
}

export const historie = {
  image: '/images/placeholder-historie.jpg',
  paragraphs: [
    'Palmy Spisested er en familiedrevet restaurant, startet af Thi og Nam. Med familiens opskrifter som fundament åbnede de deres vietnamesiske restaurant i Danmark – og den blev hurtigt et sted med mange glade, loyale gæster.',
    'Da livet ændrede sig, satte de restauranten på pause for at fokusere på uddannelse, arbejde og familie. Men drømmen om en dag at åbne igen forsvandt aldrig.',
    'I dag har de valgt at genåbne. Restauranten har åbent hver fredag og lørdag fra kl. 16.00 til 20.30, hvor de personligt tilbereder maden med samme kærlighed og omhu som altid.',
    'Når du besøger os, håber vi du får mere end et godt måltid – en oplevelse, hvor smagen og stemningen bringer dig tættere på vietnamesisk mad lavet med hjertet.',
  ],
  closing: 'Kom forbi og smag selv – fredag eller lørdag.',
}

export const kontakt = {
  closing: 'Vi glæder os til at se dig – fredag eller lørdag.',
}

// Menudata (retter, priser, numre) bor i ../data/menu.ts — det er den eneste
// kilde til menuen, delt af kundemenuen, bestillingsvisningen og printkortet.

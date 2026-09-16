// ÉNESTE KILDE TIL FAKTA — telefon, adresse, tider, priser, tekster.
// Ret KUN her. Komponenter må aldrig hardcode disse værdier.

const street = 'Hjortshøj Stationsvej 6'
const postalCode = '8530'
const city = 'Hjortshøj'

export const business = {
  name: 'Palmy Spisested',
  // Kort, naturlig beskrivelse brugt i metadata og schema — ikke i UI-tekst.
  kind: 'vietnamesisk restaurant og takeaway',
  phone: '+45 81 75 42 99',
  phoneDisplay: '81 75 42 99',
  // tel:-links skal være uden mellemrum for at virke på alle enheder.
  phoneHref: '+4581754299',
  street,
  postalCode,
  city,
  address: `${street}, ${postalCode} ${city}`,
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
  daysLong: 'fredag og lørdag',
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
  // PLADSHOLDER — indsæt rigtigt Instagram/Facebook-handle, eller udelad.
  // Bruges bevidst IKKE som sameAs i schema, før det er en rigtig profil.
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
  heading: 'Vietnamesisk mad i Hjortshøj',
  subheading: `Palmy Spisested er en lille familiedrevet restaurant med frisklavet vietnamesisk mad og takeaway. Ring og bestil – vi har åbent ${hours.daysLong} kl. ${hours.time}.`,
  alt: 'Bord med retter fra Palmy Spisested: sprødstegt and i sauce, stegte nudler med oksekød, forårsruller og ris',
}

// Kuraterede favoritter til foto-carousellen under heroen. `number` peger på
// en ret i data/menu.ts — navn og pris hentes DERFRA (aldrig hardcode her), så
// sektionen aldrig kan skride fra menukortet. `image` er filnavn-stammen i
// /images/signatur/ (script: scripts/process-signatur-images.mjs).
export const signatur = {
  heading: 'Smag et par af favoritterne',
  intro: 'Et lille udpluk fra kortet – frisklavet, som du får det hos os.',
  dishes: [
    { number: 3, image: 'nr3', alt: 'Stegte nudler med kylling, broccoli og gulerod fra Palmy Spisested' },
    { number: 6, image: 'nr6', alt: 'Sprødstegt and med ris og mørk kinesisk sød sauce fra Palmy Spisested' },
    { number: 4, image: 'nr4', alt: 'Stegte nudler med oksekød og friske grøntsager fra Palmy Spisested' },
  ],
}

export const historie = {
  heading: 'Historien om Palmy Spisested',
  paragraphs: [
    'Palmy Spisested er en familiedrevet restaurant, startet af Thi og Nam. Med familiens opskrifter som fundament åbnede de deres vietnamesiske restaurant i Danmark – og den blev hurtigt et sted med mange glade, loyale gæster.',
    'Da livet ændrede sig, satte de restauranten på pause for at fokusere på uddannelse, arbejde og familie. Men drømmen om en dag at åbne igen forsvandt aldrig.',
    'I dag har de valgt at genåbne i Hjortshøj. Restauranten har åbent hver fredag og lørdag fra kl. 16.00 til 20.30, hvor de personligt tilbereder maden med samme kærlighed og omhu som altid.',
    'Når du besøger os, håber vi du får mere end et godt måltid – en oplevelse, hvor smagen og stemningen bringer dig tættere på vietnamesisk mad lavet med hjertet.',
  ],
  closing: 'Kom forbi og smag selv – fredag eller lørdag.',
}

export const kontakt = {
  heading: 'Find os i Hjortshøj',
  closing: 'Vi glæder os til at se dig – fredag eller lørdag.',
}

// Ofte stillede spørgsmål. Svarene bygger KUN på oplysninger, der allerede
// står andre steder på siden (tider, adresse, telefon, menu). Bruges både i
// FAQ-sektionen på forsiden og i FAQPage-schema (src/seo.js).
export const faq = {
  heading: 'Ofte stillede spørgsmål',
  items: [
    {
      question: 'Hvor ligger Palmy Spisested?',
      answer: `Vi ligger på ${business.address} – nord for Aarhus. Du kan finde vej via Google Maps.`,
      link: { label: 'Se på Google Maps', href: business.googleMapsUrl, external: true },
    },
    {
      question: 'Hvornår har I åbent?',
      answer: `Vi har åbent ${hours.daysLong} kl. ${hours.time}. Resten af ugen holder vi lukket.`,
    },
    {
      question: 'Hvornår kan jeg bestille takeaway?',
      answer: `Ring til os på ${business.phoneDisplay} – vi tager imod forudbestillinger fra kl. ${dk(preorderStart)} ${hours.daysLong}. Maden kan hentes fra kl. ${dk(openTime)} og frem til vi lukker kl. ${dk(closeTime)}.`,
    },
    {
      question: 'Kan jeg bestille online?',
      answer: 'Nej – al bestilling foregår over telefonen. Det går hurtigst, hvis du bestiller efter nummeret på menukortet.',
    },
    {
      question: 'Hvilken slags mad laver I?',
      answer: 'Vietnamesisk mad efter familiens egne opskrifter – blandt andet hjemmelavede forårsruller, stegte nudler, Bún og rød karry. Der er også en lille børnemenu.',
    },
    {
      question: 'Hvor kan jeg se menuen?',
      answer: 'Hele menukortet med priser står her på forsiden, og du kan også åbne det som en selvstændig side.',
      link: { label: 'Åbn menukortet', href: '/menu' },
    },
  ],
}

// Menudata (retter, priser, numre) bor i ../data/menu.ts — det er den eneste
// kilde til menuen, delt af kundemenuen, bestillingsvisningen og printkortet.

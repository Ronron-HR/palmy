// ÉNESTE KILDE TIL FAKTA — telefon, adresse, tider, priser, tekster.
// Ret KUN her. Komponenter må aldrig hardcode disse værdier.

export const business = {
  name: 'Palmy Spisested',
  phone: '+45 81 75 42 99',
  phoneDisplay: '81 75 42 99',
  address: 'Hjortshøj Stationsvej 6, 8530 Hjortshøj',
  googleMapsUrl: 'https://maps.google.com/?q=Hjortshøj+Stationsvej+6,+8530+Hjortshøj',
}

export const hours = {
  days: 'Fredag & lørdag',
  daysShort: 'Fre & lør',
  time: '16.00–20.30',
  // Strukturerede tider — bruges både til visning og til den live åben/lukket-
  // status (src/lib/openStatus.js). openDays: 0=søndag … 5=fredag, 6=lørdag.
  openDays: [5, 6],
  preorderFromMinutes: 15 * 60, // kl. 15.00: telefonen åbner for forudbestilling
  openFromMinutes: 16 * 60, // kl. 16.00: første afhentning
  openUntilMinutes: 20 * 60 + 30, // kl. 20.30: sidste afhentning / lukketid
  preorderFrom: '15.00',
  openFrom: '16.00',
  openUntil: '20.30',
  schedule: [
    { day: 'Fredag', time: '16:00–20:30' },
    { day: 'Lørdag', time: '16:00–20:30' },
  ],
  note: 'Vi har kun åbent fredag og lørdag – så kig forbi, mens vi har åbent.',
  // Kort linje brugt flere steder (hero, menu, kontakt).
  preorderNote: 'Forudbestil fra kl. 15.00 – afhent fra kl. 16.00 og helt frem til lukketid kl. 20.30.',
  // Todelt forklaring til Åbningstider-sektionen.
  preorderLine: 'Ring og forudbestil allerede fra kl. 15.00.',
  pickupLine: 'Afhentning fra kl. 16.00 og frem til vi lukker kl. 20.30.',
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

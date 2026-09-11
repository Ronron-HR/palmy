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
  schedule: [
    { day: 'Fredag', time: '16:00–20:30' },
    { day: 'Lørdag', time: '16:00–20:30' },
  ],
  note: 'Vi har kun åbent fredag og lørdag – så kig forbi, mens vi har åbent.',
  preorderNote: 'Du kan ringe og forudbestille allerede fra kl. 15.00 – vi åbner og henter/serverer først kl. 16.00.',
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

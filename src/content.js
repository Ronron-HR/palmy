// ÉNESTE KILDE TIL FAKTA — telefon, adresse, tider, priser, tekster.
// Ret KUN her. Komponenter må aldrig hardcode disse værdier.

export const business = {
  name: 'Palmy Spisested',
  // PLADSHOLDER — indsæt rigtigt telefonnummer
  phone: '+45 12 34 56 78',
  phoneDisplay: '12 34 56 78',
  // PLADSHOLDER — indsæt rigtig adresse
  address: 'Hjortshøjvej 1, 8530 Hjortshøj',
  googleMapsUrl: 'https://maps.google.com/?q=Palmy+Spisested+Hjortshøj',
}

export const nav = [
  { label: 'Forside', href: '#forside' },
  { label: 'Menu', href: '#menu' },
  { label: 'Historie', href: '#historie' },
  { label: 'Kontakt', href: '#kontakt' },
]

export const hero = {
  image: '/images/placeholder-hero.png',
  heading: 'Smag kvalitet – frisklavet mad hver weekend.',
  subheading: 'Ring og bestil – vi har åbent fredag og lørdag, 16:00–20:30.',
}

export const historie = {
  image: '/images/placeholder-historie.png',
  paragraphs: [
    'Palmy Spisested er en familiedrevet restaurant, startet af Thi og Nam. Med familiens opskrifter som fundament åbnede de deres vietnamesiske restaurant i Danmark – og den blev hurtigt et sted med mange glade, loyale gæster.',
    'Da livet ændrede sig, satte de restauranten på pause for at fokusere på uddannelse, arbejde og familie. Men drømmen om en dag at åbne igen forsvandt aldrig.',
    'I dag har de valgt at genåbne. Restauranten har åbent hver fredag og lørdag fra kl. 16.00 til 20.30, hvor de personligt tilbereder maden med samme kærlighed og omhu som altid.',
    'Når du besøger os, håber vi du får mere end et godt måltid – en oplevelse, hvor smagen og stemningen bringer dig tættere på vietnamesisk mad lavet med hjertet.',
  ],
  closing: 'Kom forbi og smag selv – fredag eller lørdag.',
}

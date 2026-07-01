// ÉNESTE KILDE TIL FAKTA — telefon, adresse, tider, priser, tekster.
// Ret KUN her. Komponenter må aldrig hardcode disse værdier.

export const business = {
  name: 'Palmy Spisested',
  // PLADSHOLDER — indsæt rigtigt telefonnummer
  phone: '+45 12 34 56 78',
  phoneDisplay: '12 34 56 78',
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
}

export const frame = {
  // PLADSHOLDER — indsæt rigtigt website-domæne når det findes
  website: 'palmyspisested.dk',
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
  image: '/images/placeholder-hero.jpg',
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

export const menu = {
  forretter: [
    { navn: 'Luksus forårsruller (1 stk)', pris: '45 kr', billede: '/images/placeholder-food.jpg' },
    { navn: 'Luksus forårsruller (3 stk)', pris: '120 kr', billede: '/images/placeholder-food.jpg' },
    { navn: 'Fem små forårsruller', pris: '45 kr', billede: '/images/placeholder-food.jpg' },
  ],
  hovedretter: [
    { navn: 'Stegte nudler med kylling og grøntsager', pris: '95 kr', billede: '/images/placeholder-food.jpg' },
    { navn: 'Stegte nudler med oksekød og grøntsager', pris: '95 kr', billede: '/images/placeholder-food.jpg' },
    { navn: 'Stegte ris med skinke, rejer, gulerødder, ærter og æg', pris: '95 kr', billede: '/images/placeholder-food.jpg' },
    { navn: 'Stegt and med ris/nudler og kinesisk svampe sauce', pris: '115 kr', billede: '/images/placeholder-food.jpg' },
    { navn: 'Indbagte store rejer med sur-sød sauce (ris)', pris: '95 kr', billede: '/images/placeholder-food.jpg' },
    { navn: 'Risnudler med rejer og grøntsager (Tom Yum Goong) – stærk', pris: '95 kr', billede: '/images/placeholder-food.jpg' },
    { navn: 'Ris med stegt kylling, grøntsager, ingefær og chili – stærk', pris: '95 kr', billede: '/images/placeholder-food.jpg' },
    { navn: 'Oksekød eller kylling med peberfrugt, løg og bambus i rød karry – stærk', pris: '95 kr', billede: '/images/placeholder-food.jpg' },
    { navn: 'Rød karry med ris/risnudler (med and)', pris: '115 kr', billede: '/images/placeholder-food.jpg' },
    { navn: 'Rød karry med ris/risnudler (med kylling)', pris: '95 kr', billede: '/images/placeholder-food.jpg' },
    { navn: 'Rød karry med ris/risnudler (med oksekød)', pris: '95 kr', billede: '/images/placeholder-food.jpg' },
  ],
  ekstraRetter: [
    { navn: '1/2 grillkylling med pommes frites', pris: '110 kr', billede: '/images/placeholder-food.jpg' },
    { navn: 'Pommes frites (stor portion)', pris: '35 kr', billede: '/images/placeholder-food.jpg' },
    { navn: 'Vietnamesisk bún special', pris: '110 kr', billede: '/images/placeholder-food.jpg' },
    { navn: 'Tom kha gai (med kylling)', pris: '95 kr', billede: '/images/placeholder-food.jpg' },
    { navn: 'Tom kha gai (med rejer)', pris: '105 kr', billede: '/images/placeholder-food.jpg' },
    { navn: 'Indbagt kylling med sur-sød sauce (ris)', pris: '95 kr', billede: '/images/placeholder-food.jpg' },
    { navn: 'Indbagte rejer med sur-sød sauce (ris)', pris: '95 kr', billede: '/images/placeholder-food.jpg' },
  ],
  boernemenu: [
    { navn: 'Crispy chicken burger (med salat, agurk, pommes frites)', pris: '79 kr', billede: '/images/placeholder-food.jpg' },
    { navn: 'Chicken nuggets (6 stk, med pommes frites og ketchup)', pris: '69 kr', billede: '/images/placeholder-food.jpg' },
  ],
  drikkevarer: [
    { navn: 'Pepsi 33 cl', pris: '20 kr' },
    { navn: 'Pepsi Max 33 cl', pris: '20 kr' },
  ],
  tilbehoer: [
    { navn: 'Ekstra ris', pris: '20 kr' },
    { navn: 'Ekstra kylling', pris: '25 kr' },
    { navn: 'Ekstra svinekød', pris: '25 kr' },
    { navn: 'Ekstra oksekød', pris: '25 kr' },
    { navn: 'Ekstra and', pris: '30 kr' },
    { navn: 'Ekstra nudler', pris: '20 kr' },
    { navn: 'Ekstra peanuts', pris: '10 kr' },
    { navn: 'Ekstra sur-sød sauce', pris: '10 kr' },
  ],
}

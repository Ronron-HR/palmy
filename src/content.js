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

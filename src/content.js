// ÉNESTE KILDE TIL FAKTA — telefon, adresse, tider, priser, tekster.
// Ret KUN her. Komponenter må aldrig hardcode disse værdier.
// Billeder og videoer bor i ./media.js.

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
  googleMapsUrl: 'https://maps.google.com/?q=Hjortsh%C3%B8j+Stationsvej+6,+8530+Hjortsh%C3%B8j',
}

// ── Tider ét sted ────────────────────────────────────────────
// De tre tidspunkter findes KUN her (HH:MM). Alle visningstekster og
// openingHoursSpecification (seo.js) afledes af dem, så tiderne aldrig kommer i
// utakt. Sitet viser ingen åben/lukket-status (handoff v3).
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
  preorderStart, // '15:00'
  openTime, // '16:00'
  closeTime, // '20:30'
  time: `${dk(openTime)}⁠–⁠${dk(closeTime)}`,
  schedule: [
    { day: 'Fredag', time: `${dk(openTime)}⁠–⁠${dk(closeTime)}` },
    { day: 'Lørdag', time: `${dk(openTime)}⁠–⁠${dk(closeTime)}` },
  ],
  note: 'Vi har kun åbent fredag og lørdag – så kig forbi, mens vi har åbent.',
  // Hvad note'en reelt fortæller: de øvrige dage er der lukket (jf. FAQ).
  closedNote: 'Resten af ugen har vi lukket.',
  // Kort linje brugt flere steder (menu, kontakt, footer).
  preorderNote: `Forudbestil fra kl.\u00a0${dk(preorderStart)} – afhent fra kl.\u00a0${dk(openTime)} og helt frem til lukketid kl.\u00a0${dk(closeTime)}.`,
  // TEKST.md: "Åbningstider skrives altid sådan: Fredag og lørdag 16.00–20.30".
  line: `Fredag og lørdag ${dk(openTime)}–${dk(closeTime)}`,
  // Skiltets og bjælkernes undertekst (TEKST.md).
  preorderShort: `Forudbestil fra kl. ${dk(preorderStart)} fredag og lørdag`,
  // Todelt forklaring til Find os-sektionen.
  preorderLine: `Ring og forudbestil allerede fra kl.\u00a0${dk(preorderStart)}.`,
  pickupLine: `Afhentning fra kl.\u00a0${dk(openTime)} og frem til vi lukker kl.\u00a0${dk(closeTime)}.`,
}

// "Bestil tidligt" — restaurantens egen opfordring: jo tidligere man ringer, jo
// bedre. Tider afledes af hours; teksten er ejerens budskab.
export const bestilTidligt = {
  heading: 'Jo tidligere du bestiller, jo bedre',
  steps: [
    { time: dk(preorderStart), text: 'Telefonen åbner for forudbestilling' },
    { time: dk(openTime), text: 'Afhentning starter' },
    { time: dk(closeTime), text: 'Vi lukker' },
  ],
}

export const menuInfo = {
  numberNote:
    'Numrene følger vores menukort – du kan bestille efter nummer, når du ringer.',
}

// Sociale profiler (oplyst af ejeren, nov. 2026).
export const social = {
  facebook: 'https://www.facebook.com/profile.php?id=61593688294152',
  instagram: 'https://www.instagram.com/palmyspisested/',
}

// Google-anmeldelser. Teksterne er kopieret ordret fra Palmys Google-profil
// 8. nov. 2026 (4 anmeldelser, 5,0 i gennemsnit, alle 5 stjerner). Opdater her,
// når der kommer nye. Anmeldelser uden tekst viser kun deres delkarakterer.
export const google = {
  rating: '5,0',
  count: 4,
  // Palmys anmeldelsesside på Google Maps - her kan gæster ogsaa skrive en ny.
  url: 'https://www.google.com/maps/place/Palmy+Spisested/@56.2449015,10.2683485,501m/data=!3m1!1e3!4m8!3m7!1s0x464c3d5feadc1379:0xb7763ebbb79775e6!8m2!3d56.2449015!4d10.2683485!9m1!1b1!16s%2Fg%2F11zf898ly_',
  heading: 'Det siger gæsterne',
  reviews: [
    {
      name: 'Villy Pirok',
      text: 'Fremragende mad denne lørdag, hvor vi ikke gad lave mad. Tænkte på det sædvanlige grillmad, men kom i tanke om det nye sted i Hjortshøj - Palmy, det måtte vi prøve og sikke en overraskelse - fremragende, veltillavet og velsmagende. Bedste anbefalinger herfra :-)',
      reply: 'Tusind tak, Håber du kommer igen!',
    },
    {
      name: 'Phong Nguyen',
      text: 'God kvalitet til prisen. Kan anbefales. nr. 12',
    },
    { name: 'Gustav Lynbech', food: 5, service: 5 },
    { name: 'Torben Fredberg', food: 5, service: 5 },
  ],
}

export const frame = {
  website: 'palmyspisested.com',
  tagline: 'Vietnamesisk mad med kærlighed',
}

// Hovednavigation (TEKST.md). Mobilmenuen viser alle seks; desktop-linjen
// viser ikke "Forside" (prototypen: ordmærket/logoet er vejen hjem).
export const nav = [
  { label: 'Forside', href: '/', desktop: false },
  { label: 'Menu', href: '/menu' },
  { label: 'Historien', href: '/historien' },
  { label: 'Billeder', href: '/billeder' },
  { label: 'Anmeldelser', href: '/anmeldelser' },
  { label: 'Find os', href: '/find-os' },
]

// Faste UI-ord (TEKST.md "Fælles").
export const ui = {
  menuOpen: 'Menu',
  menuClose: 'Luk',
  menuDialogLabel: 'Menu',
  navLabel: 'Hovedmenu',
  skipLink: 'Spring til indhold',
  logoAlt: business.name,
  ringBar: `Ring og bestil · ${business.phoneDisplay}`,
  instagram: 'Instagram',
  facebook: 'Facebook',
}

// Menukortet (TEKST.md "Menu"). Retter og priser står KUN i data/menu.ts.
export const menuText = {
  // Siden har intet synligt h1 (kompakt skilt → kategorier); dette læses op
  // og bruges af søgemaskiner.
  pageHeading: 'Menukort',
  navLabel: 'Menukategorier',
  printButton: 'Udskriv menukortet',
  spicy: 'STÆRK',
}

// Skiltet "Bestil på forhånd" øverst på forsiden (TEKST.md "Forside").
export const sign = {
  heading: 'Bestil på forhånd',
  lead: 'Ring og bestil efter nummeret på menukortet, så er maden klar, når du kommer.',
  blocks: [
    {
      label: 'Afhentning:',
      text: `Fra kl. ${dk(openTime)} og frem til lukketid kl. ${dk(closeTime)}`,
    },
    { label: 'Bestilling:', text: 'Kun over telefonen, bestil efter nummer.' },
  ],
}

export const hero = {
  // H1 i to linjer: "Vietnamesisk mad" + kursiv "i Hjortshøj".
  lead: 'Vietnamesisk mad',
  tail: `i ${city}`,
  subheading: `Familiedrevet køkken med frisklavet mad efter egne opskrifter. Ring og bestil til afhentning – vi har åbent ${hours.daysLong}.`,
}

// Retter på forsiden ("Menukort"-sektionen): udvalgte numre fra det trykte kort.
// Navn, tekst og priser hentes ALTID fra data/menu.ts — aldrig herfra.
//
// ⚠️ AFVENTER VERIFICERING mod det trykte menukort (ejerens beslutning 8. nov.
// 2026). Så længe `verificeret` er false, vises rækken KUN i udviklingsmiljøet
// (med en tydelig markering) — aldrig i produktionsbuildet. Når retterne er
// sammenholdt med kortet ret for ret: ret `verificeret` til true (og skift evt.
// numre), og de vises for alle. Sektionen ser komplet ud uden dem (kategorierne).
export const forsideRetter = {
  verificeret: false,
  // Én ret pr. køkkenmåde: rulle, wok, stegt, karry, nudelskål, suppe.
  // Alternativer: 4 (stegte nudler med oksekød), 18 (indbagt kylling), 21 (grøn karry).
  numre: ['1', '3', '6', '11', '12', '13'],
}

// Familiens tekst, ordret. Brug `historie.chapters` til visning.
const historieTekst = [
    'Palmy Spisested er en familiedrevet restaurant, startet af Thi og Nam. Med familiens opskrifter som fundament åbnede de deres vietnamesiske restaurant i Danmark – og den blev hurtigt et sted med mange glade, loyale gæster.',
    'Da livet ændrede sig, satte de restauranten på pause for at fokusere på uddannelse, arbejde og familie. Men drømmen om en dag at åbne igen forsvandt aldrig.',
    'I dag har de valgt at genåbne i Hjortshøj. Restauranten har åbent hver fredag og lørdag fra kl. 16.00 til 20.30, hvor de personligt tilbereder maden med samme kærlighed og omhu som altid.',
    'Når du besøger os, håber vi du får mere end et godt måltid – en oplevelse, hvor smagen og stemningen bringer dig tættere på vietnamesisk mad lavet med hjertet.',
]

// Historien er en rækkefølge, så den vises som tre kapitler: opskrifterne, pausen
// og genåbningen. Kapitel 2 er delt ved sætningsskiftet, så den sidste sætning
// kan stå som citat. Kapiteloverskrifterne er blot navne på afsnittene.
export const historie = {
  heading: 'Historien om Palmy Spisested',
  chapters: [
    { title: 'Familiens opskrifter', text: historieTekst[0] },
    {
      title: 'En pause',
      text: 'Da livet ændrede sig, satte de restauranten på pause for at fokusere på uddannelse, arbejde og familie.',
      quote: 'Men drømmen om en dag at åbne igen forsvandt aldrig.',
    },
    { title: 'Genåbnet i Hjortshøj', text: historieTekst[2] },
  ],
  outro: historieTekst[3],
  closing: 'Kom forbi og smag selv – fredag eller lørdag.',
}

export const billeder = {
  heading: 'Billeder',
  intro: 'Fra køkkenet og spisesalen – optaget hos os i Hjortshøj.',
}

export const kontakt = {
  heading: 'Find os i Hjortshøj',
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
      answer: `Vi har åbent ${hours.daysLong} kl.\u00a0${hours.time}. Resten af ugen holder vi lukket.`,
    },
    {
      question: 'Hvornår kan jeg bestille takeaway?',
      answer: `Ring til os på ${business.phoneDisplay} – vi tager imod forudbestillinger fra kl.\u00a0${dk(preorderStart)} ${hours.daysLong}. Maden kan hentes fra kl.\u00a0${dk(openTime)} og frem til vi lukker kl.\u00a0${dk(closeTime)}.`,
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
      answer: 'Hele menukortet med priser står på menusiden. Du kan også åbne det som en printvenlig udgave.',
      link: { label: 'Åbn menukortet', href: '/menu' },
    },
  ],
}

// Menudata (retter, priser, numre) bor i ./data/menu.ts — det er den eneste
// kilde til menuen, delt af kundemenuen, bestillingsvisningen og printkortet.

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
  // TEKST.md: "Åbningstider skrives altid sådan: Fredag og lørdag 16.00–20.30".
  line: `Fredag og lørdag ${dk(openTime)}–${dk(closeTime)}`,
  // Skiltets og bjælkernes undertekst (TEKST.md).
  preorderShort: `Forudbestil fra kl. ${dk(preorderStart)} fredag og lørdag`,
  // Find os' to guldblokke. Almindelige mellemrum, så linjerne brydes som i
  // prototypen.
  preorderLine: `Ring og forudbestil allerede fra kl. ${dk(preorderStart)}.`,
  pickupLine: `Afhentning fra kl. ${dk(openTime)} og frem til vi lukker kl. ${dk(closeTime)}.`,
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

// Forsiden efter menuen (TEKST.md "Forside").
export const home = {
  family:
    'Palmy drives af Thi og Nam. Maden laves efter familiens opskrifter, og de står selv i køkkenet hver fredag og lørdag.',
  familyLink: 'Historien',
  allReviews: 'Alle anmeldelser',
}

// Anmeldelser (KOMPONENTER.md §7). Teksterne står i `google.reviews`.
export const reviewText = {
  summary: (g) => `${g.rating} på Google · ${g.count} anmeldelser`,
  source: 'Google',
  replyPrefix: 'Svar fra Palmy:',
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
  menuLink: 'Se menukortet',
}

// Billeder: rækkefølgen og billederne står i media.js (galleri); billedteksterne
// her, i samme rækkefølge (TEKST.md "Billeder").
export const billeder = {
  heading: 'Billeder',
  intro: 'Fra køkkenet og spisesalen – optaget hos os i Hjortshøj.',
  captions: [
    'Karry, der simrer i gryden.',
    'Wokken over gasflammen.',
    'Karryen simrer. Kort loop uden lyd.',
    'Hjortshøj Stationsvej 6.',
    'Rejer og grøntsager i wokken. Kort loop uden lyd.',
    'Spisesalen.',
  ],
}

// Anmeldelser-siden (prototypen "Palmy Sider").
export const anmeldelser = {
  heading: 'Anmeldelser',
  // Anmeldelser uden tekst nævnes ved navn (Google: 5 stjerner).
  alsoRated: (names) => `${names.join(' og ')} gav også 5 stjerner.`,
  writeReview: 'Skriv en anmeldelse på Google',
}

// Privatlivspolitik — ordret fra prototypen (Maps-afsnittet er erstattet af
// linket til Google Maps under Cookies). Ikke juridisk gennemgået (MANGLER.md).
// `phone: true` = afsnittet slutter med telefonnummeret som link.
export const privatliv = {
  heading: 'Privatlivspolitik',
  updated: 'Senest opdateret: november 2026',
  sections: [
    {
      title: 'Dataansvarlig',
      paragraphs: [
        {
          text: `${business.name}, ${business.address}. Har du spørgsmål til denne politik, er du velkommen til at ringe på `,
          phone: true,
        },
      ],
    },
    {
      title: 'Hvilke oplysninger vi indsamler',
      paragraphs: [
        { text: 'Hjemmesiden har ingen kontaktformular, ingen brugerkonto og ingen onlinebetaling, så du giver ikke selv oplysninger til os gennem siden.' },
        { text: 'Hjemmesiden drives via Cloudflare. Som ved alle besøg på en hjemmeside modtager serveren de tekniske oplysninger, din browser altid sender, fx IP-adresse og browsertype.' },
        { text: 'Hjemmesidens egen kode indeholder ingen værktøjer til måling af besøg eller klik. Når du trykker på en knap for at ringe op, åbner din telefon blot opkaldet.' },
      ],
    },
    {
      title: 'Skrifttyper',
      paragraphs: [
        { text: 'Sidens skrifttyper ligger på selve hjemmesiden og hentes ikke fra andre tjenester. Der sendes derfor ingen oplysninger om dig til tredjepart, når skrifttyperne indlæses.' },
      ],
    },
    {
      title: 'Cookies',
      paragraphs: [
        { text: 'Hjemmesiden sætter ikke selv cookies. Når du trykker på vores adresse, åbnes Google Maps i et nyt vindue, og her gælder Googles privatlivspolitik.' },
        { text: 'Restaurantens interne opslagsside til personalet gemmer en kopi af menukortet i browserens lokale lager. Den indeholder ingen oplysninger om besøgende.' },
        // Tilføjet af Ronny 11.11.2026 (menuens intro, MenuSections.jsx).
        { text: 'Menukortets lille intro-animation gemmer en markering i din browsers sessionStorage, så den kun vises én gang pr. besøg. Den indeholder ingen oplysninger om dig.' },
      ],
    },
    {
      title: 'Bestilling',
      paragraphs: [
        { text: 'Bestilling og forudbestilling sker over telefon. Vi gemmer ikke dine oplysninger digitalt gennem hjemmesiden – din bestilling håndteres direkte af os i restauranten.' },
      ],
    },
    {
      title: 'Dine rettigheder',
      paragraphs: [
        { text: 'Efter databeskyttelsesforordningen (GDPR) har du ret til indsigt i, berigtigelse af og sletning af eventuelle oplysninger, vi måtte have om dig. Hjemmesiden har ingen formularer eller brugerkonti, så vi har normalt ingen oplysninger, der er knyttet til dig ved navn. Kontakt os endelig, hvis du har spørgsmål.' },
      ],
    },
  ],
}

// 404 (TEKST.md "404").
export const notFound = {
  heading: 'Siden findes ikke',
  text: 'Adressen er måske ændret. Menukortet og telefonnummeret er de samme.',
  links: [
    { label: 'Gå til menukortet', href: '/menu' },
    { label: 'Gå til forsiden', href: '/' },
  ],
}

// Find os (TEKST.md + prototypen "Palmy Sider").
export const findOs = {
  heading: 'Find os',
  region: 'Nord for Aarhus.',
  blocks: [
    { label: 'Åbent', text: `${hours.line}. Resten af ugen holder vi lukket.` },
    { label: 'Telefon', phone: true },
    { label: 'Bestil:', text: hours.preorderLine, gold: true },
    { label: 'Afhentning:', text: hours.pickupLine, gold: true },
  ],
  qaHeading: 'Spørgsmål og svar',
}

// Spørgsmål og svar på Find os — som almindelig tekst, ingen accordion. Kun de
// to spørgsmål, TEKST.md beholder. Bruges også i FAQPage-schema (src/seo.js),
// så schemaet altid matcher det, der står på siden.
export const faq = {
  items: [
    {
      question: 'Kan jeg bestille online?',
      answer: 'Nej – al bestilling foregår over telefonen. Det går hurtigst, hvis du bestiller efter nummeret på menukortet.',
    },
    {
      question: 'Hvilken slags mad laver I?',
      answer: 'Vietnamesisk mad efter familiens egne opskrifter – blandt andet hjemmelavede forårsruller, stegte nudler, Bún og rød karry. Der er også en lille børnemenu.',
    },
  ],
}

// Menudata (retter, priser, numre) bor i ./data/menu.ts — det er den eneste
// kilde til menuen, delt af kundemenuen, bestillingsvisningen og printkortet.

// Kun anmeldelser med tekst vises som citat (2 af 4 i dag).
export const reviewsWithText = google.reviews.filter((r) => r.text)

// Interne sider (noindex): /bestilling til personalet og /menu/print.
export const internt = {
  bestilling: {
    heading: 'Bestilling',
    subheading: `${business.name} — internt opslag`,
    placeholder: 'Nummer eller navn…',
    searchLabel: 'Søg efter menunummer eller retnavn',
    clear: 'Ryd søgning',
    ask: 'Spørg kunden',
    price: 'Pris',
    noMatch: (q) => `Intet match for "${q}"`,
    empty: 'Tast et menunummer eller søg på navn',
    allNumbers: 'Alle numre',
    home: '← Forsiden',
  },
  print: {
    heading: 'Menukort',
    back: '← Tilbage til menukortet',
    print: 'Udskriv / gem som PDF',
  },
}

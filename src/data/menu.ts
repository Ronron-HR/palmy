// ÉNESTE KILDE TIL MENUDATA — Kundemenu, Bestillingsvisning og Printlayout
// renderes alle ud fra dette ét sted. Ret KUN her.
//
// ⚠️ Numrene 1–19 er dem der står på det trykte kort. Stamkunder bestiller
// efter dem i telefonen. De må IKKE ændres, omnummereres eller sorteres om.
// Numre er DATA, ikke visningsrækkefølge — retter renderes altid i deres
// sektionsrækkefølge (array-rækkefølgen nedenfor), aldrig sorteret på nummer.

export type Variant = {
  label: string // fx "Med kylling", "Med and", "1 stk."
  price: number // DKK
}

export type Dish = {
  number: number | null // menunummeret; null for retter uden nummer
  name: string
  description?: string // kursiv undertekst
  price?: number // kun hvis retten har ÉN fast pris
  variants?: Variant[] // valg MED prisforskel
  choices?: string[] // valg UDEN prisforskel, fx ["Ris", "Nudler"]
  spicy?: boolean
  section: SectionId
  note?: string // fri note, fx "Kan serveres med ris eller risnudler."
}

export type SectionId =
  | 'forretter'
  | 'hovedretter'
  | 'ekstra-retter'
  | 'boernemenu'
  | 'drikkevarer'
  | 'tilbehoer'

export type Section = {
  id: SectionId
  title: string
  note?: string // sektionsnote, vises under sektionsoverskriften
}

// Sektionsrækkefølge for ALLE visninger: Forretter → Hovedretter →
// Ekstra retter → Børnemenu → Drikkevarer → Ekstra tilbehør.
export const SECTIONS: Section[] = [
  { id: 'forretter', title: 'Forretter' },
  {
    id: 'hovedretter',
    title: 'Hovedretter',
    note: 'Alle retter serveres med ris eller nudler',
  },
  { id: 'ekstra-retter', title: 'Ekstra Retter' },
  { id: 'boernemenu', title: 'Børnemenu' },
  { id: 'drikkevarer', title: 'Drikkevarer' },
  { id: 'tilbehoer', title: 'Ekstra Tilbehør' },
]

export const dishes: Dish[] = [
  // ── FORRETTER ─────────────────────────────────────────────
  {
    number: 1,
    name: 'Luksus Forårsruller',
    description: 'Med rejer, kylling, hakket oksekød, skinke og grøntsager',
    variants: [
      { label: '1 stk.', price: 45 },
      { label: '3 stk.', price: 120 },
    ],
    section: 'forretter',
  },
  {
    number: 2,
    name: 'Fem Små Forårsruller',
    description: 'Med sød chili sauce',
    price: 45,
    section: 'forretter',
  },

  // ── HOVEDRETTER (sektionsnote: se SECTIONS) ─────────────────
  {
    number: 3,
    name: 'Stegte nudler med kylling og grøntsager',
    price: 95,
    section: 'hovedretter',
  },
  {
    number: 4,
    name: 'Stegte nudler med oksekød og grøntsager',
    price: 95,
    section: 'hovedretter',
  },
  {
    number: 5,
    name: 'Stegte ris med skinke, rejer, gulerødder, ærter og æg',
    price: 95,
    section: 'hovedretter',
  },
  {
    number: 6,
    name: 'Stegt and med ris eller nudler og kinesisk sød sauce',
    price: 115,
    choices: ['Ris', 'Nudler'],
    section: 'hovedretter',
  },
  {
    number: 7,
    name: 'Indbagte store rejer med sur-sød sauce (Ris)',
    price: 95,
    section: 'hovedretter',
  },
  {
    number: 8,
    name: 'Risnudler med rejer og grøntsager',
    description: 'Tom Yum Goong – stærk',
    price: 95,
    spicy: true,
    section: 'hovedretter',
  },
  {
    number: 9,
    name: 'Ris med stegt kylling, grøntsager, ingefær og chili',
    price: 95,
    section: 'hovedretter',
  },
  {
    number: 10,
    name: 'Oksekød eller kylling med peberfrugt, løg og bambus i rød karry (Stærk)',
    price: 95,
    spicy: true,
    choices: ['Oksekød', 'Kylling'],
    section: 'hovedretter',
  },
  {
    number: 11,
    name: 'Rød karry med ris eller risnudler',
    description: 'Med bambus, chili, bønnespirer, champignon og kokosmælk',
    variants: [
      { label: 'Med and', price: 115 },
      { label: 'Med kylling', price: 95 },
      { label: 'Med oksekød', price: 95 },
    ],
    // Bevidst ingen `choices`: valget står allerede i rettens navn, præcis som
    // på det trykte kort. En "Vælg:"-linje ville gentage navnet ord for ord.
    section: 'hovedretter',
  },
  {
    number: 12,
    name: 'Vietnamesisk Bún Special',
    description:
      'Grillet svinekød, hjemmelavede forårsruller, friske grøntsager, peanuts og fiskesauce',
    price: 110,
    section: 'hovedretter',
  },
  {
    number: 13,
    name: 'Tom Kha Gai',
    description: 'Kokosmælksuppe med kylling, champignon, chili og bønnespirer',
    variants: [
      { label: 'Med kylling', price: 95 },
      { label: 'Med rejer', price: 105 },
    ],
    // Ordret som på det trykte kort — derfor `note` og ikke `choices`.
    note: 'Kan serveres med ris eller risnudler.',
    section: 'hovedretter',
  },
  // Nr. 18 og 19 hører til Hovedretter, selvom de står talmæssigt efter
  // Børnemenu — det er korrekt og skal bevares, jf. det trykte kort.
  {
    number: 18,
    name: 'Indbagt Kylling med sur-sød sauce (Ris)',
    price: 95,
    section: 'hovedretter',
  },
  {
    number: 19,
    name: 'Kylling Satay med ris og peanut sauce',
    price: 95,
    section: 'hovedretter',
  },

  // ── EKSTRA RETTER ────────────────────────────────────────
  {
    number: 14,
    name: '1/2 Grillkylling med pommes frites',
    price: 80,
    section: 'ekstra-retter',
  },
  {
    number: 15,
    name: 'Pommes Frites (Stor portion)',
    price: 35,
    section: 'ekstra-retter',
  },

  // ── BØRNEMENU ────────────────────────────────────────────
  {
    // Eneste ændring på kortet: navnet skifter fra "Crispy Chicken Burger"
    // til "Crispy Burger", og prisen bliver til to linjer (kylling/oksekød).
    // Nummeret er UÆNDRET — dette er en prisvariant af nr. 16, ikke en ny ret.
    number: 16,
    name: 'Crispy Burger',
    description: 'Med salat, agurk og pommes frites',
    variants: [
      { label: 'Med kylling', price: 79 },
      { label: 'Med oksekød', price: 79 },
    ],
    section: 'boernemenu',
  },
  {
    number: 17,
    name: 'Chicken Nuggets (6 stk.)',
    description: 'Med pommes frites og ketchup',
    price: 69,
    section: 'boernemenu',
  },

  // ── DRIKKEVARER (uden nummer) ────────────────────────────
  {
    number: null,
    name: 'Sodavand',
    price: 20,
    section: 'drikkevarer',
  },

  // ── EKSTRA TILBEHØR (uden numre) ─────────────────────────
  { number: null, name: 'Ekstra ris', price: 20, section: 'tilbehoer' },
  { number: null, name: 'Ekstra kylling', price: 25, section: 'tilbehoer' },
  { number: null, name: 'Ekstra svinekød', price: 25, section: 'tilbehoer' },
  { number: null, name: 'Ekstra oksekød', price: 25, section: 'tilbehoer' },
  { number: null, name: 'Ekstra and', price: 30, section: 'tilbehoer' },
  { number: null, name: 'Ekstra nudler', price: 20, section: 'tilbehoer' },
  { number: null, name: 'Ekstra peanuts', price: 10, section: 'tilbehoer' },
  {
    number: null,
    name: 'Ekstra sur-sød sauce',
    price: 10,
    section: 'tilbehoer',
  },
]

// ── Nummer-integritet ────────────────────────────────────────
// Håndhæves i koden, ikke kun i en kommentar: fejler build/dev øjeblikkeligt
// hvis to retter deler et nummer, eller hvis et nummer i 1–19 mangler.
const REQUIRED_NUMBER_RANGE = { min: 1, max: 19 } as const

function assertMenuNumberIntegrity(allDishes: Dish[]): void {
  const ownerOf = new Map<number, string>()

  for (const dish of allDishes) {
    if (dish.number == null) continue
    const existing = ownerOf.get(dish.number)
    if (existing) {
      throw new Error(
        `menu.ts: nummer ${dish.number} bruges af både "${existing}" og "${dish.name}". ` +
          'Menunumre er data fra det trykte kort og må aldrig genbruges.',
      )
    }
    ownerOf.set(dish.number, dish.name)
  }

  const missing: number[] = []
  for (let n = REQUIRED_NUMBER_RANGE.min; n <= REQUIRED_NUMBER_RANGE.max; n++) {
    if (!ownerOf.has(n)) missing.push(n)
  }
  if (missing.length > 0) {
    throw new Error(
      `menu.ts: nummer ${missing.join(', ')} mangler. Det trykte kort bruger ` +
        `${REQUIRED_NUMBER_RANGE.min}–${REQUIRED_NUMBER_RANGE.max}, og hvert nummer skal findes præcis én gang.`,
    )
  }
}

assertMenuNumberIntegrity(dishes)

// ── Afledte opslag ───────────────────────────────────────────

export const dishesByNumber: Map<number, Dish> = new Map(
  dishes.filter((d): d is Dish & { number: number } => d.number != null).map((d) => [d.number, d]),
)

export function getDishesBySection(id: SectionId): Dish[] {
  return dishes.filter((d) => d.section === id)
}

/** Kompakt prisvisning til lister hvor der ikke er plads til alle varianter. */
export function getDisplayPrice(dish: Dish): string {
  if (dish.price != null) return `${dish.price} kr`
  if (dish.variants && dish.variants.length > 0) {
    const lowest = Math.min(...dish.variants.map((v) => v.price))
    return `fra ${lowest} kr`
  }
  return ''
}

/** "Ris, Nudler eller Risnudler" — bruges i bestillingsvisningens spørgsmål. */
export function formatChoicesQuestion(choices: string[]): string {
  if (choices.length === 0) return ''
  if (choices.length === 1) return choices[0]
  return `${choices.slice(0, -1).join(', ')} eller ${choices[choices.length - 1]}`
}

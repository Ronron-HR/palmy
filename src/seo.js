// ÉNESTE KILDE TIL SEO-METADATA — titler, beskrivelser, canonical, robots,
// Open Graph og JSON-LD pr. rute. Bruges to steder:
//   • scripts/prerender.mjs (via entry-server) skriver <head> ind i den
//     statiske HTML for hver rute ved build.
//   • src/hooks/useDocumentHead.js opdaterer title/description/canonical
//     ved klient-navigation mellem ruterne.
// Alle fakta (navn, adresse, tider, priser) hentes fra content.js og
// data/menu.ts — intet hardcodes her.

import { business, faq, hours, signatur } from './content'
import { SECTIONS, dishes, getDishesBySection } from './data/menu'

// Kanonisk domæne. www-varianten er den offentlige adresse; apex 301'er hertil
// (public/_redirects). Skal matche robots.txt og sitemap.xml.
export const SITE_URL = 'https://www.palmyspisested.com'
export const abs = (path = '/') => `${SITE_URL}${path}`

const OG_IMAGE = {
  url: abs('/images/palmy-hero-og.jpg'),
  width: 1200,
  height: 630,
  alt: `Retter fra ${business.name} – vietnamesisk mad i ${business.city}`,
}

// Koordinater for Hjortshøj Stationsvej 6 (fra det eksisterende schema).
const GEO = { latitude: 56.2449015, longitude: 10.2683485 }

const RESTAURANT_ID = `${SITE_URL}/#restaurant`
const WEBSITE_ID = `${SITE_URL}/#website`

// ── Hjælpere ────────────────────────────────────────────────

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function openingHoursSpecification() {
  return [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.openDays.map((d) => DAY_NAMES[d]),
      opens: hours.openTime,
      closes: hours.closeTime,
    },
  ]
}

// Prisinterval for hovedretter (det, gæster forstår som "et måltid"), afledt
// af menudata så det aldrig kommer i utakt med kortet.
function priceRange() {
  const prices = dishes
    .filter((d) => d.section === 'hovedretter')
    .flatMap((d) => (d.price != null ? [d.price] : (d.variants ?? []).map((v) => v.price)))
  if (prices.length === 0) return undefined
  return `${Math.min(...prices)}–${Math.max(...prices)} kr`
}

function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: business.street,
    postalCode: business.postalCode,
    addressLocality: business.city,
    addressCountry: 'DK',
  }
}

function offer(price, name) {
  const o = { '@type': 'Offer', price, priceCurrency: 'DKK' }
  if (name) o.name = name
  return o
}

function menuItem(dish) {
  const item = {
    '@type': 'MenuItem',
    name: dish.name,
  }
  const description = [dish.description, dish.note].filter(Boolean).join(' ')
  if (description) item.description = description
  if (dish.number != null) item.identifier = String(dish.number)
  if (dish.price != null) item.offers = offer(dish.price)
  else if (dish.variants?.length) item.offers = dish.variants.map((v) => offer(v.price, v.label))
  return item
}

export function menuSchema() {
  return {
    '@type': 'Menu',
    '@id': `${SITE_URL}/menu#menu`,
    name: `Menukort – ${business.name}`,
    url: abs('/menu'),
    inLanguage: 'da',
    hasMenuSection: SECTIONS.map((section) => {
      const s = {
        '@type': 'MenuSection',
        name: section.title,
        hasMenuItem: getDishesBySection(section.id).map(menuItem),
      }
      if (section.note) s.description = section.note
      return s
    }).filter((s) => s.hasMenuItem.length > 0),
  }
}

// Restaurant er en undertype af LocalBusiness; begge angives eksplicit, så
// både lokale søgninger og restaurant-specifikke funktioner rammer.
export function restaurantSchema({ fullMenu = false } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'LocalBusiness'],
    '@id': RESTAURANT_ID,
    name: business.name,
    description: `${business.name} er en familiedrevet ${business.kind} i ${business.city}. Åbent ${hours.daysLong} kl. ${hours.time}.`,
    url: abs('/'),
    telephone: business.phone,
    servesCuisine: 'Vietnamese',
    priceRange: priceRange(),
    currenciesAccepted: 'DKK',
    image: [
      OG_IMAGE.url,
      ...signatur.dishes.map((d) => abs(`/images/signatur/${d.image}-1200.webp`)),
    ],
    address: postalAddress(),
    geo: { '@type': 'GeoCoordinates', ...GEO },
    hasMap: business.googleMapsUrl,
    openingHoursSpecification: openingHoursSpecification(),
    hasMenu: fullMenu ? menuSchema() : abs('/menu'),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: business.name,
    url: abs('/'),
    inLanguage: 'da',
    publisher: { '@id': RESTAURANT_ID },
  }
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

// ── Ruter ───────────────────────────────────────────────────

const SITE_SUFFIX = ` | ${business.name}`

const ROUTES = {
  '/': {
    title: `${business.name} | Vietnamesisk restaurant i ${business.city}`,
    description: `${business.name} i ${business.city} serverer frisklavet vietnamesisk mad. Se menuen, find åbningstider og ring og bestil takeaway – vi har åbent ${hours.daysLong}.`,
    robots: 'index, follow',
    jsonLd: () => [restaurantSchema(), websiteSchema(), faqSchema()],
    sitemap: { priority: '1.0', changefreq: 'monthly' },
  },
  '/menu': {
    title: `Menukort${SITE_SUFFIX} – vietnamesisk mad i ${business.city}`,
    description: `Hele menukortet fra ${business.name} i ${business.city} – hjemmelavede forårsruller, stegte nudler, Bún, karry og børnemenu med priser. Ring og bestil takeaway efter nummer.`,
    robots: 'index, follow',
    jsonLd: () => [restaurantSchema({ fullMenu: true })],
    sitemap: { priority: '0.9', changefreq: 'monthly' },
  },
  '/privatliv': {
    title: `Privatlivspolitik${SITE_SUFFIX}`,
    description: `Sådan håndterer ${business.name} i ${business.city} dine oplysninger. Hjemmesiden indsamler ikke personoplysninger og sætter ingen cookies af sig selv.`,
    robots: 'index, follow',
    jsonLd: () => [],
    sitemap: { priority: '0.2', changefreq: 'yearly' },
  },
  // Interne/duplikerede visninger — prerenderes så de virker uden JS, men
  // holdes ude af Google og af sitemap.
  '/menu/print': {
    title: `Menukort til print${SITE_SUFFIX}`,
    description: `Printvenlig udgave af menukortet fra ${business.name}.`,
    robots: 'noindex, follow',
    jsonLd: () => [],
  },
  '/bestilling': {
    title: `Bestilling – internt opslag${SITE_SUFFIX}`,
    description: `Internt opslagsværktøj til personalet hos ${business.name}.`,
    robots: 'noindex, nofollow',
    jsonLd: () => [],
  },
  '/404': {
    title: `Siden blev ikke fundet${SITE_SUFFIX}`,
    description: `Siden findes ikke. Gå til forsiden for menu, åbningstider og kontakt til ${business.name} i ${business.city}.`,
    robots: 'noindex, follow',
    jsonLd: () => [],
  },
}

// Ruter der findes som rigtige sider. Alt andet er 404.
export const KNOWN_PATHS = Object.keys(ROUTES).filter((p) => p !== '/404')

export function getRouteSeo(pathname) {
  const route = ROUTES[pathname] ?? ROUTES['/404']
  const isKnown = Boolean(ROUTES[pathname]) && pathname !== '/404'
  return {
    ...route,
    pathname: isKnown ? pathname : '/404',
    // En 404 har ingen kanonisk adresse — tagget udelades helt.
    canonical: isKnown ? abs(pathname) : null,
  }
}

// Ruter → filnavne i dist/. Cloudflare Pages serverer `menu.html` på /menu og
// 308'er /menu/ → /menu — dvs. URL'en UDEN trailing slash bliver den rigtige,
// præcis som canonical/sitemap siger. (Med `menu/index.html` ville Pages
// gøre det omvendte og sende /menu videre til /menu/.) /404.html bruges til
// alt, der ikke findes.
export const PRERENDER_ROUTES = [
  { path: '/', file: 'index.html' },
  { path: '/menu', file: 'menu.html' },
  { path: '/privatliv', file: 'privatliv.html' },
  { path: '/menu/print', file: 'menu/print.html' },
  { path: '/bestilling', file: 'bestilling.html' },
  { path: '/404', file: '404.html' },
]

// ── HTML-generering (kun til prerender) ─────────────────────

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeText(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// JSON-LD må ikke kunne lukke sit eget <script>-tag.
function jsonLdScript(obj) {
  const json = JSON.stringify(obj).replace(/</g, '\\u003c')
  return `<script type="application/ld+json">${json}</script>`
}

export function renderHead(pathname) {
  const seo = getRouteSeo(pathname)
  const tags = [
    `<title>${escapeText(seo.title)}</title>`,
    `<meta name="description" content="${escapeAttr(seo.description)}" />`,
    `<meta name="robots" content="${escapeAttr(seo.robots)}" />`,
    ...(seo.canonical ? [`<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`] : []),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeAttr(business.name)}" />`,
    `<meta property="og:locale" content="da_DK" />`,
    `<meta property="og:title" content="${escapeAttr(seo.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(seo.description)}" />`,
    ...(seo.canonical ? [`<meta property="og:url" content="${escapeAttr(seo.canonical)}" />`] : []),
    `<meta property="og:image" content="${escapeAttr(OG_IMAGE.url)}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${escapeAttr(OG_IMAGE.alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(OG_IMAGE.url)}" />`,
    `<meta name="twitter:image:alt" content="${escapeAttr(OG_IMAGE.alt)}" />`,
    ...seo.jsonLd().map(jsonLdScript),
  ]
  return tags.join('\n    ')
}

export function renderSitemap(lastmod) {
  const urls = KNOWN_PATHS.filter((p) => ROUTES[p].sitemap).map((p) => {
    const { priority, changefreq } = ROUTES[p].sitemap
    return [
      '  <url>',
      `    <loc>${escapeText(abs(p))}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n')
  })
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
}

// ÉN FORTEGNELSE OVER BILLEDER OG VIDEOER — alt hvad sitet viser af Palmys eget
// foto- og videomateriale. Nye billeder: læg de optimerede filer i public/ og
// tilføj dem her (og evt. i `galleri` nedenfor) — ingen komponent skal ændres.
//
// Filnavne følger asset-packens mønster: palmy-<navn>-<bredde>x<højde>.<format>
// (billeder findes som AVIF + WebP, videoer som MP4 + WebM med WebP-poster).

export const images = {
  karry: {
    dir: 'food',
    name: 'karry-i-gryden',
    sizes: [
      [480, 600],
      [800, 1000],
      [1080, 1350],
    ],
    alt: 'Karry med forårsløg, der simrer i gryden i Palmys køkken',
  },
  wok: {
    dir: 'food',
    name: 'wok-rejer-groentsager',
    sizes: [
      [480, 600],
      [800, 1000],
      [1200, 1500],
    ],
    alt: 'Wok med karry og grøntsager over blå gasflamme i Palmys køkken',
  },
  flamme: {
    dir: 'food',
    name: 'flamme-under-wokken',
    sizes: [
      [480, 600],
      [800, 1000],
    ],
    alt: 'Blå gasflamme under wokken i Palmys køkken',
  },
  spisesal: {
    dir: 'restaurant',
    name: 'spisesal',
    sizes: [
      [480, 600],
      [800, 1000],
      [1200, 1500],
    ],
    alt: 'Lys spisesal hos Palmy Spisested med borde og stole',
  },
  facade: {
    dir: 'restaurant',
    name: 'facade-skilt',
    sizes: [
      [800, 450],
      [1280, 720],
    ],
    alt: 'Facaden på Palmy Spisested i Hjortshøj med skiltet over vinduerne',
  },
}

// Korte, lydløse loops fra Palmys køkken (720×1280, lodrette).
export const videos = {
  flammeWok: { name: 'flamme-wok' },
  karrySimrer: { name: 'karry-simrer' },
  wokRejer: { name: 'wok-rejer' },
}

export const heroVideo = {
  mp4: '/videos/hero/palmy-hero-mobil-720x1280.mp4',
  webm: '/videos/hero/palmy-hero-mobil-720x1280.webm',
  poster: '/videos/hero/palmy-hero-poster-mobil-720x1280.jpg',
}

export const videoSources = ({ name }) => ({
  mp4: `/videos/food/palmy-${name}-720x1280.mp4`,
  webm: `/videos/food/palmy-${name}-720x1280.webm`,
  poster: `/videos/food/palmy-${name}-poster-720x1280.webp`,
})

// Rækkefølgen i /billeder-galleriet. `ratio` er bredde/højde, så skinnen kan
// reservere pladsen (ingen layout shift) og kortene får varieret bredde.
export const galleri = [
  { type: 'image', image: 'karry', ratio: 4 / 5 },
  { type: 'video', video: 'flammeWok', ratio: 9 / 16 },
  { type: 'image', image: 'spisesal', ratio: 4 / 5 },
  { type: 'video', video: 'karrySimrer', ratio: 9 / 16 },
  { type: 'image', image: 'wok', ratio: 4 / 5 },
  { type: 'image', image: 'facade', ratio: 16 / 9 },
  { type: 'video', video: 'wokRejer', ratio: 9 / 16 },
  { type: 'image', image: 'flamme', ratio: 4 / 5 },
]

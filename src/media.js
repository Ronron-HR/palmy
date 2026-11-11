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
    alt: 'Rejer og grøntsager i wokken over blå gasflamme',
  },
  spisesal: {
    dir: 'restaurant',
    name: 'spisesal',
    sizes: [
      [480, 600],
      [800, 1000],
      [1200, 1500],
    ],
    alt: 'Spisesalen hos Palmy Spisested med borde og stole',
  },
  facade: {
    dir: 'restaurant',
    name: 'facade-skilt',
    sizes: [
      [800, 450],
      [1280, 720],
    ],
    alt: 'Facaden på Palmy Spisested med skiltet over vinduerne',
  },
}

// Korte, lydløse loops fra Palmys køkken (720×1280, lodrette).
// Korte, lydløse loops fra Palmys køkken (720×1280, vist beskåret til 4:5).
// Hero-videoerne og flamme-wok bruges ikke (BILLEDKORT.md "Bruges ikke").
export const videos = {
  karrySimrer: { name: 'karry-simrer', pos: 'karry' },
  wokRejer: { name: 'wok-rejer', pos: 'wokVideo' },
}

export const videoSources = ({ name }) => ({
  mp4: `/videos/food/palmy-${name}-720x1280.mp4`,
  webm: `/videos/food/palmy-${name}-720x1280.webm`,
  poster: `/videos/food/palmy-${name}-poster-720x1280.webp`,
})

// Rækkefølgen på /billeder (prototypen "Palmy Sider"). `aspect` og `pos` er
// navne på tokens (aspect-dish/-wide, --pos-*) — BILLEDKORT.md.
// Billedteksterne står i content.js (billeder.captions), i samme rækkefølge.
export const galleri = [
  { type: 'image', image: 'karry', aspect: 'dish', pos: 'karry' },
  { type: 'image', image: 'wok', aspect: 'dish', pos: 'wok' },
  { type: 'video', video: 'karrySimrer', aspect: 'dish', pos: 'karry' },
  { type: 'image', image: 'facade', aspect: 'wide', pos: 'facade' },
  { type: 'video', video: 'wokRejer', aspect: 'dish', pos: 'wokVideo' },
  { type: 'image', image: 'spisesal', aspect: 'dish', pos: 'spisesal' },
]

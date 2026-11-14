// ÉN FORTEGNELSE OVER BILLEDER OG VIDEOER — alt hvad sitet viser af Palmys eget
// foto- og videomateriale. Nye billeder: læg de optimerede filer i public/ og
// tilføj dem her (og evt. i `galleri` nedenfor) — ingen komponent skal ændres.
//
// Filnavne følger asset-packens mønster: palmy-<navn>-<bredde>x<højde>.<format>
// (billeder findes som AVIF + WebP, videoer som MP4 + WebM med WebP-poster).

export const images = {
  // Thi og Nam (forsidens hero). Beskåret til parret og let opklaret fra
  // ejerens eget foto; 588 er højeste bredde (kilden er lille).
  thiOgNam: {
    dir: 'restaurant',
    name: 'thi-og-nam',
    sizes: [
      [392, 490],
      [588, 735],
    ],
    alt: 'Thi og Nam, der driver Palmy Spisested',
  },
  // Palmys autentiske billedpakke (palmy_handoff/billeder, nov. 2026). Kun
  // WebP; filnavnet er <navn>-<bredde>.webp.
  foraarsruller: {
    dir: 'food', handoff: '02-fem-smaa-foraarsruller', webpOnly: true,
    sizes: [[480, 732], [800, 1219], [925, 1410]],
    alt: 'Fem små forårsruller med sød chilisauce på blå-hvid tallerken',
  },
  nudler: {
    dir: 'food', handoff: '03-stegte-nudler-kylling', webpOnly: true,
    sizes: [[480, 558], [800, 931], [1152, 1340]],
    alt: 'Stegte nudler med kylling og grøntsager på blå-hvid tallerken',
  },
  and: {
    dir: 'food', handoff: '06-and-ris-sauce', webpOnly: true,
    sizes: [[480, 555], [800, 924], [1082, 1250]],
    alt: 'Stegt and med ris og kinesisk sød sauce på blå-hvid tallerken',
  },
  koekkenWok: {
    dir: 'food', handoff: 'koekken-wok-rejer', webpOnly: true,
    sizes: [[480, 600], [800, 1000], [1200, 1500]],
    alt: 'Wok med rød karry over gasblus i Palmys køkken',
  },
  koekkenKarry: {
    dir: 'food', handoff: 'koekken-karry', webpOnly: true,
    sizes: [[480, 600], [800, 1000], [1080, 1350]],
    alt: 'Karry med kokosmælk og forårsløg simrer over gasblus',
  },
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

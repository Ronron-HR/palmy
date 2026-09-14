// Build-tids billedbehandling til Signaturretter-sektionen.
// Læser udvalgte originalfotos, beskærer til ensartet 4:5, resizer til to
// bredder og skriver optimerede WebP-filer til public/images/signatur/.
//
// KØRSEL:  node scripts/process-signatur-images.mjs
//
// Ingen AI, ingen rekonstruktion — kun beskæring/resize/format. Output-filerne
// committes, så selve app-buildet ikke afhænger af dette script eller sharp.

import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdir } from 'node:fs/promises'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const srcDir = join(root, 'public', 'images', 'MAD BILLEDER')
const outDir = join(root, 'public', 'images', 'signatur')

// Ensartet kvadratisk ratio (1:1). Bred nok til at et liggende foto (nr. 4)
// kan vise HELE tallerkenen uden at skære siderne af — og fælles ratio, så
// carousellen ikke "hopper" og vi undgår layout shift.
const RATIO_W = 1
const RATIO_H = 1
const WIDTHS = [800, 1200]
const QUALITY = 74

// Hvert foto → outputnavn.
//  cropBottom: px der skæres af BUNDEN FØR 4:5-beskæringen (kun hvis et
//    fremtidigt foto har en timestamp i bunden). De tre nuværende har ingen.
//  focusX: horisontalt fokuspunkt 0..1 (0.5 = centreret). Bruges til at flytte
//    udsnittet, når motivet ikke er centreret — fx IMG_0124 (landscape), hvor
//    tallerkenen sidder til venstre og soya-skålen skal ud af billedet.
//  fit: 'cover' (default) center-cropper til 4:5. 'blur' viser HELE motivet
//    (kvadratisk udsnit) inde i 4:5-rammen med en blødt udtonet, uskarp
//    udgave af billedet selv som top/bund-fyld — bruges når et landscape-foto
//    (IMG_0124) ellers ville blive beskåret for tæt. Ingen AI, kun eget billede.
const IMAGES = [
  { file: '11A29F48-6ED2-47BE-B085-E8B58E8B9B55.jpg', out: 'nr3', cropBottom: 0, focusX: 0.5 },
  { file: '6638025D-3529-4B3A-B1C3-E3DCD2E1E37E.jpg', out: 'nr6', cropBottom: 0, focusX: 0.5 },
  { file: 'IMG_0124.JPG', out: 'nr4', cropBottom: 0, focusX: 0.36 },
]

// Beregner et udsnit i forholdet (rw:rh) inden for (w × h) med horisontalt fokus.
function focusCrop(w, h, rw, rh, focusX = 0.5) {
  const targetRatio = rw / rh
  let cropW = w
  let cropH = Math.round(w / targetRatio)
  if (cropH > h) {
    cropH = h
    cropW = Math.round(h * targetRatio)
  }
  const left = Math.min(Math.max(Math.round(focusX * w - cropW / 2), 0), w - cropW)
  const top = Math.min(Math.max(Math.round(0.5 * h - cropH / 2), 0), h - cropH)
  return { left, top, width: cropW, height: cropH }
}

async function processOne(img) {
  const inputPath = join(srcDir, img.file)
  const meta = await sharp(inputPath).rotate().metadata()
  const usableHeight = meta.height - (img.cropBottom || 0)

  for (const width of WIDTHS) {
    const height = Math.round((width * RATIO_H) / RATIO_W)
    const outName = `${img.out}-${width}.webp`
    const outPath = join(outDir, outName)

    if (img.fit === 'blur') {
      // Kvadratisk udsnit om motivet (fjerner fx soya-skålen), så HELE
      // tallerkenen er med — derefter contain i 4:5 med uskarp bagved.
      const sq = focusCrop(meta.width, usableHeight, 1, 1, img.focusX)
      const cropped = await sharp(inputPath).rotate().extract(sq).toBuffer()

      // Kraftig blur + mørk nedtoning, så top/bund læses som en diskret mørk
      // skygge (ikke genkendelig "tåget" mad) — bedst på lille mobilskærm.
      const background = await sharp(cropped)
        .resize(width, height, { fit: 'cover', position: 'centre' })
        .blur(42)
        .modulate({ brightness: 0.48, saturation: 0.7 })
        .toBuffer()
      const foreground = await sharp(cropped)
        .resize(width, height, { fit: 'inside' })
        .toBuffer()

      await sharp(background)
        .composite([{ input: foreground, gravity: 'centre' }])
        .webp({ quality: QUALITY })
        .toFile(outPath)
    } else {
      const region = focusCrop(meta.width, usableHeight, RATIO_W, RATIO_H, img.focusX)
      await sharp(inputPath)
        .rotate()
        .extract(region)
        .resize({ width })
        .webp({ quality: QUALITY })
        .toFile(outPath)
    }
    console.log(`  ✓ ${outName}`)
  }
}

async function main() {
  await mkdir(outDir, { recursive: true })
  console.log(`Behandler ${IMAGES.length} fotos → ${outDir}`)
  for (const img of IMAGES) {
    console.log(`• ${img.file}`)
    await processOne(img)
  }
  console.log('Færdig.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

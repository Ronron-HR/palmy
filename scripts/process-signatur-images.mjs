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

// Ensartet portræt-ratio (bredde:højde). Fælles ratio => carousellen "hopper"
// ikke, og vi undgår layout shift.
const RATIO_W = 4
const RATIO_H = 5
const WIDTHS = [800, 1200]
const QUALITY = 74

// Hvert foto → outputnavn.
//  cropBottom: px der skæres af BUNDEN FØR 4:5-beskæringen (kun hvis et
//    fremtidigt foto har en timestamp i bunden). De tre nuværende har ingen.
//  focusX: horisontalt fokuspunkt 0..1 (0.5 = centreret). Bruges til at flytte
//    udsnittet, når motivet ikke er centreret — fx IMG_0124 (landscape), hvor
//    tallerkenen sidder til venstre og soya-skålen skal ud af billedet.
const IMAGES = [
  { file: '11A29F48-6ED2-47BE-B085-E8B58E8B9B55.jpg', out: 'nr3', cropBottom: 0, focusX: 0.5 },
  { file: '6638025D-3529-4B3A-B1C3-E3DCD2E1E37E.jpg', out: 'nr6', cropBottom: 0, focusX: 0.5 },
  { file: 'IMG_0124.JPG', out: 'nr4', cropBottom: 0, focusX: 0.38 },
]

// Beregner et 4:5-udsnit inden for (w × h) med et horisontalt fokuspunkt.
function coverCrop(w, h, focusX = 0.5) {
  const targetRatio = RATIO_W / RATIO_H
  let cropW = w
  let cropH = Math.round(w / targetRatio)
  if (cropH > h) {
    cropH = h
    cropW = Math.round(h * targetRatio)
  }
  const maxLeft = w - cropW
  const left = Math.min(Math.max(Math.round(focusX * w - cropW / 2), 0), maxLeft)
  return {
    left,
    top: Math.round((h - cropH) / 2),
    width: cropW,
    height: cropH,
  }
}

async function processOne(img) {
  const inputPath = join(srcDir, img.file)
  const base = sharp(inputPath).rotate() // respektér EXIF-orientering
  const meta = await base.metadata()

  const usableHeight = meta.height - (img.cropBottom || 0)
  const region = coverCrop(meta.width, usableHeight, img.focusX)

  for (const width of WIDTHS) {
    const outName = `${img.out}-${width}.webp`
    await sharp(inputPath)
      .rotate()
      .extract(region)
      .resize({ width })
      .webp({ quality: QUALITY })
      .toFile(join(outDir, outName))
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

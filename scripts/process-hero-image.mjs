// Build-tids behandling af hero-banneret. Konverterer den tunge PNG (~2,7 MB)
// til responsive WebP-varianter + én JPG-fallback + et og:image (1200×630).
//
// KØRSEL:  node scripts/process-hero-image.mjs
//
// Kun format/resize — intet AI. Output committes, så app-buildet ikke afhænger
// af scriptet eller sharp.

import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const imagesDir = join(__dirname, '..', 'public', 'images')
const SRC = join(imagesDir, 'palmy-hero-banner.png')

const WIDTHS = [800, 1200, 1600]
const WEBP_QUALITY = 78
const JPG_QUALITY = 80

async function main() {
  const meta = await sharp(SRC).metadata()
  console.log(`Kilde: ${meta.width}×${meta.height} PNG`)

  // Responsive WebP i banner-forholdet (bevarer højde/bredde).
  for (const width of WIDTHS) {
    const out = join(imagesDir, `palmy-hero-${width}.webp`)
    await sharp(SRC).resize({ width }).webp({ quality: WEBP_QUALITY }).toFile(out)
    console.log(`  ✓ palmy-hero-${width}.webp`)
  }

  // JPG-fallback (til <picture> når WebP ikke understøttes).
  await sharp(SRC)
    .resize({ width: 1200 })
    .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
    .toFile(join(imagesDir, 'palmy-hero-1200.jpg'))
  console.log('  ✓ palmy-hero-1200.jpg (fallback)')

  // og:image – fast 1200×630 (1.91:1), JPG for bredest social-kompatibilitet.
  await sharp(SRC)
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' })
    .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
    .toFile(join(imagesDir, 'palmy-hero-og.jpg'))
  console.log('  ✓ palmy-hero-og.jpg (1200×630)')

  console.log('Færdig.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

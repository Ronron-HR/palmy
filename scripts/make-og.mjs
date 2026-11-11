// Delebillede (Open Graph) 1200×630: palmy-logo-paa-groen.svg centreret på
// #23362B, ingen anden tekst (Ronny, 11.11.2026). Kør: node scripts/make-og.mjs
// Logoet ligger i scripts/assets/ (kopi fra handoff-mappen, som ikke er i git).
//
// Logoets tegnede flade fylder 825,5 × 529,5 af SVG'ens 1000 × 609 og står
// allerede centreret i filen. Det skaleres, så den tegnede flade er halvdelen
// af billedets højde (315 px), og hele SVG'en lægges midt på.
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { readFileSync } from 'node:fs'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const W = 1200
const H = 630
const GREEN = '#23362B' // = --color-green (tokens.css)
const INK_H = 529.5 // tegnet højde i SVG-enheder
const SVG_W = 1000
const target = H / 2 // tegnet højde i px
const logoW = Math.round((SVG_W * target) / INK_H)

const svg = readFileSync(join(root, 'scripts/assets/palmy-logo-paa-groen.svg'))
const logo = await sharp(svg, { density: 300 }).resize({ width: logoW }).png().toBuffer()
const meta = await sharp(logo).metadata()

await sharp({ create: { width: W, height: H, channels: 3, background: GREEN } })
  .composite([{ input: logo, left: Math.round((W - meta.width) / 2), top: Math.round((H - meta.height) / 2) }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(join(root, 'public/images/palmy-og.jpg'))

console.log(`✓ public/images/palmy-og.jpg (${W}×${H}, logo ${meta.width}×${meta.height})`)

// Build-tids rasterisering af public/favicon.svg til PNG-fallbacks:
// favicon-32.png (browsere uden SVG-favicon) og apple-touch-icon.png (180px,
// iOS-hjemmeskærm). Kør: node scripts/process-favicon.mjs
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const svg = join(root, 'public', 'favicon.svg')

await sharp(svg, { density: 384 }).resize(32, 32).png().toFile(join(root, 'public', 'favicon-32.png'))
await sharp(svg, { density: 384 })
  .resize(180, 180)
  .flatten({ background: '#faf6ee' })
  .png()
  .toFile(join(root, 'public', 'apple-touch-icon.png'))
console.log('✓ favicon-32.png, apple-touch-icon.png')

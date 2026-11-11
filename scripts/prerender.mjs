// Build-tids prerendering. Køres af `npm run build` EFTER `vite build` og
// SSR-buildet af src/entry-server.jsx:
//
//   vite build                                   → dist/ (klient)
//   vite build --ssr src/entry-server.jsx        → dist-ssr/entry-server.js
//   node scripts/prerender.mjs                   → dist/<rute>/index.html
//
// For hver rute i src/seo.js (PRERENDER_ROUTES) renderes React-appen til
// statisk HTML, som skrives ind i #root i det byggede index.html sammen med
// rutens <head>-metadata (title, description, canonical, Open Graph, JSON-LD).
// Resultatet er rigtige HTML-filer, som Google og gæster får med det samme —
// klienten hydrerer bagefter (src/main.jsx). Sitemap genereres samme sted, så
// den aldrig kan komme i utakt med ruterne.

import { execSync } from 'node:child_process'
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/
const ROOT_TAG = '<div id="root"></div>'

async function main() {
  const template = await readFile(join(dist, 'index.html'), 'utf8')
  if (!SEO_BLOCK.test(template)) {
    throw new Error('prerender: index.html mangler <!--seo:start--> … <!--seo:end-->')
  }
  if (!template.includes(ROOT_TAG)) {
    throw new Error(`prerender: index.html mangler ${ROOT_TAG}`)
  }

  // Preload af de skrifter, første skærm bruger (Libre Caslon 700 + 400 italic,
  // Source Sans 3 400/600/700 — latin-subset, woff2). Vite hasher filnavnene,
  // så de findes her efter build. Source Sans italic (kun undertitlen under
  // "Hovedretter") hentes først, når den bruges.
  const CRITICAL_FONTS = [
    /^libre-caslon-text-latin-700-normal-[\w-]+\.woff2$/,
    /^libre-caslon-text-latin-400-italic-[\w-]+\.woff2$/,
    /^source-sans-3-latin-400-normal-[\w-]+\.woff2$/,
    /^source-sans-3-latin-600-normal-[\w-]+\.woff2$/,
    /^source-sans-3-latin-700-normal-[\w-]+\.woff2$/,
  ]
  // Caslon italic bruges kun i forsidens tagline → preloades kun dér.
  const assetFiles = await readdir(join(dist, 'assets'))
  const preloadFor = (path) =>
    CRITICAL_FONTS.filter((re) => path === '/' || !String(re).includes('400-italic'))
      .map((re) => {
        const file = assetFiles.find((f) => re.test(f))
        if (!file) throw new Error(`prerender: skrift mangler i dist/assets: ${re}`)
        return `<link rel="preload" as="font" type="font/woff2" href="/assets/${file}" crossorigin />`
      })
      .join('\n    ')

  const entry = pathToFileURL(join(ssrDir, 'entry-server.js')).href
  const { render, PRERENDER_ROUTES, renderSitemap } = await import(entry)

  console.log(`Prerenderer ${PRERENDER_ROUTES.length} ruter → dist/`)
  for (const route of PRERENDER_ROUTES) {
    const { html, head } = render(route.path)
    if (!html || html.length < 200) {
      throw new Error(`prerender: ${route.path} gav tom/for kort HTML`)
    }

    // Funktions-replacement, så '$' i indholdet aldrig tolkes som mønster.
    const page = template
      .replace(SEO_BLOCK, () => `<!--seo:start-->\n    ${preloadFor(route.path)}\n    ${head}\n    <!--seo:end-->`)
      .replace(ROOT_TAG, () => `<div id="root">${html}</div>`)

    const out = join(dist, route.file)
    await mkdir(dirname(out), { recursive: true })
    await writeFile(out, page)
    console.log(`  ✓ ${route.path.padEnd(12)} → ${route.file}`)
  }

  // Sitemap: lastmod = dato for seneste commit (indholdet ændrer sig kun via
  // git), med build-datoen som fallback hvis git ikke er tilgængelig.
  let lastmod = ''
  try {
    lastmod = execSync('git log -1 --format=%cs', {
      cwd: root,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim()
  } catch {
    // git mangler eller ingen historik — brug build-datoen.
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) lastmod = new Date().toISOString().slice(0, 10)
  await writeFile(join(dist, 'sitemap.xml'), renderSitemap(lastmod))
  console.log(`  ✓ sitemap.xml (lastmod ${lastmod})`)

  await rm(ssrDir, { recursive: true, force: true })
  console.log('Færdig.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

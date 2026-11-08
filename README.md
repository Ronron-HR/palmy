# Palmy Spisested

Hjemmeside for Palmy Spisested (vietnamesisk restaurant og takeaway i Hjortshøj). Al bestilling sker over telefonen, så siden handler om at vise menuen og få gæsten til at trykke "Ring".

Vite + React 19 + Tailwind 4. Alle sider prerenderes til statisk HTML ved build og hostes på Cloudflare Pages.

## Kommandoer

```
npm run dev      # udvikling
npm run build    # vite build + SSR-build + prerender (SKAL bruges på hosten)
npm run lint
```

## Sider

`/` forside · `/menu` hele menukortet · `/historien` · `/billeder` (rullende galleri) · `/privatliv` · `/menu/print` og `/bestilling` (interne, noindex).
Ruter, titler og schema bor i `src/seo.js`; routeren i `src/App.jsx`.

## Hvor ændrer jeg hvad?

| Hvad | Hvor |
|---|---|
| Telefon, adresse, åbningstider, tekster, FAQ | `src/content.js` (eneste kilde) |
| Retter, priser, numre | `src/data/menu.ts` — numrene følger det trykte kort og må ikke omnummereres |
| Billeder og videoer (også galleriet) | `src/media.js` + filer i `public/images` og `public/videos` |
| Farver og typografi | `src/index.css` (`@theme`; mørkt tema som standard, `.paper` til print/internt) |

## Billeder og video

Kun Palmys eget materiale (ingen AI, ingen stockfotos). Billeder lægges som AVIF + WebP i flere bredder (`palmy-<navn>-<bredde>x<højde>.<format>`), loops som MP4 + WebM med WebP-poster; se `src/media.js`. Anrettede retter er bevidst ikke med, før der er fotos i professionel kvalitet — nye fotos føjes til `media.js`.

## Skrifttyper

Instrument Serif og Hanken Grotesk er selv-hostede via `@fontsource` (ingen Google Fonts).

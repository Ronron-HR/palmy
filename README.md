# Palmy Spisested

Hjemmeside for Palmy Spisested, en vietnamesisk familierestaurant i Hjortshøj. Al bestilling sker over telefonen, så siden har én opgave: gøre det let at vælge retter på menuen og ringe.

Designet er v3, "det trykte Palmy" (nov. 2026): siden ser ud som menukortet og skiltet på disken. Læs **`DESIGN-REGLER.md`** før du ændrer noget visuelt, og se **`docs/design-system.md`** for selve designet. Alle farver, skrifter, størrelser, afstande og bevægelser står i **`src/styles/tokens.css`**.

Vite + React 19 + Tailwind 4. Alle sider prerenderes til statisk HTML ved build og hostes på Cloudflare Pages.

## Kommandoer

```
npm run dev      # udvikling
npm run build    # vite build + SSR-build + prerender (SKAL bruges på hosten)
npm run lint
node scripts/make-og.mjs         # delebilledet public/images/palmy-og.jpg
node scripts/process-favicon.mjs # favicon-PNG'er ud fra public/favicon.svg
```

`npm run build` fejler, hvis et menunummer mangler eller bruges to gange (integritetstjekket i `src/data/menu.ts`).

## Sider

`/` forside · `/menu` hele menukortet · `/historien` · `/billeder` · `/anmeldelser` · `/find-os` · `/privatliv` · `/menu/print` og `/bestilling` (interne, noindex) · 404.
Ruter, titler, beskrivelser og schema.org bor i `src/seo.js`; routeren i `src/App.jsx`. Gamle links: `/kontakt` sendes til `/find-os` (`public/_redirects`), og `/#kontakt` lander på footeren.

## Hvor ændrer jeg hvad?

| Hvad | Hvor |
|---|---|
| Telefon, adresse, åbningstider og al tekst | `src/content.js` (eneste kilde, ingen tekst i komponenterne) |
| Retter, priser, numre | `src/data/menu.ts`. Numrene følger det trykte kort og må aldrig omnummereres |
| Billeder og videoer, også rækkefølgen på /billeder | `src/media.js` + filer i `public/images` og `public/videos` |
| Farver, skrifter, størrelser, afstande, bevægelse | `src/styles/tokens.css` (Tailwind `@theme`). Ingen andre værdier |
| Bevægelse (CSS) | `src/index.css`, efter MOTION-tabellen i `docs/design-system.md` |

## Billeder og video

Kun Palmys eget materiale (ingen AI, ingen stockfotos). Billeder ligger som AVIF + WebP i flere bredder (`palmy-<navn>-<bredde>x<højde>.<format>`), loops som MP4 + WebM med WebP-poster. Retter vises i 4:5, stemning og facade i 16:9. Fotos af anrettede retter mangler stadig.

## Skrifttyper

Libre Caslon Text (700 og 400 kursiv) og Source Sans 3 (400, 600, 700 og 400 kursiv), selvhostet via `@fontsource` (ingen Google Fonts). Skrifterne til første skærm preloades af `scripts/prerender.mjs`.

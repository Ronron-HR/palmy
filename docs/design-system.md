# Designsystem – Palmy Spisested v3 ("det trykte Palmy")

Godkendt af Ronny 11. nov. 2026. Erstatter "Skiltet" (sort/rød, Anton) og alle tidligere retninger helt.

**Reglerne står i `DESIGN-REGLER.md`. Alle værdier står i `src/styles/tokens.css`.** Komponenter bruger kun tokens: ingen Tailwind-standardfarver, ingen `[37px]`-værdier, ingen nye nuancer. Mål fra prototyperne, der ligger uden for skalaen, er navngivne tokens nederst i `tokens.css`.

## Idé

Hjemmesiden er det trykte Palmy. Toppen af hver side er skiltet "Bestil på forhånd" fra disken: creme flade, logo, telefonnummeret stort i en sort bjælke og infoblokke med en tynd guldstreg. Menuen er menukortet: sorte nummercirkler, navnet i fed, beskrivelsen under, prisen yderst til højre, serif-kategorititler med en streg, der løber til højre, og en rød STÆRK-mærkat. Siden er rolig som et dokument (inspireret af St. JOHNs menuer).

Identitet: trykt · familie · kontant.

## Farver (6)

| Token | Hex | Kun til |
|---|---|---|
| `cream` | `#F0E9D9` | alle flader (målt på skiltet) |
| `black` | `#171715` | tekst, nummercirkler, telefonbjælke, ring-bar |
| `green` | `#23362B` | serif-overskrifter og link-hover |
| `gold` | `#B2985F` | logoet og de tynde streger ved skiltets infoblokke |
| `red` | `#B8282F` | STÆRK |
| `line` | `#CFC6B4` | 1 px-streger |

Ingen opacity-varianter. Radius 0 overalt undtagen nummercirklerne. Ingen skygger.

## Typografi

- **Libre Caslon Text 700:** kategorititler, sidetitler, "Bestil på forhånd", citatet på Historien. **400 kursiv:** kun taglinen.
- **Source Sans 3 400/600/700 (+ 400 kursiv):** alt andet. Priser 700 med `tabular-nums`, altid "95 kr.".
- **Skala:** 14 / 17 / 20 / 28 / 44 / 52, og 88 kun til telefonnummeret på desktop-forsiden.

## Spacing og layout

Skala 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 56 / 64 (`p-1` … `p-16`). Mobil: én spalte, 20 px sidemargen. Desktop: Forside og Menu i 1040-spalten (kategorier med flere end 2 retter i to spalter med 64 imellem), øvrige sider i 680. Layoutet skifter ved 768 px; 88 px-nummeret fra 1024 px.

## Komponenter

| Komponent | Fil |
|---|---|
| Skiltet (fuldt på Forside, kompakt ellers) | `src/components/Skilt.jsx` |
| Desktop-links og mobilmenu (dialog, fokusfælde, Esc) | `src/components/Navigation.jsx` |
| Ring-bar (kun mobil, skjult + `inert` mens det store nummer ses) | `src/components/RingBar.jsx` |
| Menurække, kategorititel, nummercirkel, pris | `src/components/menu/` |
| Hele menuen med sticky kategori-nav og karryfoto | `src/components/menu/MenuSections.jsx` |
| Anmeldelse (ingen datoer, stjerner eller karrusel) | `src/components/Anmeldelse.jsx` |
| Footer på én linje (`id="kontakt"`) | `src/components/Footer.jsx` |

## Bevægelse

Kun dette bevæger sig (CSS-transitions og IntersectionObserver, intet animationsbibliotek; implementeret i `src/index.css`):

| Element | Bevægelse | Reduced motion |
|---|---|---|
| Telefonbjælke, ring-bar, "Udskriv" | `:active` scale(0.97), 160 ms | ingen scale |
| Nav-links | understregning vokser fra venstre, 200 ms | farveskift |
| Mobilmenu | ind oppefra + fade, 240 ms (ud 160 ms) | kun opacity |
| Ring-bar | glider op, når det store nummer er ude af skærmen | kun opacity |
| Kategori-nav | den aktive streg glider, 200 ms | skifter uden glid |
| Menu, første besøg i sessionen | kategorierne toner ind forskudt (maks. 6) | kun opacity |
| Fotos (karry, galleri) | afsløres nedefra én gang, når de kommer i billedet | opacity |
| Sideskift inden for sitet | indholdet fader, 150 ms | samme |
| Videoer (Billeder) | spiller kun ved ≥ 50 % synlighed | kun poster |

Videoer afspilles aldrig ved reduced motion eller `saveData`.

## Billeder

Kun Palmys egne fotos. Retter 4:5, stemning og facade 16:9. Beskæring er tokens (`--pos-*`). Billeder over folden hentes med `fetchpriority="high"`, resten lazy.

## Print

`/menu` printes på A4 i én spalte, sort på hvid, uden navigation, fotos og knapper; rækker brydes ikke, og kategorititler står aldrig alene nederst. `/menu/print` er en A4-liggende udgave til trykkeriet.

# Review C – Funktion og tilgængelighed (Palmy Spisested)

Regelgrundlag: vercel-labs `web-design-guidelines/SKILL.md` + `web-interface-guidelines/command.md`. Begge blev hentet med curl.
Kørsel: `npm run build` gik igennem uden fejl og uden advarsler (6 ruter prerenderet + sitemap). `npx eslint src` gav 0 fund.
Hydrering: jeg fandt ingen mismatch-kilder ved statisk læsning. `useOpenStatus` og footer-årstallet bruger `useSyncExternalStore` med server-snapshot, `usePathname` giver samme rute på server og klient, og `RingNuBar`/`SignaturRetter` starter med samme state.
Menufiltre/kategoriskift: findes ikke i koden. Både `/menu` og forsiden viser alle sektioner, så aria-pressed/aria-current for filtre er ikke relevant lige nu.
Kontrasttal er WCAG-ratioer, beregnet af alpha-blandede Tailwind-farver mod den faktiske baggrund (cream `#faf6ee`, green-deep `#1f3a2e`).

## P1 – skal rettes

1. **src/components/RingNuBar.jsx:53-61** – Når baren er skjult, har den `aria-hidden="true"`, men `<a href="tel:">` inden i kan stadig fokuseres. Tab lander så på et usynligt link, der ligger uden for skærmen, og det bryder ARIA-reglen om, at aria-hidden-indhold ikke må kunne fokuseres. **Ret:** sæt `inert={!visible}` på wrapperen (React 19 understøtter boolean `inert`) i stedet for eller sammen med `aria-hidden`.
2. **src/pages/Privatliv.jsx:13** – `<main>` mangler `id="indhold"`, så "Spring til indhold" fra Navigation ikke gør noget på /privatliv. Bekræftet i `dist/privatliv.html`. **Ret:** `<main id="indhold" className="bg-cream">`.
3. **src/pages/Menu.tsx:14 + src/components/menu/SectionHeader.jsx:13** – Overskriftshierarkiet springer fra h1 "Menukort" til h3 (sektionerne) uden en h2 imellem. Det samme gælder `MenuPrint.tsx:43`. På forsiden er det korrekt (h2 "Vores menu" → h3). **Ret:** giv SectionHeader en `as`/`level`-prop (standard `h3`) og send `level="h2"` fra Menu.tsx og MenuPrint.tsx.
4. **Kontrast: guld-tekst på cream er 2.23:1** og fejler både AA normal (4.5) og AA stor tekst (3.0):
   - `src/components/Aabningstider.jsx:58`: åbningstiderne, som er sektionens vigtigste information.
   - `src/components/Historie.jsx:88` og `src/components/Kontakt.jsx:101`: de kursive afslutningslinjer (xl, ikke "stor tekst").
   - `src/pages/NotFound.jsx:14` ("404", text-xs) og `src/pages/MenuPrint.tsx:46` ("Menukort").
   **Ret:** tilføj en token `--color-gold-dark: #86672a` (4.89:1 på cream) i `src/index.css` og brug `text-gold-dark` til tekst på lys baggrund. Guld kan blive som accent på streger og ikoner.
5. **Kontrast: dæmpet tekst under 4.5:1 på cream:**
   - `src/pages/Privatliv.jsx:18` `text-green-deep/50`: 2.78
   - `src/pages/Menu.tsx:60` "Print-venlig version" `text-green-deep/40` + text-xs: 2.20
   - `src/components/menu/DishCard.jsx:33` note `text-slate-dish/50`: 2.87
   **Ret:** brug mindst `/70` (green-deep/70 = 4.72, slate/70 = 4.98).
6. **Kontrast i footeren: `text-cream/50` på green-deep er 4.11** på små tekster (`src/components/Footer.jsx:68` preorderNote text-xs og `:109` copyright-linjen text-xs). **Ret:** `text-cream/60` (5.21) eller højere.
7. **src/components/Hero.jsx:29-31** – På desktop (`sm:items-center`) står H1, brødtekst og ghost-knapper midt i billedet, hvor gradienten kun er `via-green-deep/25`. Billedet har højlys (max 255 i alle kanaler, bl.a. ris og tallerkener). Cream-tekst oven på et lyst område med 25 % grøn ovenpå giver ca. 1.5:1. **Ret:** tilføj en venstre-gradient på sm+, fx et ekstra lag `hidden sm:block absolute inset-0 bg-gradient-to-r from-green-deep/80 via-green-deep/40 to-transparent`, eller flyt via-stop til `/55`.

## P2 – bør rettes

8. **src/components/Link.jsx:18-20** – Ved klient-navigation (fx Footer "Menukort" og "Tilbage til forsiden") flyttes fokus ikke, og ruteskiftet annonceres ikke. Det klikkede link unmountes, så fokus falder til `<body>`, og en skærmlæser hører intet. **Ret:** fokusér den nye sides `<h1>` eller `<main>` efter `navigate()`: giv `main` `tabIndex={-1}` og kald `document.getElementById('indhold')?.focus({preventScroll:true})` i en `requestAnimationFrame`. Titlen opdateres allerede af `useDocumentHead`.
9. **src/components/SignaturRetter.jsx:57 og src/components/Historie.jsx:60** – Reveal-animationen bruger `transition-all duration-1000` med `translate-y-6 opacity-0` og har ingen `motion-reduce`-variant. Samtidig ligger begge sektioner med `opacity-0` i den prerenderede HTML, så de er usynlige uden JS, eller indtil hydrering og IntersectionObserver har kørt. **Ret:** `transition-[opacity,transform] motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100`. Overvej også kun at skjule efter mount (fx en `data-js`-klasse på `<html>`), så indholdet er synligt i SSR-HTML'en.
10. **src/components/SignaturRetter.jsx:126-135** – Carousel-prikkerne er 8×8 px (aktiv 24×8). Det er under WCAG 2.5.8 (24 px) og langt under 44 px til touch. Desuden bruges `transition-all`. **Ret:** gør knappen til et hit-område på mindst `h-6 min-w-6` (eller `p-2`) med prikken som en indre `<span>`, og brug `transition-[width,background-color]`.
11. **src/components/SignaturRetter.jsx:71** – Den vandrette scroll-container på mobil kan ikke fokuseres, og den indeholder ingen fokuserbare elementer, så den kan ikke scrolles med tastatur i Safari/Firefox. **Ret:** `tabIndex={0} role="region" aria-label="Favoritretter"` + `focus-visible:ring-2 focus-visible:ring-gold`. Fjern dem på `sm:`, hvor griddet ikke scroller, eller lad dem blive.
12. **src/components/Navigation.jsx:84** – Hamburgerknappen er `h-9 w-9` = 36 px, altså under 44 px touch-target. **Ret:** `h-11 w-11`, og lad ikonet forblive `w-6`.
13. **src/index.css (global)** – Fokusmarkering er inkonsekvent. Kun hamburgeren og mobilmenuens links har en `focus-visible:ring`. Alle andre links og knapper (Hero-CTA'er, RingKnap, footer, FAQ-summary, kortknap, carousel-prikker, Bestilling-keypad) bruger browserens standard-outline, som er svag på mørk grøn. **Ret:** tilføj en global regel `:where(a,button,summary,[tabindex]):focus-visible { outline: 2px solid var(--color-gold); outline-offset: 3px; border-radius: inherit; }`. Guld på green-deep giver 5.14:1 og guld på cream 2.23:1. På cream er grøn outline bedst, så brug fx `outline-color: var(--color-green-deep)` som standard og guld i `.bg-green-deep`-kontekster.
14. **Hover sænker kontrasten** (reglen: "interactive states increase contrast"):
    - `src/components/Navigation.jsx:50` `hover:text-gold`: 11.44 → 2.23 på cream.
    - `src/components/SignaturRetter.jsx:143` `hover:text-gold`: 7.72 → 5.30.
    **Ret:** `hover:text-green-deep-light` med underline, eller `hover:text-gold-dark` (se punkt 4). I Signatur-linket kan du bruge `hover:text-cream`.
15. **src/components/Kontakt.jsx:78-88** – Når man klikker "Vis kort", unmountes knappen, og fokus går tabt til `<body>`. **Ret:** sæt en ref på iframen og kald `focus()` i en effekt, når `mapLoaded` bliver true. Alternativt kan du beholde knappen og vise iframen under den.
16. **Navigation på undersider mangler telefon på mobil** – `RingNuBar` renderes kun i `src/pages/Home.jsx:26`, og header-CTA'en er `hidden md:flex` (`Navigation.jsx:57`). På /menu, /privatliv og 404 er der derfor ingen synlig "Ring nu" på mobil, ud over et inline-link i Menu.tsx:23. **Ret:** render `RingNuBar` (eller en simpel fast bar) også i `App.jsx` for `/menu`, eller tilføj et tel-link i mobilmenuen (`Navigation.jsx:99`).
17. **src/components/Hero.jsx:34 og :60-62** – `AabenStatus`-pillen og `status.subLine` renderes ikke i SSR (UNKNOWN), men dukker op efter hydrering. Det skubber H1 og CTA'er (layout shift i LCP-området). **Ret:** reservér pladsen, fx en wrapper med fast `min-h-[2.25rem]` til pillen og `min-h-[1.25rem]` til underlinjen, eller render en `invisible` placeholder i UNKNOWN-tilstanden.
18. **src/components/RingNuBar.jsx:55** – Når den faste bund-bar (ca. 76 px) er synlig, dækker den det nederste af viewporten. Tastaturfokus og "scroll til ankre" kan derfor ende under baren (reglen: sticky footers må ikke dække fokuseret element). **Ret:** tilføj `scroll-padding-bottom: 6rem` på `html` under `@media (max-width: 767px)` i index.css. Overvej også `motion-reduce:transition-none` på baren.

## P3 – nice to have

19. **Tabular-nums mangler på priser og tider**:
    - `src/components/menu/PriceList.jsx:10` og `:19`
    - `src/components/SignaturRetter.jsx:112`
    - `src/pages/Bestilling.tsx:167` og `:177`
    - `src/components/Aabningstider.jsx:58`
    - `src/components/Footer.jsx:64`

    **Ret:** tilføj `tabular-nums`, især i PriceList, hvor priserne skal flugte lodret.
20. **src/content.js:46-47** – `hours.schedule` bruger "16:00–20:30" (kolon), mens resten af sitet bruger dansk "16.00–20.30" (`dk()`). Det ses i Aabningstider.jsx:58 og Footer.jsx:64. **Ret:** `time: \`${dk(openTime)}–${dk(closeTime)}\``.
21. **Eksterne links med `target="_blank"` siger ikke, at de åbner nyt vindue**: `Faq.jsx:29`, `Kontakt.jsx:92`, `Footer.jsx:45`, `Privatliv.jsx:50`. **Ret:** tilføj `<span className="sr-only"> (åbner i nyt vindue)</span>` eller et lille ikon med `aria-hidden` + sr-tekst.
22. **src/components/Navigation.jsx:93-110** – Mobilmenuen renderes betinget, så `aria-controls="mobil-menu"` peger på et id, der ikke findes, når menuen er lukket. Ikonet skifter heller ikke til et X. Menuen lukker ikke ved klik udenfor. **Ret:** render altid `<nav id="mobil-menu" hidden={!isOpen}>`, skift de tre streger til et X når `isOpen`, og luk ved `pointerdown` uden for headeren. Bemærk: det er et disclosure-mønster, ikke en modal. Der skal **ikke** være en fokusfælde, og den nuværende Escape-adfærd med fokusretur er korrekt.
23. **src/components/Navigation.jsx:46-54** – Nav-links har ingen `aria-current`. På /menu peger "Menu" på `/#menu` (forsidesektionen), og der er intet header-link til selve /menu-siden. **Ret:** overvej at lade "Menu" pege på `/menu`, når man ikke er på forsiden, og sæt `aria-current="page"` på det aktive punkt.
24. **src/components/Historie.jsx:7-27** – `SideText` (lodret "Åbent fredag & lørdag" / "Palmy Spisested") er dekoration, men læses op af skærmlæsere og har 1.72:1 i kontrast (`text-gold/70` på cream). **Ret:** `aria-hidden="true"` på wrapper-div'en.
25. **src/components/Historie.jsx:5 og :46** – Info-bjælkerne bruger `text-[10px]` med versaler og tracking. Det er for småt til at kunne læses (kontrasten 6.48 er ok). **Ret:** mindst `text-xs` (12 px).
26. **src/components/menu/DishCard.jsx:20** – Lange sammensatte retnavne kan ikke ombrydes inde i `min-w-0`-kolonnen og kan løbe ind i priskolonnen på 320 px. **Ret:** `break-words hyphens-auto` (siden har allerede `lang="da"`).
27. **src/components/SignaturRetter.jsx:48** – `scrollIntoView({ behavior: 'smooth' })` ignorerer prefers-reduced-motion (CSS-guarden i index.css:22 gælder kun for `scroll-behavior` på html). **Ret:** `behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'`.
28. **src/index.css** – `touch-action: manipulation` og en bevidst `-webkit-tap-highlight-color` mangler. Desuden er `<meta name="theme-color" content="#1f3a2e">` (index.html:7) mørkegrøn, mens headeren og sidebaggrunden er cream. **Ret:** `html { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }` (kun hvis alle elementer har hover/active-feedback) og overvej `theme-color` `#faf6ee`.
29. **src/pages/Bestilling.tsx** (intern side, lav prioritet):
    - Keypad-knapperne `⌫` og `C` (:111-122) mangler `aria-label` ("Slet ét tegn", "Ryd").
    - Resultatområdet (:127) har ingen `aria-live="polite"`.
    - Hjælpetekster har lav kontrast: `text-green-deep/40` 2.20 (:207, :211, :219), `/50` 2.78 (:149, :163) og `/30` 1.76 (:241).
    - `autoFocus` (:89) kombineres med en dobbelt `focus()` i useEffect (:26-28). Det er ok til en desktop- eller tablet-kasse, men fjern en af dem.
30. **Indhold/jura (uden for a11y, men vigtigt) [se genkontrol R3]:** `src/pages/Privatliv.jsx:38-40` siger "Vi bruger heller ikke analyseværktøjer eller sporing". Men `index.html:63-67` loader Cloudflare Web Analytics, og `src/lib/track.js` sender klik-beacons. **Ret:** opdatér teksten, så den beskriver den cookieless Cloudflare-statistik og CTA-tællingen, og opdatér "Senest opdateret".

---

# Genkontrol 1 – hvad der stadig er brudt eller nyt brudt

Statisk gennemgang af arbejdskopien. `npx eslint src` gav 0 fund. `[hidden]{display:none!important}` er bekræftet i den byggede CSS, så `hidden` på mobilmenuen virker trods `flex`.

## Nyt brudt (regression)

**R1. Fokusringen er usynlig på mørke flader og på grønne CTA'er.**
- **Global regel:** `src/index.css:44-47` sætter `outline: 2px solid green-deep` overalt. På green-deep og green-hero giver det 1.0:1, altså usynligt, disse steder:
  - Alle links i footeren: `src/components/Footer.jsx:37-110`
  - Scroll-regionen i carousellen: `src/components/SignaturRetter.jsx:62-67`
  - Carousel-prikkerne: `src/components/SignaturRetter.jsx:118-124`
- **RingKnap:** `src/components/RingKnap.jsx:18` bruger `focus-visible:outline-current`. Det giver to fejl:
  - Den grønne variant får en cream-outline på cream-baggrund (1:1). Det rammer Menu.jsx:35, Menu.tsx:32 og RingNuBar.
  - Den guld-variant får en green-deep-outline uden på knappen, oven på heroens mørke gradient. Det er næsten usynligt.

**Ret:**
- Byt `outline-current` ud med en farve pr. variant: `green: '… focus-visible:outline-green-deep'` og `gold: '… focus-visible:outline-cream'`.
- Tilføj i index.css: `.bg-green-deep :focus-visible, .bg-green-hero :focus-visible { outline-color: var(--color-gold-light); }`. Det giver 7.5:1 på green-deep.
- Alternativt kan du sætte `focus-visible:outline-gold-light` direkte på footer-links, track og prikker.

## Stadig brudt

**R2. `src/components/Link.jsx:18-20` (uændret):** fokus flyttes ikke ved klient-navigation, så det klikkede link forsvinder og fokus falder til `<body>`.
**Ret:** efter `navigate(to)` skal du i `requestAnimationFrame` fokusere `document.getElementById('indhold')`. Giv `<main>` på alle sider `tabIndex={-1}` og `focus:outline-none` (kun main), eller fokusér `h1` med `tabIndex={-1}`.

**R3. `src/pages/Privatliv.jsx:39-40` (+ kommentar :6-8):** teksten siger stadig "Vi bruger heller ikke analyseværktøjer eller sporing". Men `index.html` loader Cloudflare Web Analytics, og `src/lib/track.js` sender CTA-beacons. `:47` siger desuden "På kontaktsiden", men det er en sektion på forsiden.
**Ret:** beskriv den cookieless Cloudflare-statistik og klik-tællingen, skriv "I kontakt-sektionen på forsiden", og opdatér "Senest opdateret" (`:18`).

**R4. `src/components/Hero.jsx:35` og `:55-57` (uændret):** status-pillen og `subLine` renderes først efter hydrering og skubber H1 og CTA'er. Det giver layout shift i LCP-området.
**Ret:** reservér pladsen (`min-h-[2.25rem]` til pillen og `min-h-5` til underlinjen), eller render en `invisible` placeholder i UNKNOWN-tilstanden.

**R5. `src/components/Kontakt.jsx:58-80` (uændret):** når man klikker "Vis kort", unmountes knappen, og fokus går tabt.
**Ret:** sæt en `ref` på iframen og kald `useEffect(() => { if (mapLoaded) iframeRef.current?.focus() }, [mapLoaded])`.

**R6. Eksterne links uden besked om nyt vindue:**
- `src/components/Faq.jsx:29-31`
- `src/components/Footer.jsx:45-52`
- `src/pages/Privatliv.jsx:50-57`

Kontakt.jsx:89 er rettet.
**Ret:** tilføj `<span className="sr-only"> (åbner i nyt vindue)</span>` på de tre links.

**R7. `src/components/SignaturRetter.jsx:46`:** `scrollIntoView({ behavior: 'smooth' })` ignorerer stadig reduced-motion. CSS-reglen i index.css:74-85 påvirker ikke JS-scroll.
**Ret:** `behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'`.

## Nyt – mindre

**R8. Dobbelt scroll-offset ved kategorispring:** `src/components/menu/MenuSections.jsx:71` har `scroll-mt-32` (128 px), og den lægges oven i `html { scroll-padding-top: 4.5rem }` (index.css:23). Sektionsoverskriften lander derfor ca. 200 px fra toppen, mens header og kategorilinje kun fylder ca. 113 px (mobil) og ca. 121 px (sm+).
**Ret:** `scroll-mt-12` (48 + 72 = 120 px), eller fjern scroll-mt og sæt kun scroll-padding.

**R9. Den aktive kategori kan ligge uden for skærmen:** `src/components/menu/MenuSections.jsx:42-62`. På mobil scrolles den aktive kategori ikke ind i den vandrette liste, når den skifter ved scroll, så `aria-current`-markeringen kan være usynlig.
**Ret:** i `setActive`-effekten kalder du `document.querySelector('[aria-current="true"]', nav)?.scrollIntoView({ inline: 'nearest', block: 'nearest' })`. Brug ingen smooth-scroll, når reduced-motion er slået til.

**R10. Global reduced-motion-regel:** `src/index.css:74-80` sætter `animation-duration: 0.01ms`, men ikke `animation-iteration-count`. Uendelige animationer (fx `animate-spin`/`animate-bounce`, hvis de kommer tilbage) kører så i en uendelig mikro-løkke.
**Ret:** tilføj `animation-iteration-count: 1 !important; scroll-behavior: auto !important;`.

---

# Genkontrol 2 (funktion)

Testet i Chrome mod produktionsbuildet på http://localhost:4174. Mobil er testet i en 390×844-iframe på en /robots.txt-værtsside. Desktop er testet direkte i fanen, som er 2560 px bred. Testene er kørt med JS-klik/fokus og med rigtige tastetryk (Tab/Enter).

## Virker (testet)

- **Mobilmenu:**
  - Knappen er 44×44. Åbn/luk skifter `aria-expanded` og `hidden` og ændrer aria-label til "Luk menu".
  - Escape med fokus inde i menuen lukker den og sender fokus tilbage til knappen.
  - Menulinks lukker menuen og navigerer (#historie lander 72 px fra toppen under en header på 57 px).
  - "Menu"-linket i headeren går til `#menu`.
- **Kategorilinjen** på / og /menu, alle seks kategorier:
  - `aria-current` følger klikket. Overskriften lander 119-120 px fra toppen, mens kategorilinjen slutter ved 114 px på mobil.
  - Tab, Tab, Enter fra "Forretter" aktiverer "Ekstra Retter".
  - På /menu er overskrifterne h2.
- **Fokusringe er synlige:**
  - Gold-light på signatur-regionen, prikkerne og CTA'en.
  - Cream (`currentColor`) i footeren.
  - Cream på hero-knapperne.
  - Green-deep på grønne RingKnap'er på cream og i bund-baren.
  - Bund-baren er `inert` når den er skjult og fokuserbar når den er synlig.
- **"Vis kort"** flytter fokus til iframen ("Palmy Spisested på Google Maps").
- **Klient-navigation** (/menu "Til forsiden", footer "Menukort", "Privatlivspolitik", "Forside"): ingen genindlæsning, og title og canonical opdateres. Fokus lander på `main#indhold`.
- **Konsol:** ingen app-fejl eller React-advarsler på /, /menu, /privatliv og /bestilling (kun logs fra en Chrome-udvidelse). Ingen ressourcer svarede ≥400.
- **Favicon:** `/favicon.svg` giver 200 `image/svg+xml`, dekoder, og er linket på alle fire sider.
- **Ingen vandret overflow** ved 390 px.

## Fund

**F1. Den aktive kategori følger ikke altid med i den vandrette liste (mobil).** `src/components/menu/MenuSections.jsx:52-59`.
- Reproduceret på /menu ved 390 px. Fra Forretter (scrollLeft 0) og hop til Børnemenu: `aria-current` blev "Børnemenu", men listen blev stående på scrollLeft 0, så det aktive link lå uden for listen.
- Fra Børnemenu og klik på "Ekstra Tilbehør": listen stoppede på 189 i stedet for 304, og linket var delvist skjult.
- I andre forløb virkede det. I en tidlig sampling stod listen ét skridt bagud: den scrollede til målet for den forrige aktive kategori.
- Det skyldes sandsynligvis, at smooth `list.scrollTo` startes igen eller afbrydes, mens vinduet stadig smooth-scroller (`html { scroll-behavior: smooth }`).

**Ret:** brug `behavior: 'auto'` for listen (den er lille, og instant er fint), og beregn målet med `link.getBoundingClientRect().left - list.getBoundingClientRect().left + list.scrollLeft`. Alternativt kan du synkronisere listen på vinduets `scrollend` i stedet for på hver `active`-ændring.

**F2. Ruteskift animerer en lang scroll op gennem den nye side.** `src/hooks/usePathname.js:41`.
- `window.scrollTo(0, 0)` arver `html { scroll-behavior: smooth }`.
- Målt: footer "Menukort" fra bunden af forsiden (y 6716). Efter 0,4 s var y 2483, efter 1,2 s 132, og først efter ca. 1,6 s 0. Ved 0,9 s lå /menu stadig på y 2477, og /privatliv på y 375.
- Brugeren ser altså en scroll-animation hen over den nye side, og kategorilinjens `active` blinker undervejs.

**Ret:** `window.scrollTo({ top: 0, left: 0, behavior: 'instant' })`.

**F3. Overskriften kommer 3 px ind under kategorilinjen på desktop (sm+).** `src/components/menu/MenuSections.jsx:98`.
- Målt på /menu ved fx "Ekstra Retter": overskriftens top 119, kategorilinjens bund 122.
- Det skyldes at `scroll-mt-12` (48) + `scroll-padding-top` (72) = 120, men header (65) + kategorilinje (57) = 122.

**Ret:** `scroll-mt-12 sm:scroll-mt-16`.

**F4. Faviconet er afhængigt af skrifttypen og har ingen fallback.** `public/favicon.svg:6` og `index.html:6`.
- Ikonet er et `<text>`-element med Fraunces, men SVG-favicons kan ikke hente webfonts. Det renderes derfor med Georgia eller Times, og udseendet varierer mellem operativsystemer.
- Der er ingen PNG/ICO-fallback og ingen `apple-touch-icon`. Safari på iOS viser derfor ikke ikonet, når siden lægges på hjemmeskærmen.

**Ret:**
- Konvertér "P" til en `<path>` (outline fra Fraunces).
- Tilføj `favicon-32.png` / `favicon.ico` og `<link rel="apple-touch-icon" href="/apple-touch-icon.png">` (180×180, cream-baggrund).

## Hovedagentens rettelser efter Genkontrol 2 (funktion)
- F1: kategorilistens vandrette scroll sker nu uden animation og beregnes ud fra getBoundingClientRect (afbrydes ikke af sidens smooth scroll). Målt: "Ekstra Tilbehør" helt synlig efter spring.
- F2: `navigate()` bruger `scrollTo({ top: 0, behavior: 'instant' })`.
- F3: `scroll-mt-16 sm:scroll-mt-20` (136/152 px mod linjens 114/122 px).
- F4: favicon-"P" tegnet som `<path>`; `favicon-32.png` og `apple-touch-icon.png` (180 px) genereret med `scripts/process-favicon.mjs` og linket i index.html.
- Ekstra: aktiv kategori beregnes også ved indlæsning (direkte link `/menu#kort-boernemenu` → "Børnemenu", verificeret).

# Designsystem – Palmy Spisested ("Skiltet")

Redesign 8. nov. 2026. Erstatter det tidligere smaragd/messing-design helt.

## Idé

Palmy bestilles udelukkende over telefonen, og gæsterne siger et **nummer** i røret. Siden er derfor sat som to ting restauranten allerede har: **skiltet på facaden** (hvid versal-skrift på mørk plade) og **den nummererede menutavle**. Kondenseret versal-skrift til numre og overskrifter, en rolig grotesk til al tekst, tre flade farver og hårfine streger. Der er ingen gradienter, skygger, mønstre, kort, afrundinger eller ikoner uden funktion.

## Referencer og hvad der er hentet fra dem

| Reference | Hentet | Bevidst ikke kopieret |
|---|---|---|
| **Honō Restos** (honorestos.com) | Enorme, ultrakondenserede versaler som navigation; hele flader vekslende mellem sort og hvid. Her: kategorierne på forsiden som tavle-rækker og ét stort typografisk greb pr. sektion | Lilla accent, lodret pille-logo |
| **Chin Chin** (chinchinrestaurant.com.au) | Ét kondenseret versal-ansigt og rektangulære konturknapper over et ægte foto af stedet; skarpe hjørner | Neon-pink, fotografi-afhængighed |
| **Hotarutei** (hotarutei.com) | Hårfine streger, små etiketter, rektangulære knapper, billeder i tynd ramme, enormt luft. Her: `border-line`-rækker, versal-etiketter, skarpe knapper | Japansk æstetik, lodret rotation |
| **Bao London** (baolondon.com) | Fladt farvefelt, minimal tekst, retten som eneste pynt. Her: tidtavlen som ren typografi på én flade | Studio-fotografi (vi har ikke retfotos endnu) |
| **Banh Mi & You** (banhmiandyou.com) | Pris knyttet direkte til retten; mobil-først menu med tydelig gruppering | Pille-knapper, cirkel-billeder, justeret brødtekst |
| **Chi Chi** (chichidining.com.au) | Panel-opdeling med tynde streger, tæt komposition | Illustrationerne, maksimalisme |
| **Dishoom** (dishoom.com) | Citater som ren typografi, mørk flade der bærer tekst | Sepia, serif |
| **Mr. Spring & Mrs. Fresh** (mrspringmrsfresh.com) | Advarsel: en vietnamesisk familierestaurant drukner i frimærker, skitser og skriveskrift | Alt |

Alle sites er set på desktop. Mobil er set for alle undtagen Honō (blokerer indlejring) og Noma.

## Farver (semantiske tokens i `src/index.css`)

Komponenter bruger kun tokens (`text-fg`, `text-muted`, `border-line`, `text-signal`, `bg-cta` …), aldrig faste farver. Hvert tema sættes på sektionen: `theme-paper | theme-sand | theme-ink | theme-red`.

| Tema | bg | fg | signal | Bruges til |
|---|---|---|---|---|
| paper (standard) | `#f2ebdd` | `#14110f` | `#b8321e` | menu, FAQ, undersiders brødtekst, 404, privatliv |
| sand | `#e7decb` | `#14110f` | `#a82c19` | anmeldelser (anden papirsektion i en række) |
| ink | `#14110f` | `#f2ebdd` | `#e8553a` | header, hero, historie, Find os, galleri, footer |
| red (chili) | `#b8321e` | `#fbf6ea` | `#14110f` | tidtavlen og bestil-panelet på /menu |

`signal` er chili-rød og bruges til numre, tider, understregning og små markeringer. På blæk er den lysere, så den kan læses.
Målt kontrast: tekst 15,9:1, dæmpet tekst 6,6–8,9:1, signal 5,0–5,2:1 (sand, med den mørkere rød, ca. 4,9:1), knaptekst 5,2–5,5:1.
Den røde flade bruges højst én gang pr. side (tidtavlen), ud over knapper.

## Typografi

Selv-hostet: **Anton** (display, kun versaler, kun store størrelser) og **Be Vietnam Pro** (400–700; tegnet i Vietnam, understøtter vietnamesiske tegn). `.font-display` sætter automatisk versaler.

| Token | Skrift | Bruges til | ca. 390 → 1440 px |
|---|---|---|---|
| `text-h1` | Anton | hero og sidetitler | 38 → 100 px |
| `text-h2` | Anton | alle sektionsoverskrifter | 36 → 74 px |
| `text-h3` | Anton | kategorier, kapitler, ugedage | 32 → 44 px |
| `text-num` | Anton | menunumre (røde) | 42 → 68 px |
| `text-board` | Anton | tidtavlens tal | 43 → 144 px |
| `text-dish` | Be Vietnam Pro 700 | retnavne | 18 → 21 px |
| `.label` | Be Vietnam Pro 600–700, versaler, 0,08 em | knapper, navigation, små etiketter | 13 px |

Brødtekst 16–18 px, beskrivelser 15 px. `text-h1` er `1.4rem + 5.4vw`, så "VIETNAMESISK MAD" står på én linje fra 320 px.

## Grid og spacing

Container `max-w-6xl` (1152 px), 16/24 px gutters, 12 kolonner fra `lg`. Sektionshøjde er ÉN klasse: `.section-y` (`clamp(4rem, 2.4rem + 6vw, 7rem)`). Heroen bryder ud til højre kant på desktop. Hårfine streger (`border-line`) skiller rækker, og kraftige 2 px blæk-streger markerer kategori- og tabeloverskrifter. Hjørner er altid skarpe.

## Sektionernes rytme (forsiden)

| Sektion | Flade | Komposition |
|---|---|---|
| Hero | blæk | enorm overskrift (halen i signal), åbningstid, video som kantløst panel til højre |
| Tidtavle | **chili** | tre enorme tal i tre kolonner |
| Menu | papir | titlen sticky til venstre, rækker til højre (udpluk + kategorier som tavle-rækker) |
| Historie | blæk | billedet til venstre, citatet i signal til højre |
| Anmeldelser | sand | stort "5,0" til venstre, citater til højre |
| Find os | blæk | tider som tabel (dag + tid i Anton), facade, kort |
| FAQ | papir | titlen til venstre, spørgsmål som rækker |
| Følg Palmy + footer | blæk | to rækker, derefter ordmærket i fuld bredde |

Overgange er hårde kanter mellem flader — ingen kurver, gradienter eller dekoration.

## Knapper og navigation

- **Ring** (`RingKnap`) er den ENESTE knap: skarp rektangel i `bg-cta`, versal tekst.
- Alle andre handlinger er `.tlink`: versal tekst med signal-streg under.
- Hover vender rækker om (blæk/papir) i stedet for at tilføje effekter.
- Header (blæk): ordmærke, fem versal-links, Facebook/Instagram (firkantede, desktop), Ring. Mobil: Ring + hamburger → fuldskærms-overlay med Anton-links og en fast bundbar [Se menu][Ring].
- Menuens kategorilinje: versal-faner med 3 px signal-streg under den aktive.

## Menuen

Hver ret er en række: **nummer** (Anton, rød, `text-num`) · navn (Be Vietnam Pro 700) med beskrivelse (15 px, dæmpet) · pris (700, tabulær). Variant-priser lægges under teksten på mobil. Kategorioverskrifter har en 2 px blæk-streg. Menuen animeres ikke. Numre vises præcis som i `src/data/menu.ts`.

## Billeder

Kun Palmys egne. Ingen afrunding, ringe, overlap eller filtre. Sektioner skal se komplette ud uden retfotos — menuen bæres af numrene og kategorierne. Nye billeder føjes til `src/media.js`. De gamle `MAD BILLEDER`-fotos bruges ikke; shotlisten (6 retter, køkken i bevægelse, afhentning; dagslys, skråt ovenfra, ingen blitz) er godkendt. Facadefotoet (skiltet) er sidens vigtigste billede, fordi det er identitetens kilde.

## Forsidens retter (afventer verificering)

`forsideRetter` i `src/content.js` (numrene 1, 3, 6, 11, 12, 13). Vises KUN i dev, med rød stiplet markering, indtil `verificeret` sættes til `true` efter ret-for-ret sammenligning med det trykte menukort. Produktionsbuildet viser kategorierne med deres numre.

## Mobilregler

390 px er udgangspunktet. Én primær handling pr. skærm. Tryk-mål mindst 44 px (undtagen ordmærket, bevidst, og links midt i en sætning). Ingen hover-afhængighed. Animationer er korte (0,3–0,6 s), kun transform/opacity. Hero-videoen får en ensartet blæk-tone (ingen gradient) bag teksten på mobil.

## Hvad der er fjernet

Smaragd/messing/elfenben/teak, palmeblads-mønster, trækorn, Gloock + Hanken Grotesk, piller, afrundede hjørner, kort med rammer, billed-collage med ring, slørede video-headere.

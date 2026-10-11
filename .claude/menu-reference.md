# Menu- og faktareference – Palmy Spisested

Hentet 2026-10-11 med curl (rå, prerenderet HTML) fra:

- F = https://www.palmyspisested.com/ (forsiden, `#menu`-sektionen)
- M = https://www.palmyspisested.com/menu
- P = https://www.palmyspisested.com/menu/print
- B = https://www.palmyspisested.com/bestilling (internt opslag, noindex)
- PV = https://www.palmyspisested.com/privatliv

Alle tre menuvisninger (F, M, P) er **tegn for tegn identiske** for menudelen. Det er kontrolleret maskinelt med diff af den udtrukne tekst. Hver ret nedenfor findes derfor på F, M og P, medmindre andet er angivet.

> VIGTIGT OM KILDEN: Live-sitet er bygget fra netop dette repo (samme Vite-assets, samme tekster, deploy via Cloudflare Pages). Det er altså **ikke en uafhængig kilde**. Det bekræfter kun, at det, der er deployet, svarer til `src/data/menu.ts`. Den reelle autoritet er det trykte menukort, som jeg ikke har adgang til (der findes ingen menubilleder eller PDF'er på sitet, og `/menu.pdf` og `/menukort.pdf` giver 404).

## Menu (kildens rækkefølge)

Format: **nr.** | navn | [Stærk] | beskrivelse (kursiv) | valg/note | prislinjer

### Forretter
Ingen kategorinote.

| Nr. | Navn | Beskrivelse | Valg / note | Pris |
|---|---|---|---|---|
| 1 | Hjemmelavede Luksus Forårsruller | Med rejer, kylling, hakket oksekød, skinke og grøntsager | – | 1 stk. 45 kr · 3 stk. 120 kr |
| 2 | Hjemmelavede Fem Små Forårsruller | Med hakket svinekød, æg, løg, hvidløgspulver, asiatiske svampe og gulerødder. Serveres med sød chilisauce. | – | 45 kr |

### Hovedretter
Kategorinote: "Alle retter serveres med ris eller nudler"

| Nr. | Navn | Beskrivelse | Valg / note | Pris |
|---|---|---|---|---|
| 3 | Stegte nudler med kylling og grøntsager | – | – | 95 kr |
| 4 | Stegte nudler med oksekød og grøntsager | – | – | 95 kr |
| 5 | Stegte ris med skinke, rejer, gulerødder, ærter og æg | – | – | 95 kr |
| 6 | Stegt and med ris eller nudler og kinesisk sød sauce | Med champignon, løg, porre og rød og grøn peberfrugt | "Vælg: Ris eller Nudler" | 115 kr |
| 7 | Indbagte store rejer med sur-sød sauce (Ris) | – | – | 95 kr |
| 8 | Risnudler med rejer og grøntsager · **Stærk** | Tom Yum Goong – med løg, porre, bambusskud, majs, rød chili og svampe | – | 95 kr |
| 9 | Ris med stegt kylling, grøntsager, ingefær og chili | – | – | 95 kr |
| 10 | Oksekød eller kylling med peberfrugt, løg og bambus i rød karry · **Stærk** | – | "Vælg: Oksekød eller Kylling" | 95 kr |
| 11 | Rød karry med ris eller risnudler | Med bambus, chili, bønnespirer, champignon og kokosmælk | – | Med and 115 kr · Med kylling 95 kr · Med oksekød 95 kr |
| 12 | Vietnamesisk Bún Special | Grillet svinekød, hjemmelavede forårsruller, friske grøntsager, peanuts og hjemmelavet fiskesauce med chili, hvidløg og gulerødder | – | 110 kr |
| 13 | Tom Kha Gai | Kokosmælksuppe med kylling, champignon, chili og bønnespirer | Note: "Kan serveres med ris eller risnudler." | Med kylling 95 kr · Med rejer 105 kr |
| 18 | Indbagt Kylling med sur-sød sauce (Ris) | – | – | 95 kr |
| 19 | Kylling Satay med ris og peanut sauce | – | – | 95 kr |
| 20 | Kyllingspyd med Pomfritter | – | – | 89 kr |
| 21 | Grøn karry med risnudler eller ris | Med kokosmælk, svampe, bambusskud, majs, rød og grøn peberfrugt, porre og løg | – | Med kylling 95 kr · Med oksekød 100 kr · Med and 110 kr |

Bemærk: nr. 18–21 står i Hovedretter efter nr. 13, altså før Ekstra Retter (14, 15) og Børnemenu (16, 17). Rækkefølgen er sektionsbaseret og ikke numerisk.
Stavning er gengivet ordret, fx "Pomfritter" (nr. 20) mod "pommes frites" andre steder og "peanut sauce" (nr. 19).

### Ekstra Retter
Ingen kategorinote.

| Nr. | Navn | Beskrivelse | Pris |
|---|---|---|---|
| 14 | 1/2 Grillkylling med pommes frites | – | 80 kr |
| 15 | Pommes Frites (Stor portion) | – | 35 kr |

### Børnemenu
Ingen kategorinote.

| Nr. | Navn | Beskrivelse | Pris |
|---|---|---|---|
| 16 | Crispy Burger | Med salat, agurk og pommes frites | Med kylling 79 kr · Med oksekød 79 kr |
| 17 | Chicken Nuggets (6 stk.) | Med pommes frites og ketchup | 69 kr |

### Drikkevarer (uden numre)
| Navn | Pris |
|---|---|
| Vand | 15 kr |
| Sodavand | 15 kr |

### Ekstra Tilbehør (uden numre)
| Navn | Pris |
|---|---|
| Ekstra ris | 20 kr |
| Ekstra kylling | 25 kr |
| Ekstra svinekød | 25 kr |
| Ekstra oksekød | 25 kr |
| Ekstra and | 30 kr |
| Ekstra nudler | 20 kr |
| Ekstra peanuts | 10 kr |
| Ekstra sur-sød sauce | 10 kr |
| Reje chips | 15 kr |

**Optælling:** 32 punkter i alt. 21 er nummererede (1–21, alle heltal, ingen bogstaver eller underpunkter), og 11 er unummererede (2 drikkevarer og 9 slags tilbehør).
Rækkefølgen af numre: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 18, 19, 20, 21, 14, 15, 16, 17.
Stærk-markering: nr. 8 og 10. "Vælg:"-linjer: nr. 6 og 10. Fri note: nr. 13.

Menuintro (F og M): "Numrene følger vores menukort – du kan bestille efter nummer, når du ringer." Den står ikke på P.

## Fakta

| Felt | Værdi | Kilde |
|---|---|---|
| Navn | Palmy Spisested | F, M, P, PV |
| Telefon (visning) | 81 75 42 99 | F, M, PV (header og footer) |
| Telefon (link) | `tel:+4581754299` | F, M, PV |
| Telefon (schema) | +45 81 75 42 99 | F, M (JSON-LD) |
| Adresse | Hjortshøj Stationsvej 6, 8530 Hjortshøj | F, M, PV |
| Google Maps | https://maps.google.com/?q=Hjortshøj+Stationsvej+6,+8530+Hjortshøj | F, M, PV |
| Geo (schema) | 56.2449015, 10.2683485 | F, M (JSON-LD) |
| Åbningsdage | Fredag og lørdag. "Resten af ugen holder vi lukket." | F (FAQ), footer på F, M og PV |
| Åbningstider | Fredag 16:00–20:30, lørdag 16:00–20:30 | F, M, PV (footer) og JSON-LD |
| Forudbestilling | "Forudbestil fra kl. 15.00 – afhent fra kl. 16.00 og helt frem til lukketid kl. 20.30." | F, M, PV |
| Forudbestilling (Åbningstider-sektionen) | "Ring og forudbestil allerede fra kl. 15.00." / "Afhentning fra kl. 16.00 og frem til vi lukker kl. 20.30." | F |
| Online bestilling | **Findes ikke.** FAQ: "Nej – al bestilling foregår over telefonen. Det går hurtigst, hvis du bestiller efter nummeret på menukortet." | F (FAQ og FAQPage-schema) |
| Bestillingslinks | Ingen eksterne bestillings- eller bookinglinks (ingen Just Eat, Wolt e.l.). Den eneste CTA er `tel:`. | F, M |
| /bestilling | Internt opslagsværktøj til personalet ("Bestilling – internt opslag", taster 1–21 og søgning). Ikke en kundebestilling. `noindex, nofollow`. | B |
| Menuside | "Print-venlig version" → /menu/print, der har knappen "Udskriv / gem som PDF". Der findes ingen statisk PDF. | M, P |
| Tagline | Vietnamesisk mad med kærlighed | F, M, PV |
| Social | @palmyspisested (som tekst og ikke som link. I koden er den markeret som PLADSHOLDER) | F |
| priceRange (schema) | "89–115 kr" (afledt af hovedretter) | F, M JSON-LD |

## Modstridende eller bemærkelsesværdige oplysninger (kilde mod kilde)

1. **Ingen modstrid mellem F, M og P i menuen.** De er identiske.
2. Formatet for tiderne varierer: "16.00–20.30" i brødtekst og "16:00–20:30" i footerens skema. Indholdet er det samme.
3. PV siger "Vi bruger heller ikke analyseværktøjer eller sporing af din adfærd på siden", men alle sider (F, M, P, B, PV) indlæser `https://static.cloudflareinsights.com/beacon.min.js` (Cloudflare Web Analytics). Det er en mulig modstrid. Det er en driftsindstilling og ikke menudata.
4. PV skriver "På kontaktsiden kan du vælge at indlæse et Google Maps-kort". Der findes ingen separat kontaktside, kun sektionen `#kontakt` på forsiden. Det er en mindre unøjagtighed.
5. PV har "Senest opdateret: september 2025", mens footeren viser © 2026.
6. Schema `priceRange` "89–115 kr" dækker kun hovedretterne. Hele kortet spænder fra 10 til 120 kr. Det er bevidst ifølge `src/seo.js:46-54`.

## Ikke læsbart eller ikke verificerbart

- Det trykte menukort er ikke tilgængeligt online (ingen billeder eller PDF). Teksterne kan derfor ikke verificeres mod det fysiske kort. Kommentarerne i `menu.ts` hævder at følge det, fx "Crispy Chicken Burger" → "Crispy Burger" på nr. 16.

## Sammenligning: kilde mod lokal kode

Metode: Teksten er genereret ud fra `src/data/menu.ts` (SECTIONS + dishes, i array-rækkefølge, med samme feltrækkefølge som visningen) og diffet linje for linje mod den udtrukne tekst fra F, M og P.

- `src/data/menu.ts` mod M og F: **IDENTISK** (0 afvigelser).
- `src/data/menu.ts` mod P: **IDENTISK**, bortset fra et manglende linjeskift i slutningen af filen (ikke en reel afvigelse).
- `src/content.js`: telefon (l. 12-15), adresse (l. 4-6, 19), Maps-URL (l. 20), tider 15:00/16:00/20:30 (l. 27-29), dage (l. 33-37), preorderNote (l. 51), FAQ inkl. "Kan jeg bestille online? Nej" (l. 134-135), menuInfo.numberNote (l. 58-59) og signatur-retter nr. 3, 6 og 4 (l. 92-94) stemmer alle ordret med live-sitet.
- Nummerintegriteten håndhæves i `src/data/menu.ts:268-297` (1–21, ingen dubletter). Det stemmer med kilden.

**Afvigelser fundet: 0.** (Første kontrol.) Git working tree for `src/` er uændret i forhold til HEAD `1a32fe3`, og live svarer til den commit (nr. 21 og beskrivelserne på 2, 6, 8 og 12 er med).

## Genkontrol 2026-10-11 (efter strukturændringen: `number` som tekst og nyt `id`)

1. **`src/data/menu.ts` (working tree):** Teksten genereret ud fra `SECTIONS` og `source` er byte-identisk med referencen. Der er 32 punkter. Numrene '1' til '21' er strenge og står i samme rækkefølge (1–13, 18–21, 14–17). Navne, beskrivelser, valg, varianter, priser, Stærk-markeringer, noter og sektioner er uændrede. Diffen mod HEAD ændrer kun `number` fra tal til tekst, tilføjer `id` og integritetstjekket for unikke id'er.
2. **dist (build):**
   - `dist/menu.html`: menudelen er identisk med referencen.
   - `dist/index.html`: menusektionen er identisk med referencen.
   - `dist/menu/print.html`: identisk med referencen.
   - "Stærk" vises nu inline i samme `<p>` som navnet (`<span>` efter et mellemrum). Teksten er den samme.
   - Menu-JSON-LD (`hasMenu`, 38 linjer inkl. identifier og offers) i `dist/menu.html` er identisk med live-versionen.
   - Tastaturet i `dist/bestilling.html` viser numrene 1–21 i rækkefølge.
3. **Dev-server:** `http://localhost:5173` svarer 200. Modulet `/src/data/menu.ts`, som Vite serverer, indeholder `number: "1"…"21"` i kildens rækkefølge, og `MenuSections.jsx` serveres. Dev og dist bygger altså på samme data. Den renderede DOM i dev er ikke kontrolleret, fordi curl kun giver shell-HTML.

**Afvigelser i menuen: 0.**

Ændringer uden for menuen (dist i forhold til live, ikke fejl):
- Tider i skemaet vises nu som "16.00–20.30" i stedet for "16:00–20:30" (`src/content.js:46-47`).
- Nav har fået "Åbningstider" og mistet "Forside" (`src/content.js:71-76`).
- Flere tekster fra live mangler på forsiden: "Vi tager imod bestillinger fredag & lørdag kl. 16.00–20.30.", `hours.note` ("Vi har kun åbent fredag og lørdag …"), `kontakt.closing` ("Vi glæder os til at se dig …"), linket "Hør vores historie" og Kontakt-introen ("Du finder Palmy Spisested på …").
- Kommentaren i `src/data/menu.ts:30` bruger "hovedretter-ekstra-ris" som eksempel på et id. Det id findes ikke (Ekstra ris ligger i `tilbehoer`), så eksemplet er misvisende. Det er kun en kommentar.

## Genkontrol 2 (2026-10-11, build kl. 22:09 efter kvalitetspasset)

Omfang: Det her er en kontrol af **overensstemmelse med den eksisterende menu og denne reference**, som stammer fra live-sitet, der selv er bygget fra repoet. Det er **ikke** en uafhængig verifikation af restaurantens aktuelle priser eller af det trykte kort.

- `src/data/menu.ts`: Den genererede menutekst er byte-identisk med referencen. Der er 32 punkter, 21 med nummer ('1'–'21') og 11 uden. Rækkefølgen 1–13, 18–21, 14–17 og sektionerne er uændrede, og det samme gælder navne, beskrivelser, valg, varianter, priser, Stærk-markeringer og noter.
- `dist/index.html` (menusektionen), `dist/menu.html` og `dist/menu/print.html`: alle tre er identiske med referencen. Den eneste forskel er det manglende linjeskift i slutningen af filen ved print, og det er ikke en reel afvigelse.
- JSON-LD `hasMenu` i `dist/menu.html`: identisk med live-versionen (identifier, navne, beskrivelser og offers).
- `dist/bestilling.html`: "Alle numre" viser 1–21 i rækkefølge.

**Resultat: 0 afvigelser i forhold til referencen.**

# DESIGN-REGLER — OviaSpecs

> Læg filen i roden af hvert kundeprojekt, og henvis til den i `CLAUDE.md`:
> "Læs og følg DESIGN-REGLER.md og DESIGN.md før du ændrer noget visuelt."
>
> **Grundregel:** Ronny er art director. Claude er frontend-udvikler.
> Claude implementerer de beslutninger, der står i `DESIGN.md`, og opfinder ikke sine egne.

---

## 0. Hvis noget mangler, stopper du

Hvis `DESIGN.md` ikke fastlægger noget, du skal bruge (en farve, en font, en skriftstørrelse, et layout eller et billede), så **gætter du ikke**.
Skriv: *"DESIGN.md mangler X. Forslag: A eller B. Hvad vælger du?"* og vent på svar.

At gætte er den direkte vej til et vibecodet resultat.

---

## 1. Kun tokens, ingen frie værdier

- Brug **kun** de farver, der står i `DESIGN.md`. Lav ingen nye nuancer, ingen `opacity`-varianter af accentfarven og ingen Tailwind-standardfarver (`gray-500`, `blue-600` osv.).
- Brug **kun** de fonte og den typeskala (størrelser, vægte, linjehøjde, letter-spacing), der står i `DESIGN.md`.
- Brug **kun** spacing-skalaen fra `DESIGN.md`. Ingen `mt-[37px]`.
- Radius, skygger og borders: kun det, der står i `DESIGN.md`. Står der intet, er svaret **0**.
- Alle tokens ligger ét sted (`tokens.css` / Tailwind-theme). Komponenter refererer til tokens og aldrig til rå værdier.

## 2. Forbudte AI-mønstre

Brug dem ikke, medmindre `DESIGN.md` udtrykkeligt beder om det:

**Layout**
- Centreret hero med en lille "pill-badge" over overskriften
- Grid med 3 kort, hvor hvert kort har ikon + overskrift + to linjer tekst
- Alle sektioner med samme containerbredde, samme `py-24` og samme centrerede overskrift
- En række med tal ("500+ glade kunder", "10 års erfaring"), medmindre tallene er rigtige og godkendt
- Testimonial-karrusel, FAQ-accordion og "Klar til at komme i gang?"-banner som fast skabelon nederst
- Kort inde i kort

**Visuelt**
- Gradients (baggrund, tekst eller knapper), glassmorphism, blur-blobs og "glow"
- `rounded-2xl`/`rounded-3xl` overalt, `shadow-lg` på alle kort
- Ikoner i farvede cirkler, Lucide-/Heroicons-ikoner som dekoration
- Emojis og ✨ i UI eller tekst
- Stockfotos og AI-genererede madbilleder

**Bevægelse**
- Fade-up/slide-in på hver eneste sektion ved scroll
- Hover-effekter med `scale-105` på alle kort
- Parallax og animerede tællere
- Tilladt: én bevidst animation pr. side, som står i `DESIGN.md`, samt diskrete hover-states (farve og underline)

**Tekst**
- Floskler: "Oplev", "unik", "passion", "en rejse for smagsløgene", "skræddersyet", "i verdensklasse", "løft din …"
- Opfundne fakta, anmeldelser, citater, priser, åbningstider og tal. Alt indhold skal komme fra projektets data eller fra Ronny.
- Overskrifter, der kunne stå på enhver anden restaurants hjemmeside. Hvis man kan bytte navnet ud uden at noget andet skal ændres, er teksten for generisk.

## 3. Komposition skal variere bevidst

- Hver sektion har **én hovedperson**: et billede, typografi *eller* data (menu/priser). Aldrig alle tre lige stærke.
- Naboer må ikke bruge samme layout. Skift mellem fuld bredde og smal spalte, og mellem billedtungt og kun tekst.
- Asymmetri og et tydeligt grid (fx 12 kolonner, hvor indholdet starter i kolonne 2 eller 3) er bedre end "alt centreret".
- Der skal være forskel på skalaen: én overskrift må være meget stor, mens resten er rolig. Store overskrifter overalt er ingen hierarki.

## 4. Billeder

- Brug kun rigtige billeder fra projektets assets eller billeder, som Ronny leverer.
- Mangler der et billede, indsætter du en tydelig grå pladsholder med teksten `BILLEDE MANGLER: [hvad]`. Find ikke selv på et.
- Angiv beskæring (`object-position`) bevidst. Retten skal være i fokus, ikke tallerkenkanten.
- Brug ét fast aspect ratio-sæt fra `DESIGN.md` (fx 4:5 til retter og 16:9 til stemningsbilleder).
- Brug moderne formater (WebP/AVIF), `width`/`height` og `loading="lazy"` under folden.

## 5. Restaurant-specifikt (madbranchen)

- **Maden kommer før historien.** Menu eller udvalgte retter skal kunne ses inden for den første scroll på mobil.
- Telefonnummeret er et klikbart `tel:`-link og kan nås fra header og menu på mobil.
- Åbningstider og adresse står ét fast sted (bestilling/kontakt) plus i footeren. Ikke i alle sektioner.
- Menudata kommer kun fra datafilen (fx `src/data/menu.ts`). Ingen retter, priser eller allergener skrives direkte i komponenterne.
- Priser skrives altid på samme måde (fx `129 kr.`). Brug tabular-nums, hvis fonten har det.

## 6. Scope: én ting ad gangen

- Lav **kun** den sektion eller funktion, der er bedt om. Rør ikke andre filer uden at spørge.
- Tilføj ingen nye dependencies uden godkendelse.
- Ingen omskrivning af hele siden. Er en større ændring nødvendig, beskriver du den og venter.
- Bevar SEO (titler, meta, struktureret data), links, eksisterende indhold og funktionalitet.

## 7. Arbejdsgang pr. opgave

1. **Læs** `DESIGN.md`, de relevante komponenter og data.
2. **Beskriv i ord, før du koder:** layout (grid og kolonner), hovedperson, typografi (hvilke tokens) og billeder. Angiv hvilke regler i `DESIGN.md` du følger. Ved nye sektioner venter du på et "ok".
3. **Implementér** præcist og kun det aftalte.
4. **Visuel kontrol med Playwright:** tag screenshots i **390 px** (mobil) og **1440 px** (desktop), og se dem.
5. **Selvtjek mod sektion 2:** gennemgå listen med forbudte mønstre punkt for punkt, og skriv hvilke du fandt og rettede.
6. **Rapportér ærligt** (se sektion 8).

## 8. Ærlighed

- Skriv aldrig "premium", "flot", "elegant" eller "professionelt" om dit eget resultat. Beskriv hvad du har lavet, og hvad der stadig er svagt.
- Hver rapport slutter med **"Svagheder:"** med mindst ét konkret punkt (fx "billedet er for lavt opløst", "overskriften knækker grimt på 390 px", "sektionen ligner stadig en standardskabelon, fordi …").
- Hvis problemet **ikke kan løses med kode**, fx dårlige eller manglende billeder, tynd tekst eller manglende indhold, så sig det direkte i stedet for at pynte med effekter.
- Hvis Ronnys opgave vil give et generisk resultat (fx "gør det mere moderne"), så sig det, og bed om en konkret beslutning.
- Hvis du er uenig i en designbeslutning, så sig det én gang med en begrundelse, og følg derefter `DESIGN.md`.

---

## Skabelon: DESIGN.md (Ronny udfylder — ikke Claude)

```md
# DESIGN.md — [Projekt]

## Identitet (3 ord + 1 sætning)
Fx: varm · ærlig · familie. "Det skal føles som at stå i køkkenet hos familien, ikke på en restaurantkæde."

## Referencer (2–3 links + HVAD præcist der skal lånes)
- [link] — kun menuens typografi og spalteopbygning
- [link] — kun hvordan billederne beskæres

## Farver (max 5, hex + rolle)
- #...... tekst / mørke flader
- #...... baggrund
- #...... lys flade
- #...... accent (bruges KUN til: ...)
- #...... hårlinjer

## Typografi
- Display: [font], vægt, størrelser
- Brødtekst: [font], størrelse, linjehøjde
- Tal/priser: [font eller tabular-nums]
- Skala: 14 / 16 / 20 / 28 / 44 / 72 (fx)

## Spacing og grid
- Skala: 4 / 8 / 16 / 24 / 40 / 64 / 104
- Grid: 12 kol desktop, 4 kol mobil, gutter X
- Radius: 0 (eller X) · Skygger: ingen

## Billeder
- Ratios: retter 4:5, stemning 16:9
- Stil: fx dagslys, tæt beskæring, ingen styling-props

## Sektionsplan (rækkefølge + hovedperson)
1. Hero — hovedperson: billede af ...
2. Menu — hovedperson: data
3. ...

## Tilladt bevægelse
- Én ting: ...

## Knapper og links
- Primær: ...
- Sekundær: underline-link
```

# Designreview – Palmy Spisested (subagent B)

Kilder: frontend-design SKILL.md og apple-design SKILL.md er hentet (curl, OK). Den deployede side er gennemset i Chrome på desktop (1568px) og mobil (390px via iframe), sammen med alle filer i src/components, src/components/menu, src/pages/Menu.tsx og NotFound.jsx, samt index.css, content.js, favicon.svg, hero-billedet og signatur/nr3, nr4 og nr6.

Restaurantens egen identitet: deres tallerkener er blå-hvidt "riskorn"-porcelæn (det går igen i alle fotos), der er et vietnamesisk flag i heroen, og menukortet har grønne nummercirkler. Dem bør designet læne sig op ad. Cream + Fraunces + guld er i sig selv tæt på det generiske "AI-cream-serif"-udtryk.

Menutekst (navne, numre, priser, beskrivelser, "STÆRK") er ikke foreslået ændret nogen steder.

---

## P1 – Fejl der skal rettes først

1. **Signatur og Historie er usynlige uden JS og i den prerenderede HTML.**
   `SignaturRetter.jsx:57-59` og `Historie.jsx:60-62` starter med `opacity-0 translate-y-6` (useInView er `false` ved SSR). Hvis JS fejler eller er langsomt, er de tomme, og den generiske fade-up-på-sektion er det skill'en kalder et AI-kendetegn.
   Rettelse: fjern wrapperens transition-klasser helt (behold `ref` eller fjern `useInView`). Hvis der skal være én animation, så kun `motion-safe:` og start synligt: `motion-safe:animate-[fadein_.4s_ease-out]` uden opacity-0 i markup.

2. **Guldtekst på cream har en kontrast på 2,23:1 og fejler WCAG.**
   Det gælder `Historie.jsx:88` (closing), `Kontakt.jsx:101` (closing), `Aabningstider.jsx:58` (tiderne!), `NotFound.jsx:14` ("404") og hover-farven i `Navigation.jsx:50` (`hover:text-gold`).
   Rettelse: tilføj et token i `index.css` `@theme`: `--color-gold-deep: #7d5f1c;` (5,5:1 på cream). Brug `text-gold-deep` på de steder og `hover:text-green-deep-light` i nav. Guld (`#c9a24b`) bruges kun på grøn baggrund (5,1:1) og til dekorative streger.

3. **Ingen knap eller link har press- eller fokus-feedback.** `RingKnap.jsx:18`, hero-links `Hero.jsx:48,54`, `Kontakt.jsx:44`, `Navigation.jsx:68`, `NotFound.jsx:25,31`, dots `SignaturRetter.jsx:132` og map-knappen `Kontakt.jsx:81`.
   Rettelse (fælles klasse-streng, fx en `btnBase` i RingKnap, der genbruges):
   `transition-[background-color,transform] duration-100 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current motion-reduce:active:scale-100`
   - gold: tilføj `active:bg-gold-light`.
   - green: tilføj `active:bg-green-deep-light`.
   - Outline-knapper i heroen: `active:bg-cream/15`.
   - Map-knappen: kun `active:bg-green-deep/15` (ingen scale på en stor flade).

4. **Mobil-menu: retter med varianter klemmer navnekolonnen.** Nr. 11 "Rød karry …" ombrydes i en kolonne på ca. 90px, fordi `PriceList` med "Med and / Med kylling / Med oksekød" står i kolonne 3 (`DishCard.jsx:37-39`). Det er den dårligst læsbare del af hele menuen.
   Rettelse i `DishCard.jsx`: når `dish.variants?.length`, render prisblokken som `col-start-2 col-span-2 sm:col-start-3 sm:col-span-1 sm:row-start-1` og giv `PriceList` `justify-self-start sm:justify-self-end`. Så står varianterne under beskrivelsen på mobil og flugter til højre fra `sm`. Faste priser bliver i kolonne 3 som nu.

5. **Tiderne vises i to formater.** `Aabningstider.jsx:58` og footeren `Footer.jsx:64` viser "16:00–20:30" (kolon), mens resten af siden skriver "16.00–20.30". Kilden er `content.js:46-47`, hvor `schedule.time` bruger rå `openTime`.
   Rettelse: `time: \`${dk(openTime)}–${dk(closeTime)}\`` i begge schedule-entries.

## P2 – Generisk AI-design der skal ud

6. **Signaturkortene er SaaS-card-kittet:** `rounded-2xl shadow-lg ring-1`, grøn gradient over fotoet, stor 56–64px nummer-badge og billedskalering (`SignaturRetter.jsx:83, 97-99, 104, 107`). Gradienten dækker den nederste tredjedel af tallerkenen, og fotos er i forvejen svage mobilbilleder ovenfra.
   Rettelse:
   - Flyt `figcaption` ud under billedet (søskende til `div`, ikke absolut). Brug `mt-3 flex items-baseline gap-2 text-left`, `NumberBadge` i `size="normal"`, navn i `font-display text-lg text-cream` og pris i `text-gold-light`.
   - Slet gradient-div'en (linje 103-104).
   - Billedrammen bliver `aspect-square overflow-hidden rounded-md bg-green-deep-light/40`, uden `shadow-lg` og `ring`.
   - Slet `scale-105` og `group-hover:scale-105` (linje 97-99).

7. **"Menu nedenfor"-linket er et versal-eyebrow med hoppende pil** (`SignaturRetter.jsx:141-157`): `uppercase tracking-[0.25em]` plus `animate-bounce`.
   Rettelse: lav det til et rigtigt link med teksten "Se hele menukortet", `href="#menu"`, `text-base font-semibold text-gold-light underline decoration-gold/50 underline-offset-4 hover:text-cream`. Slet svg'en, eller behold den statisk uden `animate-bounce`.

8. **Historie-sektionen har tre lag dekoration og ingen information:**
   - vandmærket "Velkommen" (`Historie.jsx:64-71`),
   - lodrette sidetekster (`Historie.jsx:7-27, 54-55`),
   - to bjælker med 10px versaler, `tracking-[0.15em]` og `text-cream/70` (`Historie.jsx:46-52, 94-98`). De gentager adresse, tider og telefon og er ulæselige i 10px.

   Rettelse: slet vandmærket, `SideText` og begge bjælker. Den mobile telefonblok (`Historie.jsx:35-43`) er også en gentagelse af heroen og RingNuBar, så slet den. Sektionen bliver ren tekst.
   Bonus: `frame.social` er markeret PLADSHOLDER i content.js og vises alligevel på siden (linje 97), så den skal ud.

9. **Ikonkort i Åbningstider** (`Aabningstider.jsx:4-38, 66-81`): to `rounded-2xl border bg-white/60`-kort med clock- og bag-ikon. Det er et klassisk template-mønster.
   Rettelse: erstat med en `<dl className="mx-auto mt-8 max-w-md space-y-3 text-left">`. Hver række er `<div className="flex gap-4 border-t border-gold/30 pt-3"><dt className="w-36 shrink-0 font-semibold text-green-deep">Forudbestilling</dt><dd className="text-green-deep/80">{hours.preorderLine}</dd></div>`, og det samme for Afhentning. Slet ClockIcon og BagIcon.

10. **Tomme slogans i italic gold:** `Historie.jsx:88` ("Kom forbi og smag selv – fredag eller lørdag.") og `Kontakt.jsx:101` ("Vi glæder os til at se dig – fredag eller lørdag."). De gentager hinanden og dagene.
    Rettelse: slet Kontakt-closing. Historie-closing kan blive, i `text-gold-deep` (se punkt 2).

11. **Hero har tre knapper, og den tredje brækker ned på egen linje** på både desktop og mobil (`Hero.jsx:42-58`).
    Rettelse: slet "Hør vores historie" (linje 52-57). Behold "Ring og bestil" (primær) og "Se menuen" (sekundær). Så står de på én linje, og ring/menu-valget bliver entydigt.

12. **Hero-teksten ligger oven på maden.** På desktop dækker overskrift og knapper forårsrullerne og noodle-tallerkenen. Gradienten (`Hero.jsx:29`) går kun bund→top, så venstre side er ikke mørk nok til tekst.
    Rettelse:
    - Overlay på desktop: `sm:bg-gradient-to-r sm:from-green-deep/90 sm:via-green-deep/55 sm:to-transparent`. Mobil beholder `bg-gradient-to-t`. Det er funktionel læsbarhed, ikke pynt.
    - På mobil viser `object-cover` (centreret) mest bordet til venstre, og anden (hovedmotivet, ca. 65% inde) er skåret væk. Tilføj `object-[65%_50%] sm:object-center` på `<img>` (linje 26).

13. **Gentagelse af åbningstider og telefon.** "fredag og lørdag 16.00–20.30" står ca. 10 gange på forsiden: hero-sub, hero subLine, Historie-bjælke, Historie-afsnit 3, Menu-bund (2 linjer), Åbningstider (3 steder), FAQ, Kontakt-brødtekst, Kontakt preorderNote, footer og sidetekst. Det gør siden lang og flad.
    Rettelse (ud over punkt 8):
    - Slet `Menu.jsx:45-48` (de to linjer under ring-knappen). Behold kun knappen.
    - Slet `Aabningstider.jsx:63` (`hours.note`), da den gentager overskriften.
    - Slet `Kontakt.jsx:49` (preorderNote) og `Kontakt.jsx:57-63` (tlf. i address, da knappen lige over er et tlf-link).

## P3 – Spacing, typografi, struktur

14. **Fire cream-sektioner i træk** (Menu → Åbningstider → FAQ → Kontakt), hver med `py-20 sm:py-28`, giver 224px tom luft mellem sektioner uden nogen visuel grænse (tydeligt på desktop mellem Åbningstider og FAQ).
    Rettelse: brug `py-16 sm:py-20` på `Aabningstider.jsx:42`, `Faq.jsx:43` og `Kontakt.jsx:31`. Giv Åbningstider en anden flade, fx `bg-green-deep text-cream`, og vend farverne inde i den (dag `text-cream`, tid `text-gold-light`), så siden får rytmen grøn → cream → grøn.

15. **Map-pladsholderen er en 360px tom grå boks med `shadow-lg rounded-2xl`** (`Kontakt.jsx:66, 81`). Det er den største tomme flade på siden.
    Rettelse: lav en `h-40 sm:h-56` knap, `rounded-md border border-green-deep/15`, uden shadow. Teksten "Indlæser Google Maps først når du klikker" bliver til `text-xs`. iframen beholder 360px efter klik.

16. **Linjelængden i Historie** er ca. 85–90 tegn på desktop (`Historie.jsx:57`, `max-w-3xl` + `text-lg`).
    Rettelse: brug `max-w-[62ch]` på tekstcontaineren (eller `max-w-2xl`).

17. **Display-tracking og -leading.** Alle H2 er `font-display text-3xl font-semibold sm:text-4xl` uden tracking, og Fraunces i 48px+ står for løst.
    Rettelse: tilføj én regel i `index.css`: `.font-display { font-optical-sizing: auto; }`. På H1 i `Hero.jsx:35` og `Menu.tsx:14`: `tracking-[-0.015em] leading-[1.05]`. På H2'erne: `tracking-[-0.01em]`.

18. **Hardcodet farve** `bg-[#23372a]` i `SignaturRetter.jsx:54`.
    Rettelse: tilføj `--color-green-hero: #23372a;` i `@theme` og brug `bg-green-hero`.

19. **Nav-labels.** "Forside" er vagt og overflødigt, da logoet er forsidelinket, og Åbningstider mangler (`content.js:71-76`).
    Rettelse: nav = `Menu`, `Åbningstider (#aabningstider)`, `Historie`, `Kontakt`. På desktop er tlf-teksten ved siden af "Ring nu" (`Navigation.jsx:58-64`) dobbelt. Slet tekst-linket og lad knappen hedde `Ring {business.phoneDisplay}`.

20. **Mobil-header har kun hamburger.** "Se menu" kræver to tryk ud over heroen.
    Rettelse i `Navigation.jsx:76`: før hamburgeren tilføjes `<a href={hrefFor('#menu')} className="mr-2 rounded-full px-3 py-2 text-sm font-semibold text-green-deep active:bg-green-deep/10">Menu</a>`.

21. **Footer-kolonnetitler er template-chrome** (`Footer.jsx:10`: `text-xs uppercase tracking-[0.15em] text-gold`). Privatlivspolitik står to gange (linje 101 og 113).
    Rettelse: `colTitle = 'text-sm font-semibold text-cream'`. Slet Privatliv-linket i Genveje-listen.

22. **Status-pillen:** `bg-green-500 animate-pulse` (`AabenStatus.jsx:14`) er Tailwind-standardgrøn, der ikke findes i paletten, og en uendelig puls (Apple-skill: undgå langsomme loopende oscillationer).
    Rettelse: brug `bg-[#4caf72]` eller et `--color-open`-token, og slet `motion-safe:animate-pulse`.

23. **Menubeskrivelser er for svage:** `text-sm italic text-slate-dish/70` (`DishCard.jsx:26`) og note `/50` (linje 33). /50 italic i 14px er svært at læse, især nr. 12 og 21 med lange beskrivelser.
    Rettelse: beskrivelse `text-slate-dish/80`, note `text-slate-dish/65`. Kursiv beholdes, da den følger kortet.

## P4 – Identitet (valgfrit, efter P1–P3)

24. **Lån fra porcelænet frem for generisk guld-pynt.** Stregen og flaget i SectionHeader (`SectionHeader.jsx:8-16`) kan beholdes, men ét gennemgående motiv fra deres egne tallerkener vil give mere egenart. Det kan være en tynd blå kant (`#2f4f9e`) som 2px-linje over hver menusektion eller som ramme om signaturfotos. Brug det kun ét sted.
    Favicon (`public/favicon.svg`) er markeret PLADSHOLDER: "P" i Georgia på `rx=14` (app-ikon-afrunding). Indtil der er et rigtigt logo: brug Fraunces-lignende serif og `rx="8"`, eller en grøn cirkel som menukortets nummerbadges, så favicon og menuen hænger sammen.

25. **Signaturfotos.** nr3 og nr6 er taget ovenfra på grå bordplade, og tallerkenkanten er skåret af i nr6 (højre/bund). Det skal løses ved næste billedrunde i `scripts/process-signatur-images.mjs`: brug `fit: 'contain'` med lidt luft eller `focusX` for nr6, så hele tallerkenen og den blå kant står helt. Indtil da hjælper punkt 6 (ingen gradient over billedet) mest.

---

# Genkontrol (localhost:5173, 390 / 768 / 1100–1360 px)

Følgende er rettet og ser rigtigt ud i screenshots: hero med to knapper og venstre-gradient, signatur uden overlay, Historie renset, grøn Åbningstider-dl, ny menu med sticky kategorilinje (aktiv-markering og mobil-autoscroll virker), varianter under teksten på mobil og tidsformat. Resterende fejl, vigtigst først:

1. **Tre forskellige venstrekanter på desktop.** Header og hero bruger `max-w-6xl` (`Navigation.jsx:38`, `Hero.jsx:33`), Signatur `max-w-5xl` (`SignaturRetter.jsx:55,137`), og Historie, Menu, Åbningstider, FAQ og Kontakt `max-w-3xl` centreret. Ved 1360px står logo og hero ved x≈319, signatur ved ≈358 og resten ved ≈437, så siden ser forskudt ud.
   Rettelse: én ydre container overalt, `mx-auto max-w-6xl px-4 sm:px-6`, med den smalle kolonne som indre `max-w-3xl` uden `mx-auto` (venstrestillet mod logoet). Signatur skifter `max-w-5xl` til `max-w-6xl` begge steder, og grid-tracket i linje 68 tilpasses (`sm:max-w-6xl`).

2. **Hero-knapperne brækker stadig på 390px.** "Se menu" står alene på anden linje (`Hero.jsx:43`).
   Rettelse: `grid grid-cols-[1fr_auto] gap-3 sm:flex` på wrapperen, eller kortere primær-tekst på mobil: `<span className="sm:hidden">Ring {phone}</span><span className="hidden sm:inline">{status.cta} – {phone}</span>`.

3. **"Se hele menukortet" er en guld fyldt pille** (`SignaturRetter.jsx:140`), dvs. samme visuelle vægt og farve som "Ring og bestil" i heroen. Guld-pille bør kun betyde "ring".
   Rettelse: `inline-flex min-h-12 items-center font-semibold text-gold-light underline decoration-gold/50 underline-offset-4 hover:text-cream`. Ingen bg, ingen rounded-full.

4. **Mobil-header: "Menu"-link ved siden af hamburger-ikonet** (`Navigation.jsx:73` og `:84`). To ting der læses som "menu", hvor den ene er sektionen og den anden navigationen.
   Rettelse: omdøb linket til "Menukort" (matcher H2'en), eller giv hamburgeren en synlig tekst ("Mere"). Ellers: drop hamburgeren og vis "Menukort" og "Kontakt" som to tekstlinks.

5. **Hero-indledningen skriver tidsrummet over to linjer** ("16.00–" / "20.30"): /menu ved 768 og 1360 (`pages/Menu.tsx:153`, `max-w-xl`) og samme risiko i hero-sub.
   Rettelse: wrap tiden i `<span className="whitespace-nowrap">kl. {hours.time}</span>`, eller giv afsnittet `max-w-2xl`.

6. **"Printvenlig udgave" på forsiden** (`components/Menu.jsx:204-209`) står ved siden af H2 som en sekundær handling, ingen leder efter den der, og den konkurrerer med overskriften.
   Rettelse: fjern den fra forsiden. /menu har den allerede i bunden (`pages/Menu.tsx:172-177`).

7. **preorderNote gentages tre gange i bunden af forsiden:** "Klar til at bestille?" (`components/Menu.jsx:219`), Kontakt (`Kontakt.jsx:289`) og footer. Grøn Åbningstider-sektion siger det samme lige imellem.
   Rettelse: slet `Kontakt.jsx:289` og `components/Menu.jsx:219` (behold kun knappen og "Klar til at bestille?").

8. **Nummer-badges i to udgaver.** Menuen bruger grøn cirkel med cream tal, signatur bruger cream cirkel med grønt tal (`tone="onDark"`, `NumberBadge.jsx:16`). Ved 390px stikker næste slides cream-cirkel ind i højre kant som en løs hvid prik.
   Rettelse: på grøn baggrund brug `bg-gold text-green-deep` (samme form, varm accent), eller vis nummeret som tekst `Nr. 3` i `text-gold-light` foran navnet. Udvid evt. track-paddingen (`px-[8vw]` → `px-4` plus `scroll-px-4`), så kanten af næste slide er et billede, ikke en badge.

9. **Kategorilinjen viser ingen tegn på flere kategorier på mobil.** "Børnemenu" klippes hårdt ved kanten (`MenuSections.jsx:79`).
   Rettelse: tilføj en fade på ul'en: `[mask-image:linear-gradient(to_right,black_85%,transparent)] sm:[mask-image:none]`.

10. **Signaturfoto nr. 4 skiller sig ud.** Det har stålbordplade og mørkere farver end nr. 3 og nr. 6 (grå granit), og soya-skålen er halvt skåret i højre kant. Ved 1360 står de tre som et ujævnt sæt.
    Rettelse: i `scripts/process-signatur-images.mjs` sæt `focusX` for nr4 lidt til venstre (≈0.42), så skålen er ude, og giv alle tre `.modulate({ saturation: 1.05 })` samt en ens let lysning. Det er kun beskæring og tone, ingen AI.

11. **SectionHeader er stadig versal + `tracking-[0.12em]` + guld flag** (`SectionHeader.jsx:16`). Det er acceptabelt, fordi det spejler det trykte kort, men flag-markøren plus guldstregen er to dekorationer pr. overskrift × 6.
    Rettelse: drop enten flaget (span med clipPath) eller den udløbende guldlinje. Behold linjen, da den adskiller sektioner.

12. **404-siden har stadig eyebrow-mønsteret** `text-xs uppercase tracking-[0.25em]` "404" over H1 (`NotFound.jsx:14`).
    Rettelse: slet linjen. H1 "Siden findes ikke" er nok.

---

# Genkontrol 2 (visuelt)

**Metode.** Produktionsbuild http://localhost:4174, iframe i /robots.txt, kørt i headless Chrome via DevTools-protokollen. innerWidth er målt i hver iframe til præcis 390, 768 og 1440. Viewport-højde 844 / 1024 / 900. / og /menu er gennemgået i hele længden, mobilnavigationen åben, og kategori-hop er testet.

**Screenshots** ligger i `C:/Users/Ronny/AppData/Local/Temp/claude/C--Users-Ronny-Desktop-CODE-PALMY/d3088825-4ce4-4e22-b0b1-c63ea4979b07/scratchpad/shots2/`:
- `home-{390,768,1440}-NN.png` og `menu-{390,768,1440}-NN.png` (fortløbende skærme)
- `home-390-navopen-top.png` og `home-390-navopen-scrolled.png`
- `jump-*.png` (efter klik på kategori)

**Kontaktark** ligger i `C:/Users/Ronny/AppData/Local/Temp/claude/C--Users-Ronny-Desktop-CODE-PALMY/d3088825-4ce4-4e22-b0b1-c63ea4979b07/scratchpad/sheets/`.

**I orden:**
- Venstrekanter flugter på 1440.
- Hero-knapperne stables på 390.
- Signaturfotos nr. 4 og 6 er hele tallerkener.
- Badges er ens.
- Sektionsoverskrifter har kun guldlinjen.
- De lange navne (nr. 6, 10, 12, 21) ombrydes rent.
- Prisvarianterne (nr. 1, 11, 13, 16, 21) står under teksten på 390 og flugter til højre på 768 og 1440.
- Ingen overlap mellem tekst og pris.

## Fund

1. **/menu på mobil har ingen ring-knap, mens man læser menuen** (`menu-390-01…05`). Den eneste opkalds-CTA er linket øverst og knappen helt i bunden. Netop her er man klar til at ringe.
   Placering: `src/App.jsx:27-34`.
   Rettelse: render `<RingNuBar />` efter `<Footer />` på /menu. Bar'ens skjul-logik falder allerede tilbage til `scrollHeight`, når `#kontakt` mangler. Tilføj evt. `id="kontakt"` på footeren, så baren forsvinder over den.

2. **Mobil-kategorilinjens fade dækker den aktive fane.** Når "Ekstra Tilbehør" er aktiv og listen er scrollet helt ud, er pillens tekst halvt udtonet (`menu-390-05`, `home-390-08`).
   Placering: `MenuSections.jsx:69` (`[mask-image:linear-gradient(to_right,#000_85%,transparent)]`).
   Rettelse: tilføj et tomt sidste element `<li aria-hidden="true" className="w-10 shrink-0 sm:hidden" />`, så sidste fane kan scrolle fri af fade-zonen. Alternativt: fjern masken, når `list.scrollLeft + clientWidth >= scrollWidth - 1`.

3. **Ved hop til en kategori ender overskriften klistret op ad linjen.** Målt efter klik: overskriftens top = 120px, linjens bund = 122px på 1440, så versalerne røres eller klippes 2px. På 390 er der kun 6px luft (`jump-menu-1440-drikkevarer.png`).
   Placering: `MenuSections.jsx:98` (`scroll-mt-12` + html `scroll-padding-top: 4.5rem`).
   Rettelse: `scroll-mt-16 sm:scroll-mt-20`, så der bliver ca. 20–30px luft under linjen.

4. **Den sticky kategorilinje er en boks, ikke en bjælke, fra 640px og op.** Baggrund og `border-b` slutter 24px uden for tekstkolonnen, så stregen stopper midt på skærmen og ses som en svævende kasse over indholdet (`menu-1440-01`, `home-1440-03`).
   Placering: `MenuSections.jsx:67` (`-mx-4 … sm:-mx-6`).
   Rettelse: gør nav'en fuld bredde, `mx-[calc(50%-50vw)] px-[calc(50vw-50%)]` (fjern `-mx-*`), og læg listen i den samme indre bredde som teksten (`<ul className="… max-w-3xl">`). Så går stregen kant til kant ligesom headerens.

5. **Tidsrum brækker over linjeskift på mobil:**
   - "kl. 16.00–" / "20.30" i "Klar til at bestille?" (`components/Menu.jsx:27`, `home-390-08`)
   - "lukker kl." / "20.30" i Åbningstider-Afhentning (`Aabningstider.jsx:34`, `home-390-09`)

   Rettelse i `content.js`: tilføj `const kl = (t) => 'kl. ' + dk(t)` og brug den i alle strenge (fx `pickupLine`, `preorderNote`). Sæt `time: dk(openTime) + '⁠–⁠' + dk(closeTime)` i både `hours.time` og `schedule` (word-joiner om tankestregen). I `components/Menu.jsx:27` skrives `kl.{' '}{hours.time}`. Så holder både "kl. 20.30" og "16.00–20.30" sammen overalt, uden at teksten ændres.

6. **Dobbelt luft mellem cream-sektioner.** Historie (`sm:py-24`) + Menu (`sm:py-24`) giver ca. 190px tom flade mellem "Kom forbi og smag selv…" og "Menukort" (`home-1440-02`, `home-768-02`). FAQ + Kontakt giver ca. 160px (`home-1440-08`).
   Placering: `Menu.jsx:10`, `Kontakt.jsx:36`.
   Rettelse: `Menu.jsx:10` → `pt-4 pb-16 sm:pt-8 sm:pb-24`, `Kontakt.jsx:36` → `pt-4 pb-16 sm:pt-8 sm:pb-20`. Hvis der skal være en grænse, så en `border-t border-green-deep/10` på den indre container, ikke mere padding.

7. **Mobil-navigation åben: "Menu" står to gange lige under hinanden.** Det gælder header-linket "Menu" og første punkt i dropdown'en (`home-390-navopen-top.png`). Øverst på siden er der samtidig ingen ring-handling, fordi RingNuBar endnu er skjult.
   Placering: `Navigation.jsx:111` (dropdown) og `:73` (header-link).
   Rettelse: filtrér `#menu` ud af dropdown-listen på mobil (`nav.filter(i => i.href !== '#menu')`). Tilføj som sidste punkt et tel-link `Ring {business.phoneDisplay}` i `font-semibold`, med samme klasser som de øvrige punkter plus `text-green-deep`.

8. **Fra 1024px står alle cream-sektioner i en 768px-kolonne, og højre ~45% er tom.** Ved 1440 slutter menuens priser ved x≈1005, mens headerens Ring-knap står ved x≈1215. Siden ser venstretung ud (`home-1440-03…08`, `menu-1440-*`).
   Rettelse:
   - Menuen (forside + /menu) bruger `MenuSections`' eksisterende `columns`-prop fra `lg`: ændr `md:columns-2` → `lg:columns-2` i `MenuSections.jsx:~102`, send `columns` fra `components/Menu.jsx` og `pages/Menu.tsx`, og løft containeren til `lg:max-w-5xl`.
   - FAQ og Kontakt: læg dem i ét `lg:grid lg:grid-cols-2 lg:gap-16`, eller lad Kontakt-kortet stå til højre for adressen (`Kontakt.jsx`: `lg:grid lg:grid-cols-[1fr_1.2fr]`).

9. **Signatur på 390: næste slides nummer-badge stikker ind i højre kant som en løs halvcirkel** ved siden af den aktive rets navn (`home-390-01`). Kun billedkanten burde kunne ses.
   Placering: `SignaturRetter.jsx:68/75`.
   Rettelse: giv `figcaption` på ikke-aktive slides `max-sm:opacity-0 transition-opacity` (aktiv: `opacity-100`). Alternativt: gør peek'en større (`w-[78vw]`), så det tydeligt er et helt næste kort og ikke en løs prik.

10. **Hero på 1440: venstre ~40% er flad mørkegrøn.** `sm:from-green-deep/90 sm:via-green-deep/55` slukker forårsrullerne, limen og urterne helt, så billedet kun læses fra midten og ud (`home-1440-00`). Teksten ville stå læseligt med mindre.
    Placering: `Hero.jsx:30`.
    Rettelse: `sm:from-green-deep/80 sm:via-green-deep/35 sm:via-40% sm:to-transparent sm:to-70%`, og læg evt. `[text-shadow:0_1px_2px_rgb(0_0_0/0.35)]` på brødteksten i stedet for mere overlay.

## Hovedagentens rettelser efter Genkontrol 2 (visuelt)
- 1: RingNuBar også på /menu; skjules ved sidens egen ring-knap (`#bestil`).
- 2: tom spacer sidst i kategorilisten på mobil, så aktiv fane aldrig ligger i udtoningen (målt: højre kant 303 px < listens 371 px).
- 3: `scroll-mt-16 sm:scroll-mt-20` + aktiv-linje 160 px — overskrift lander 136 px fra toppen (linjen slutter 114 px) på 390.
- 4: kategorilinjen flugter med tekstkolonnen fra sm (`sm:mx-0 sm:px-0`).
- 5: hårdt mellemrum efter "kl." og word-joiner om tankestregen i tider (content.js + JSX).
- 6: mindre top-padding på Menu og Kontakt, når de følger en cream-sektion.
- 7: mobil-dropdown uden dobbelt "Menu"; "Ring 81 75 42 99" tilføjet sidst.
- 10: hero-gradient lettet til `via-65% ved 40% → transparent ved 75%` (første forsøg med 40 % gjorde teksten ulæselig over forårsrullerne og blev rullet tilbage).
- Ikke rettet (bevidste valg): 8 (768 px læsekolonne ved 1440 — menu og brødtekst holdes i én læsbar kolonne), 9 (næste slide kigger ind i karrusellen som tegn på, at der kan swipes).

# Før/efter-screenshots – kvalitetspas 11. oktober 2026

**Før:** det dengang deployede site, https://www.palmyspisested.com.
**Efter:** den lokale produktionsbuild (`npm run build`, serveret med `vite preview`).

Bredderne er målt som `window.innerWidth` i en iframe. Billeder i 1440 px er vist nedskaleret til 86 %, så før og efter kan stå side om side.

## Side om side

| Fil | Bredde | Viser |
| --- | --- | --- |
| [01-signatur-1440-foer-efter.jpg](01-signatur-1440-foer-efter.jpg) | 1440 | Signaturretterne. Før (venstre): tekst og gradient over fotos, store badges. Efter (højre): billedtekst under fotos, nye beskæringer af nr. 4 og nr. 6. |
| [02-menu-og-forside-390-foer-efter.jpg](02-menu-og-forside-390-foer-efter.jpg) | 390 | Fra venstre: /menu før, /menu efter (kategorilinje, prisvarianter under teksten), forsiden før (tre knapper), forsiden efter (to knapper). |
| [03-signatur-foer-hero-efter-1440.jpg](03-signatur-foer-hero-efter-1440.jpg) | 1440 | Venstre: signatursektionen før. Højre: heroen efter. |
| [04-signatur-foer-menu-efter-1440.jpg](04-signatur-foer-menu-efter-1440.jpg) | 1440 | Venstre: signatursektionen før. Højre: menuen efter, med flugtende priser og varianter (nr. 11, 13 og 21). |

## Kun efter

| Fil | Bredde | Viser |
| --- | --- | --- |
| [05-menu-390-768-og-mobilnav-efter.jpg](05-menu-390-768-og-mobilnav-efter.jpg) | 390 / 768 | Fra venstre: /menu før ved 390, /menu efter ved 390 og 768, og mobilnavigationen åben. Navigationen er vist i et mellemtrin: "Menu" stod endnu i dropdown'en, og "Ring"-knappen var ikke tilføjet. |
| [06-slutresultat-hero-1440-menu-390-footer-390.jpg](06-slutresultat-hero-1440-menu-390-footer-390.jpg) | 1440 / 390 | Slutresultatet: heroen ved 1440, /menu ved 390 med ring-baren i bunden, og /menu ved 390 nederst, hvor ring-baren er skjult ved footeren. |

## Signaturfotos

| Fil | Viser |
| --- | --- |
| [07-signaturfotos-foer.jpg](07-signaturfotos-foer.jpg) | Nr. 3, 4 og 6 før. Nr. 4 med halv soya-skål, nr. 6 med afskåret tallerkentop. |
| [08-signaturfotos-efter.jpg](08-signaturfotos-efter.jpg) | Samme fotos efter ny beskæring i `scripts/process-signatur-images.mjs`. |
| [09-originalfotos-kontaktark.jpg](09-originalfotos-kontaktark.jpg) | Alle originalfotos i `public/images/MAD BILLEDER/`, brugt til at vurdere alternativer. |

Mappen bruges kun til dokumentation. Den ligger uden for `public/` og kommer derfor ikke med i buildet.

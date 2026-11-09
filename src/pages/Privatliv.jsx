import { business } from '../content'
import Layout from '../components/Layout'
import Link from '../components/Link'

// Privatlivspolitik — beskriver KUN det, der kan dokumenteres i koden og i
// browserens netværkspanel (gennemgået oktober 2026):
//  - ingen måleskripter eller klikmåling i koden (Cloudflare Web Analytics-
//    scriptet og /cta/-beacons er fjernet, oktober 2026). Måling, der evt. er
//    slået til i Cloudflare-dashboardet, kan ikke ses i repoet og nævnes derfor
//    ikke som fraværende.
//  - hosting via Cloudflare (Server: cloudflare i svar-headers)
//  - skrifttyper hostes af sitet selv (@fontsource, bundtet af Vite) — ingen Google Fonts
//  - ingen Set-Cookie fra sitet og ingen document.cookie i koden
//  - Google Maps først ved klik (Kontakt.jsx)
//  - localStorage kun på den interne /bestilling (menukopi, useMenuCache.js)
// Opbevaring, aftaler og retsgrundlag er ikke dokumenteret her og må ikke
// tilføjes uden kilde. Teksten er ikke juridisk gennemgået.
function Privatliv() {
  return (
    <Layout>
      <div className="theme-paper bg-bg text-fg">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
          <h1 className="font-display text-h1 text-fg">
            Privatlivspolitik
          </h1>
          <p className="mt-3 text-sm text-muted">Senest opdateret: oktober 2026</p>

          <div className="mt-10 space-y-10 text-muted">
            <section>
              <h2 className="font-display text-3xl text-fg">Dataansvarlig</h2>
              <p className="mt-2 leading-relaxed">
                {business.name},{' '}
                <a
                  href={business.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-fg underline decoration-signal underline-offset-4"
                >
                  {business.address} <span className="sr-only">(åbner i nyt vindue)</span>
                </a>
                . Har du spørgsmål til denne politik, er du
                velkommen til at ringe på{' '}
                <a href={`tel:${business.phoneHref}`} className="font-medium text-fg underline decoration-signal underline-offset-4">
                  {business.phoneDisplay}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl text-fg">
                Hvilke oplysninger vi indsamler
              </h2>
              <p className="mt-2 leading-relaxed">
                Hjemmesiden har ingen kontaktformular, ingen brugerkonto og ingen onlinebetaling,
                så du giver ikke selv oplysninger til os gennem siden.
              </p>
              <p className="mt-3 leading-relaxed">
                Hjemmesiden drives via Cloudflare. Som ved alle besøg på en hjemmeside modtager
                serveren de tekniske oplysninger, din browser altid sender, fx IP-adresse og
                browsertype.
              </p>
              <p className="mt-3 leading-relaxed">
                Hjemmesidens egen kode indeholder ingen værktøjer til måling af besøg eller klik.
                Når du trykker på en knap for at ringe op, åbner din telefon blot opkaldet.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl text-fg">Skrifttyper</h2>
              <p className="mt-2 leading-relaxed">
                Sidens skrifttyper ligger på selve hjemmesiden og hentes ikke fra andre
                tjenester. Der sendes derfor ingen oplysninger om dig til tredjepart, når
                skrifttyperne indlæses.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl text-fg">Cookies</h2>
              <p className="mt-2 leading-relaxed">
                Hjemmesiden sætter ikke selv cookies. I afsnittet “Find os i Hjortshøj” på forsiden
                kan du vælge at indlæse et Google Maps-kort ved at klikke på “Vis kort”. Først når
                du gør det,
                indlæses kortet fra Google, som kan sætte egne cookies. Du kan læse mere i{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-fg underline decoration-signal underline-offset-4"
                >
                  Googles privatlivspolitik <span className="sr-only">(åbner i nyt vindue)</span>
                </a>
                .
              </p>
              <p className="mt-3 leading-relaxed">
                Restaurantens interne opslagsside til personalet gemmer en kopi af menukortet i
                browserens lokale lager. Den indeholder ingen oplysninger om besøgende.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl text-fg">Bestilling</h2>
              <p className="mt-2 leading-relaxed">
                Bestilling og forudbestilling sker over telefon. Vi gemmer ikke dine oplysninger
                digitalt gennem hjemmesiden – din bestilling håndteres direkte af os i
                restauranten.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl text-fg">Dine rettigheder</h2>
              <p className="mt-2 leading-relaxed">
                Efter databeskyttelsesforordningen (GDPR) har du ret til indsigt i, berigtigelse af
                og sletning af eventuelle oplysninger, vi måtte have om dig. Hjemmesiden har ingen
                formularer eller brugerkonti, så vi har normalt ingen oplysninger, der er knyttet
                til dig ved navn. Kontakt os endelig, hvis du har spørgsmål.
              </p>
            </section>
          </div>

          <div className="mt-12 border-t border-line pt-6">
            <Link
              to="/"
              className="text-sm font-medium text-muted underline decoration-signal underline-offset-4 hover:text-fg"
            >
              ← Tilbage til forsiden
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Privatliv

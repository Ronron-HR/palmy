import { business } from '../content'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Link from '../components/Link'

// Privatlivspolitik — beskriver ærligt den faktiske databehandling: siden
// indsamler ikke selv personoplysninger, sætter ingen cookies af sig selv, og
// har ingen analyse/tracking. Google Maps indlæses først ved klik.
function Privatliv() {
  return (
    <>
      <Navigation />
      <main className="bg-cream">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
          <h1 className="font-display text-3xl font-semibold text-green-deep sm:text-4xl">
            Privatlivspolitik
          </h1>
          <p className="mt-3 text-sm text-green-deep/50">Senest opdateret: september 2025</p>

          <div className="mt-10 space-y-8 text-green-deep/80">
            <section>
              <h2 className="font-display text-xl font-semibold text-green-deep">Dataansvarlig</h2>
              <p className="mt-2 leading-relaxed">
                {business.name}, {business.address}. Har du spørgsmål til denne politik, er du
                velkommen til at ringe på{' '}
                <a href={`tel:${business.phoneHref}`} className="font-medium text-green-deep underline decoration-gold/50 underline-offset-4">
                  {business.phoneDisplay}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-green-deep">
                Hvilke oplysninger vi indsamler
              </h2>
              <p className="mt-2 leading-relaxed">
                Denne hjemmeside indsamler ikke selv personoplysninger om dig. Der er ingen
                kontaktformular, ingen brugerkonto og ingen onlinebetaling. Vi bruger heller ikke
                analyseværktøjer eller sporing af din adfærd på siden.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-green-deep">Cookies</h2>
              <p className="mt-2 leading-relaxed">
                Hjemmesiden sætter ikke cookies af sig selv. På kontaktsiden kan du vælge at
                indlæse et Google Maps-kort ved at klikke på “Vis kort”. Først når du gør det,
                indlæses kortet fra Google, som kan sætte egne cookies. Du kan læse mere i{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-green-deep underline decoration-gold/50 underline-offset-4"
                >
                  Googles privatlivspolitik
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-green-deep">Bestilling</h2>
              <p className="mt-2 leading-relaxed">
                Bestilling og forudbestilling sker over telefon. Vi gemmer ikke dine oplysninger
                digitalt gennem hjemmesiden – din bestilling håndteres direkte af os i
                restauranten.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-green-deep">Dine rettigheder</h2>
              <p className="mt-2 leading-relaxed">
                Efter databeskyttelsesforordningen (GDPR) har du ret til indsigt i, berigtigelse af
                og sletning af eventuelle oplysninger, vi måtte have om dig. Da vi ikke indsamler
                personoplysninger via hjemmesiden, har vi normalt ingen data om dig at udlevere.
                Kontakt os endelig, hvis du har spørgsmål.
              </p>
            </section>
          </div>

          <div className="mt-12 border-t border-green-deep/10 pt-6">
            <Link
              to="/"
              className="text-sm font-medium text-green-deep/70 underline decoration-gold/50 underline-offset-4 hover:text-green-deep"
            >
              ← Tilbage til forsiden
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Privatliv

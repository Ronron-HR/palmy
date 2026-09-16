import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Link from '../components/Link'
import { business } from '../content'

// Rigtig 404 (dist/404.html serveres af Cloudflare Pages med status 404), så
// ukendte adresser ikke længere svarer 200 med forsidens indhold.
function NotFound() {
  return (
    <>
      <Navigation />
      <main id="indhold" className="bg-cream">
        <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">404</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-green-deep sm:text-4xl">
            Siden findes ikke
          </h1>
          <p className="mt-4 text-lg text-green-deep/80">
            Adressen er måske stavet forkert, eller siden er flyttet. Menu, åbningstider og
            kontakt til {business.name} finder du på forsiden.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-green-deep px-6 py-3 text-base font-semibold text-cream transition-colors hover:bg-green-deep-light"
            >
              Til forsiden
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center justify-center rounded-full border border-green-deep/30 px-6 py-3 text-base font-semibold text-green-deep transition-colors hover:bg-green-deep/5"
            >
              Se menukortet
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default NotFound

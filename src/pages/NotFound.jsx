import Layout from '../components/Layout'
import Link from '../components/Link'
import RingKnap from '../components/RingKnap'
import { business } from '../content'

// Rigtig 404 (dist/404.html serveres af Cloudflare Pages med status 404), så
// ukendte adresser ikke svarer 200 med forsidens indhold.
function NotFound() {
  return (
    <Layout>
      <div className="theme-ivory bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32">
        <h1 className="font-display text-6xl leading-none text-fg sm:text-7xl">Siden findes ikke</h1>
        <p className="mt-5 text-lg text-muted">
          Adressen er måske stavet forkert, eller siden er flyttet. Menu, åbningstider og
          kontakt til {business.name} finder du her.
        </p>
        <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
          <Link
            to="/menu"
            className="press inline-flex min-h-12 items-center justify-center rounded-full bg-fg px-6 py-3 text-base font-semibold text-bg hover:bg-fg/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
          >
            Se menukortet
          </Link>
          <Link
            to="/"
            className="press inline-flex min-h-12 items-center justify-center rounded-full border border-fg/40 px-6 py-3 text-base font-semibold text-fg hover:bg-fg/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
          >
            Til forsiden
          </Link>
          <RingKnap variant="cta">Ring {business.phoneDisplay}</RingKnap>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default NotFound

import Layout from '../components/Layout'
import Link from '../components/Link'
import RingKnap from '../components/RingKnap'
import { business } from '../content'

// Rigtig 404 (dist/404.html serveres af Cloudflare Pages med status 404), så
// ukendte adresser ikke svarer 200 med forsidens indhold.
function NotFound() {
  return (
    <Layout>
      <div className="theme-paper bg-bg text-fg">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-32">
        <h1 className="font-display text-h1 text-fg">Siden findes ikke</h1>
        <p className="mt-5 text-lg text-muted">
          Adressen er måske stavet forkert, eller siden er flyttet. Menu, åbningstider og
          kontakt til {business.name} finder du her.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
          <RingKnap className="w-full sm:w-auto">Ring {business.phoneDisplay}</RingKnap>
          <Link to="/menu" className="tlink">
            Se menukortet
          </Link>
          <Link to="/" className="tlink">
            Til forsiden
          </Link>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default NotFound

import { useSyncExternalStore } from 'react'
import { business, hours, frame } from '../content'
import Link from './Link'

// Professionel footer — kontakt, åbningstider, sidelinks og juridisk.
// Sektions-ankre bruger plain <a href="/#..."> så de virker fra alle ruter
// (browseren håndterer selv hash-scroll); side-ruter bruger intern Link.
// Kolonnetitlerne er bevidst <p>, ikke headings: de er navigation, ikke
// indhold, og skal ikke gentage sidens H2'er ("Kontakt", "Åbningstider").
const colTitle = 'text-xs font-semibold uppercase tracking-[0.15em] text-gold'
const subscribeNever = () => () => {}
const currentYear = () => new Date().getFullYear()

function Footer() {
  // Årstal: build-året i den prerenderede HTML, klientens år efter hydration
  // (useSyncExternalStore lader React skifte uden hydration-fejl ved nytår).
  const year = useSyncExternalStore(subscribeNever, currentYear, currentYear)

  return (
    <footer id="footer" className="bg-green-deep text-cream/80">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="font-display text-xl font-semibold text-cream">{business.name}</p>
            <p className="mt-3 text-sm text-cream/70">{frame.tagline}</p>
            <p className="mt-1 text-sm text-cream/70">
              Vietnamesisk restaurant og takeaway i {business.city}
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <p className={colTitle}>Kontakt</p>
            <address className="mt-4 space-y-2 text-sm not-italic">
              <p>
                <a
                  href={`tel:${business.phoneHref}`}
                  className="transition-colors hover:text-cream"
                >
                  Tlf. {business.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={business.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cream"
                >
                  {business.address}
                </a>
              </p>
            </address>
          </div>

          {/* Åbningstider */}
          <div>
            <p className={colTitle}>Åbningstider</p>
            <ul className="mt-4 space-y-2 text-sm">
              {hours.schedule.map((entry) => (
                <li key={entry.day} className="flex justify-between gap-4">
                  <span>{entry.day}</span>
                  <span className="text-cream/60">{entry.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-cream/50">{hours.preorderNote}</p>
          </div>

          {/* Sider */}
          <nav aria-label="Genveje">
            <p className={colTitle}>Genveje</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/" className="transition-colors hover:text-cream">
                  Forside
                </Link>
              </li>
              <li>
                <Link to="/menu" className="transition-colors hover:text-cream">
                  Menukort
                </Link>
              </li>
              <li>
                <a href="/#historie" className="transition-colors hover:text-cream">
                  Vores historie
                </a>
              </li>
              <li>
                <a href="/#aabningstider" className="transition-colors hover:text-cream">
                  Åbningstider
                </a>
              </li>
              <li>
                <a href="/#kontakt" className="transition-colors hover:text-cream">
                  Find vej
                </a>
              </li>
              <li>
                <Link to="/privatliv" className="transition-colors hover:text-cream">
                  Privatlivspolitik
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name}. Alle rettigheder forbeholdes.
          </p>
          <Link to="/privatliv" className="transition-colors hover:text-cream">
            Privatlivspolitik
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer

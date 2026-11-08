import { useSyncExternalStore } from 'react'
import { business, hours, frame, nav } from '../content'
import Link from './Link'

// Footer — adresse, tider, telefon og sidelinks. Kolonnetitlerne er bevidst <p>,
// ikke headings: de er navigation, ikke indhold, og skal ikke gentage sidens
// H2'er ("Åbningstider"). Anker-links bruger plain <a href="/#…"> så de virker
// fra alle ruter; side-ruter bruger intern Link.
const colTitle = 'text-sm font-semibold text-fg'
const subscribeNever = () => () => {}
const currentYear = () => new Date().getFullYear()

function Footer() {
  // Årstal: build-året i den prerenderede HTML, klientens år efter hydration
  // (useSyncExternalStore lader React skifte uden hydration-fejl ved nytår).
  const year = useSyncExternalStore(subscribeNever, currentYear, currentYear)

  return (
    <footer id="footer" className="theme-teak grain bg-bg text-muted">
      <div aria-hidden="true" className="h-px bg-brass/60" />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="font-display text-3xl leading-none text-fg">{business.name}</p>
            <p className="mt-3 text-sm">{frame.tagline}</p>
            <p className="mt-1 text-sm">Vietnamesisk restaurant og takeaway i {business.city}</p>
          </div>

          {/* Kontakt */}
          <div>
            <p className={colTitle}>Kontakt</p>
            <address className="mt-4 text-sm not-italic">
              <p>
                <a
                  href={`tel:${business.phoneHref}`}
                  className="inline-flex min-h-11 min-w-11 items-center tabular-nums transition-colors hover:text-fg"
                >
                  Tlf. {business.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={business.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-fg"
                >
                  {business.address} <span className="sr-only">(åbner i nyt vindue)</span>
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
                  <span className="tabular-nums">{entry.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm leading-relaxed">{hours.preorderNote}</p>
          </div>

          {/* Sider */}
          <nav aria-label="Genveje">
            <p className={colTitle}>Sider</p>
            <ul className="mt-4 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  {item.href.includes('#') ? (
                    <a href={item.href} className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-fg">
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.href} className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-fg">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name}. Alle rettigheder forbeholdes.
          </p>
          <Link to="/privatliv" className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-fg">
            Privatlivspolitik
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer

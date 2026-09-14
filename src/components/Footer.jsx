import { business, hours, frame } from '../content'
import Link from './Link'

// Professionel footer — kontakt, åbningstider, sidelinks og juridisk.
// Sektions-ankre bruger plain <a href="/#..."> så de virker fra alle ruter
// (browseren håndterer selv hash-scroll); side-ruter bruger intern Link.
function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="footer" className="bg-green-deep text-cream/80">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="font-display text-xl font-semibold text-cream">{business.name}</p>
            <p className="mt-3 text-sm text-cream/70">{frame.tagline}</p>
          </div>

          {/* Kontakt */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
              Kontakt
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`tel:${business.phone}`}
                  className="transition-colors hover:text-cream"
                >
                  Tlf. {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={business.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cream"
                >
                  {business.address}
                </a>
              </li>
            </ul>
          </div>

          {/* Åbningstider */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
              Åbningstider
            </h2>
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
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
              Genveje
            </h2>
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
          </div>
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

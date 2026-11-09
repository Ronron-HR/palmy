import { social } from '../content'
import { useReplay } from '../hooks/useReplay'

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-7 w-7">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.6V21h2.9z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
      className="h-7 w-7"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

const channels = [
  { name: 'Instagram', handle: '@palmyspisested', href: social.instagram, Icon: InstagramIcon },
  { name: 'Facebook', handle: 'Palmy Spisested', href: social.facebook, Icon: FacebookIcon },
]

// "Følg Palmy": et bånd over footeren på alle sider med to store, nemme links til
// Instagram og Facebook — sat som to rækker i menutavlens sprog (navn til venstre,
// profilnavn til højre, hårfine streger). Ikonerne popper ind, hver gang båndet
// kommer ind i billedet (kun transform/opacity — let og hurtigt).
function FoelgOs() {
  const [ref, plays] = useReplay()

  return (
    <section
      ref={ref}
      aria-labelledby="foelg-titel"
      className="theme-ink border-t border-line bg-bg text-fg"
    >
      <div className="section-y mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <h2 id="foelg-titel" className="font-display text-h2 text-fg lg:col-span-5">
          Følg Palmy
        </h2>

        <ul className="divide-y divide-line border-y border-line lg:col-span-7" key={plays}>
          {channels.map(({ name, handle, href, Icon }, i) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-20 items-center justify-between gap-4 px-0 py-5 transition-colors hover:bg-fg hover:text-bg focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-4"
              >
                <span className="flex items-center gap-4">
                  <span className="pop text-signal transition-colors group-hover:text-bg" style={{ '--d': `${i * 140}ms` }}>
                    <Icon />
                  </span>
                  <span className="font-display text-h3 leading-none">{name}</span>
                </span>
                <span className="text-sm text-muted transition-colors group-hover:text-bg">{handle}</span>
                <span className="sr-only">(åbner i nyt vindue)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default FoelgOs

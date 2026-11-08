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
// Instagram og Facebook. Ikonerne popper ind, hver gang båndet kommer ind i
// billedet (kun transform/opacity — let og hurtigt).
function FoelgOs() {
  const [ref, plays] = useReplay()

  return (
    <section
      ref={ref}
      aria-labelledby="foelg-titel"
      className="theme-teak grain bg-bg text-fg"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
        <h2 id="foelg-titel" className="font-display text-4xl leading-none text-fg sm:text-5xl">
          Følg Palmy
        </h2>

        <ul className="grid gap-3 sm:grid-cols-2 lg:w-[34rem]" key={plays}>
          {channels.map(({ name, handle, href, Icon }, i) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-16 items-center gap-4 border border-brass/60 px-5 py-3 transition-colors hover:bg-brass hover:text-cta-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              >
                <span
                  className="pop text-brass transition-colors group-hover:text-cta-fg"
                  style={{ '--d': `${i * 140}ms` }}
                >
                  <Icon />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-lg font-semibold">{name}</span>
                  <span className="text-sm text-muted transition-colors group-hover:text-cta-fg">
                    {handle}
                  </span>
                </span>
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

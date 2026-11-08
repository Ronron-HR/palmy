import { social } from '../content'

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
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
      strokeWidth="1.8"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Facebook og Instagram som to tydelige links med ikon og navn (ikke kun ikon),
// så de også kan læses af skærmlæsere og er nemme at ramme med en tommel.
function SocialLinks({ className = '' }) {
  const link =
    'press inline-flex min-h-11 items-center gap-2.5 rounded-full border border-current/40 px-4 text-sm font-semibold hover:bg-fg/10'
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      <li>
        <a href={social.facebook} target="_blank" rel="noopener noreferrer" className={link}>
          <FacebookIcon />
          Facebook <span className="sr-only">(åbner i nyt vindue)</span>
        </a>
      </li>
      <li>
        <a href={social.instagram} target="_blank" rel="noopener noreferrer" className={link}>
          <InstagramIcon />
          Instagram <span className="sr-only">(åbner i nyt vindue)</span>
        </a>
      </li>
    </ul>
  )
}

// Kun ikoner (runde, 44 px) til trange steder: header og hero.
export function SocialIconLinks({ className = '' }) {
  const link =
    'press inline-flex h-11 w-11 items-center justify-center rounded-full border border-current/40 hover:bg-fg/10'
  return (
    <ul className={`flex gap-2 ${className}`}>
      <li>
        <a
          href={social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook (åbner i nyt vindue)"
          className={link}
        >
          <FacebookIcon />
        </a>
      </li>
      <li>
        <a
          href={social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram (åbner i nyt vindue)"
          className={link}
        >
          <InstagramIcon />
        </a>
      </li>
    </ul>
  )
}

export default SocialLinks

import { faq, business } from '../content'
import Link from './Link'

// Ofte stillede spørgsmål — native <details>/<summary>, så svarene er ren
// HTML (crawlbar, tastatur-tilgængelig) uden JavaScript. Samme spørgsmål og
// svar ligger i FAQPage-schema via src/seo.js.
function ChevronIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

// Telefonnummer og adresse i svarteksten bliver til tel:- og Maps-links.
const inlineLink = 'font-semibold text-fg underline decoration-brass underline-offset-4 hover:text-brass'
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const linkPattern = new RegExp(`(${escapeRegex(business.phoneDisplay)}|${escapeRegex(business.address)})`)

function LinkedText({ text }) {
  return text.split(linkPattern).map((part, index) => {
    if (part === business.phoneDisplay) {
      return (
        <a key={index} href={`tel:${business.phoneHref}`} className={inlineLink}>
          {part}
        </a>
      )
    }
    if (part === business.address) {
      return (
        <a
          key={index}
          href={business.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          {part} <span className="sr-only">(åbner i nyt vindue)</span>
        </a>
      )
    }
    return part
  })
}

function AnswerLink({ link }) {
  const className =
    'mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-fg underline decoration-brass underline-offset-[6px] hover:text-brass'
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label} <span className="sr-only">(åbner i nyt vindue)</span>
      </a>
    )
  }
  return (
    <Link to={link.href} className={className}>
      {link.label}
    </Link>
  )
}

function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-titel" className="theme-ivory bg-bg text-fg">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-3xl">
          <h2 id="faq-titel" className="font-display text-4xl leading-none text-fg sm:text-5xl">
            {faq.heading}
          </h2>

          <div className="mt-8 divide-y divide-line border-y border-line">
            {faq.items.map((item) => (
              <details key={item.question} className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-display text-2xl leading-tight text-fg [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <ChevronIcon className="h-5 w-5 flex-shrink-0 text-brass transition-transform group-open:rotate-180" />
                </summary>
                <div className="pb-6 pr-9 text-base leading-relaxed text-muted">
                  <p>
                    <LinkedText text={item.answer} />
                  </p>
                  {item.link && <AnswerLink link={item.link} />}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq

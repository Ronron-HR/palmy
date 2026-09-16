import { faq } from '../content'
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

function AnswerLink({ link }) {
  const className =
    'mt-2 inline-block text-sm font-medium text-green-deep underline decoration-gold/50 underline-offset-4 hover:text-green-deep-light'
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label}
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
    <section id="faq" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h2 className="text-center font-display text-3xl font-semibold text-green-deep sm:text-4xl">
          {faq.heading}
        </h2>

        <div className="mt-10 divide-y divide-gold/25 border-y border-gold/25">
          {faq.items.map((item) => (
            <details key={item.question} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-display text-lg font-semibold text-green-deep [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <ChevronIcon className="h-5 w-5 flex-shrink-0 text-gold transition-transform group-open:rotate-180" />
              </summary>
              <div className="pb-5 pr-9 text-base leading-relaxed text-green-deep/80">
                <p>{item.answer}</p>
                {item.link && <AnswerLink link={item.link} />}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faq

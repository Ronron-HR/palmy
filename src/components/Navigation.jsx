import { useState } from 'react'
import { business, nav } from '../content'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-green-deep/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="#forside"
          className="font-display text-xl font-semibold text-green-deep sm:text-2xl"
        >
          {business.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-green-deep transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={`tel:${business.phone}`}
            className="text-sm font-normal text-green-deep/60 transition-colors hover:text-green-deep"
          >
            {business.phoneDisplay}
          </a>
          <a
            href={`tel:${business.phone}`}
            className="rounded-full bg-green-deep px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-green-deep-light"
          >
            Ring nu
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <a
            href={`tel:${business.phone}`}
            className="rounded-full bg-green-deep px-4 py-2 text-sm font-semibold text-cream"
          >
            Ring nu
          </a>
          <button
            type="button"
            aria-label="Åbn menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
          >
            <span className="block h-0.5 w-6 bg-green-deep" />
            <span className="block h-0.5 w-6 bg-green-deep" />
            <span className="block h-0.5 w-6 bg-green-deep" />
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="flex flex-col gap-1 border-t border-green-deep/10 px-4 pb-4 md:hidden">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-2 py-3 text-base font-medium text-green-deep hover:bg-green-deep/5"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Navigation

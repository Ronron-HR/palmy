import { useEffect, useMemo, useRef, useState } from 'react'
import { dishes, dishesByNumber, formatChoicesQuestion, formatKr, type Dish } from '../data/menu'
import { internt, menuText } from '../content'
import { useMenuCache } from '../hooks/useMenuCache'
import NumberBadge from '../components/menu/NumberBadge'
import Link from '../components/Link'

// Bestillingsvisning — intern side til personalet ved telefonen/disken.
// Kunden siger "nummer 11", personalet skal på under 2 sekunder se hvilke
// opfølgende spørgsmål der skal stilles og hvad det koster. Ingen
// animationer, ingen effekter — hurtig og kedelig med vilje.
// v3: samme tokens som resten af sitet (creme/sort/grøn, radius 0).

// Afledt fra menuen (ikke hardcodet), så nye numre automatisk kommer med.
// Numrene er tekst; de sorteres kun her i tastatur-oversigten (naturlig
// rækkefølge), selve teksten vises uændret.
const ALL_NUMBERS = Array.from(dishesByNumber.keys()).sort((a, b) =>
  a.localeCompare(b, 'da', { numeric: true }),
)
const KEYPAD_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫']
const t = internt.bestilling

function normalize(value: string): string {
  return value.toLowerCase()
}

const label = 'text-xs font-bold'

function Bestilling() {
  useMenuCache()

  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const trimmed = query.trim()
  const isNumeric = trimmed !== '' && /^\d+$/.test(trimmed)

  const { dish, suggestions } = useMemo((): { dish: Dish | null; suggestions: Dish[] } => {
    if (trimmed === '') return { dish: null, suggestions: [] }

    const exact = dishesByNumber.get(trimmed) ?? null
    if (exact) return { dish: exact, suggestions: [] }

    if (isNumeric) {
      const partial = ALL_NUMBERS.filter((n) => n.startsWith(trimmed))
        .map((n) => dishesByNumber.get(n))
        .filter((d): d is Dish => Boolean(d))
      return { dish: null, suggestions: partial }
    }

    const needle = normalize(trimmed)
    const found = dishes.filter(
      (d) =>
        normalize(d.name).includes(needle) ||
        (d.description != null && normalize(d.description).includes(needle)),
    )
    if (found.length === 1) return { dish: found[0], suggestions: [] }
    return { dish: null, suggestions: found }
  }, [trimmed, isNumeric])

  const refocus = () => {
    // Hold fokus i søgefeltet så personalet aldrig behøver klikke sig tilbage.
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  const appendDigit = (digit: string) => {
    setQuery((q) => q + digit)
    refocus()
  }
  const backspace = () => {
    setQuery((q) => q.slice(0, -1))
    refocus()
  }
  const clear = () => {
    setQuery('')
    refocus()
  }
  const jumpTo = (value: string) => {
    setQuery(value)
    refocus()
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-(--col-text) px-(--gutter-mobile) py-8">
        <h1 className="font-serif text-lg leading-heading font-bold text-green">{t.heading}</h1>
        <p className="text-xs">{t.subheading}</p>

        <div className="relative mt-6">
          <input
            ref={inputRef}
            type="text"
            inputMode="text"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.placeholder}
            aria-label={t.searchLabel}
            className="w-full border border-black bg-cream px-5 py-4 text-lg font-semibold placeholder:font-regular"
          />
          {query !== '' && (
            <button
              type="button"
              onClick={clear}
              aria-label={t.clear}
              className="absolute top-1/2 right-3 min-h-(--tap-min) min-w-(--tap-min) -translate-y-1/2 text-lg font-bold"
            >
              ×
            </button>
          )}
        </div>

        {/* Store klikbare taltaster til tablet ved disken. */}
        <div className="mt-4 grid max-w-(--keypad-w) grid-cols-3 gap-2">
          {KEYPAD_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                if (key === 'C') clear()
                else if (key === '⌫') backspace()
                else appendDigit(key)
              }}
              className="border border-line py-4 text-lg font-bold active:bg-black active:text-cream"
            >
              {key}
            </button>
          ))}
        </div>

        {/* Resultat */}
        <div className="mt-6">
          {dish && (
            <div className="border border-black p-6">
              <div className="flex items-start gap-4">
                <NumberBadge number={dish.number} size="large" />
                <div>
                  <h2 className="font-serif text-lg leading-heading font-bold text-green">{dish.name}</h2>
                  {dish.description && <p className="mt-1 italic">{dish.description}</p>}
                  {dish.spicy && (
                    <span className="mt-2 inline-block bg-red px-(--badge-pad-x) py-(--badge-pad-y) text-xs font-bold tracking-badge text-cream">
                      {menuText.spicy}
                    </span>
                  )}
                </div>
              </div>

              {dish.choices && (
                <div className="mt-6 border-l border-gold pl-3">
                  <p className={label}>{t.ask}</p>
                  <p className="mt-1 text-lg font-semibold">{formatChoicesQuestion(dish.choices)}?</p>
                </div>
              )}

              {/* Noten gentager valget, når retten har `choices` (fx nr. 6 og 10). */}
              {dish.note && !dish.choices && <p className="mt-4 italic">{dish.note}</p>}

              <div className="mt-6 border-t border-line pt-4">
                <p className={`mb-2 ${label}`}>{t.price}</p>
                {dish.price != null && (
                  <p className="text-xl font-bold tabular-nums">{formatKr(dish.price)}</p>
                )}
                {dish.variants && (
                  <div className="flex flex-col gap-2">
                    {dish.variants.map((variant) => (
                      <div
                        key={variant.label}
                        className="flex items-baseline justify-between gap-4 border-b border-line pb-2 last:border-b-0"
                      >
                        <span className="text-md">{variant.label}</span>
                        <span className="text-lg font-bold tabular-nums">{formatKr(variant.price)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {!dish && suggestions.length > 0 && (
            <div className="border-t border-line">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  type="button"
                  onClick={() => jumpTo(suggestion.number ?? suggestion.name)}
                  className="flex w-full items-center gap-3 border-b border-line px-4 py-3 text-left"
                >
                  <NumberBadge number={suggestion.number} />
                  <span className="font-semibold">{suggestion.name}</span>
                </button>
              ))}
            </div>
          )}

          {!dish && suggestions.length === 0 && trimmed !== '' && (
            <p className="py-6 text-center">{t.noMatch(trimmed)}</p>
          )}

          {trimmed === '' && <p className="py-6 text-center">{t.empty}</p>}
        </div>

        {/* Hele nummeroversigten som kompakt klikbart grid. */}
        <div className="mt-10 border-t border-line pt-6">
          <p className={`mb-3 ${label}`}>{t.allNumbers}</p>
          <div className="grid grid-cols-5 gap-2 md:grid-cols-10">
            {ALL_NUMBERS.map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => jumpTo(number)}
                aria-pressed={dish?.number === number}
                className={`border py-3 text-md font-bold tabular-nums ${
                  dish?.number === number ? 'border-black bg-black text-cream' : 'border-line'
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-xs">
          <Link to="/">{t.home}</Link>
        </p>
      </div>
    </div>
  )
}

export default Bestilling

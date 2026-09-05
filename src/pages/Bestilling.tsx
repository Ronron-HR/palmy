import { useEffect, useMemo, useRef, useState } from 'react'
import { dishes, dishesByNumber, formatChoicesQuestion, type Dish } from '../data/menu'
import { useMenuCache } from '../hooks/useMenuCache'
import NumberBadge from '../components/menu/NumberBadge'
import Link from '../components/Link'

// Bestillingsvisning — intern side til personalet ved telefonen/disken.
// Kunden siger "nummer 11", personalet skal på under 2 sekunder se hvilke
// opfølgende spørgsmål der skal stilles og hvad det koster. Ingen
// animationer, ingen effekter — hurtig og kedelig med vilje.

const ALL_NUMBERS = Array.from({ length: 19 }, (_, i) => i + 1)
const KEYPAD_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫']

function normalize(value: string): string {
  return value.toLowerCase()
}

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

    if (isNumeric) {
      const exact = dishesByNumber.get(Number(trimmed)) ?? null
      if (exact) return { dish: exact, suggestions: [] }

      const partial = ALL_NUMBERS.filter((n) => String(n).startsWith(trimmed))
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
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-2xl font-bold text-green-deep">Bestilling</h1>
        <p className="text-sm text-green-deep/60">Palmy Spisested — internt opslag</p>

        <div className="relative mt-6">
          <input
            ref={inputRef}
            type="text"
            inputMode="text"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Nummer eller navn…"
            aria-label="Søg efter menunummer eller retnavn"
            className="w-full rounded-lg border-2 border-green-deep/25 bg-white px-5 py-4 text-2xl font-semibold text-green-deep placeholder:font-normal placeholder:text-green-deep/30 focus:border-green-deep focus:outline-none sm:text-3xl"
          />
          {query !== '' && (
            <button
              type="button"
              onClick={clear}
              aria-label="Ryd søgning"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-green-deep/10 px-3 py-1 text-lg font-bold text-green-deep"
            >
              ×
            </button>
          )}
        </div>

        {/* Store klikbare taltaster til tablet ved disken. */}
        <div className="mt-4 grid max-w-xs grid-cols-3 gap-2">
          {KEYPAD_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                if (key === 'C') clear()
                else if (key === '⌫') backspace()
                else appendDigit(key)
              }}
              className="rounded-lg bg-green-deep/5 py-4 text-2xl font-bold text-green-deep active:bg-green-deep/20"
            >
              {key}
            </button>
          ))}
        </div>

        {/* Resultat */}
        <div className="mt-6">
          {dish && (
            <div className="rounded-xl border-2 border-green-deep bg-white p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <NumberBadge number={dish.number} size="large" />
                <div>
                  <h2 className="font-display text-2xl font-bold text-green-deep sm:text-3xl">
                    {dish.name}
                  </h2>
                  {dish.description && (
                    <p className="mt-1 italic text-green-deep/60">{dish.description}</p>
                  )}
                  {dish.spicy && (
                    <span className="mt-2 inline-block rounded bg-red-warm/10 px-2 py-1 text-sm font-bold uppercase tracking-wide text-red-warm">
                      Stærk
                    </span>
                  )}
                </div>
              </div>

              {dish.choices && (
                <div className="mt-6 rounded-lg bg-gold/10 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-green-deep/50">
                    Spørg kunden
                  </p>
                  <p className="mt-1 text-xl font-semibold text-green-deep sm:text-2xl">
                    {formatChoicesQuestion(dish.choices)}?
                  </p>
                </div>
              )}

              {dish.note && (
                <p className="mt-4 text-sm italic text-green-deep/60">{dish.note}</p>
              )}

              <div className="mt-6 border-t border-gold/20 pt-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-green-deep/50">
                  Pris
                </p>
                {dish.price != null && (
                  <p className="text-4xl font-bold text-red-warm sm:text-5xl">{dish.price} kr</p>
                )}
                {dish.variants && (
                  <div className="flex flex-col gap-2">
                    {dish.variants.map((variant) => (
                      <div
                        key={variant.label}
                        className="flex items-baseline justify-between gap-4 border-b border-gold/15 pb-2 last:border-b-0"
                      >
                        <span className="text-lg text-green-deep">{variant.label}</span>
                        <span className="text-3xl font-bold text-red-warm sm:text-4xl">
                          {variant.price} kr
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {!dish && suggestions.length > 0 && (
            <div className="divide-y divide-green-deep/10 rounded-lg border border-green-deep/15 bg-white">
              {suggestions.map((suggestion) => (
                <button
                  key={`${suggestion.section}-${suggestion.number ?? suggestion.name}`}
                  type="button"
                  onClick={() =>
                    jumpTo(suggestion.number != null ? String(suggestion.number) : suggestion.name)
                  }
                  className="flex w-full items-center gap-3 px-4 py-3 text-left"
                >
                  <NumberBadge number={suggestion.number} />
                  <span className="font-medium text-green-deep">{suggestion.name}</span>
                </button>
              ))}
            </div>
          )}

          {!dish && suggestions.length === 0 && trimmed !== '' && (
            <p className="py-6 text-center text-green-deep/40">Intet match for "{trimmed}"</p>
          )}

          {trimmed === '' && (
            <p className="py-6 text-center text-green-deep/40">
              Tast et menunummer eller søg på navn
            </p>
          )}
        </div>

        {/* Hele nummeroversigten 1–19 som kompakt klikbart grid. */}
        <div className="mt-10 border-t border-green-deep/10 pt-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-green-deep/40">
            Alle numre
          </p>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
            {ALL_NUMBERS.map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => jumpTo(String(number))}
                className={
                  dish?.number === number
                    ? 'rounded-md bg-green-deep py-3 text-lg font-bold text-cream'
                    : 'rounded-md border border-green-deep/15 bg-white py-3 text-lg font-bold text-green-deep'
                }
              >
                {number}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/" className="text-xs text-green-deep/30">
            ← Forsiden
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Bestilling

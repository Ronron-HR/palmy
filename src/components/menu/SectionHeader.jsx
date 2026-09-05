// Sektionsoverskrift i kortets stil: lille mørkegrøn flag-markør, serif
// versaler med bogstavmellemrum i brændt guld, og en tynd linje der løber
// ud til højre.
function SectionHeader({ title, note }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="h-3.5 w-2.5 flex-shrink-0 bg-green-deep"
          style={{ clipPath: 'polygon(0 0, 65% 0, 100% 50%, 65% 100%, 0 100%)' }}
        />
        <h3 className="whitespace-nowrap font-display text-lg font-semibold uppercase tracking-[0.15em] text-gold sm:text-xl">
          {title}
        </h3>
        <span aria-hidden="true" className="h-px flex-1 bg-gold/40" />
      </div>
      {note && (
        <p className="mt-2 pl-[1.375rem] text-sm italic text-green-deep/70">{note}</p>
      )}
    </div>
  )
}

export default SectionHeader

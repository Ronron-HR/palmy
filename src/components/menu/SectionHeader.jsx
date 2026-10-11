// Sektionsoverskrift i kortets stil: serif versaler med bogstavmellemrum i
// mørkegrøn og én dekoration — en tynd guldlinje, der løber ud til højre.
function SectionHeader({ id, title, note, level = 3 }) {
  const Heading = level === 2 ? 'h2' : 'h3'
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <Heading
          id={id}
          className="font-display text-lg font-semibold uppercase tracking-[0.12em] text-green-deep sm:text-xl"
        >
          {title}
        </Heading>
        <span aria-hidden="true" className="h-px flex-1 bg-gold/50" />
      </div>
      {note && (
        <p className="mt-2 text-sm italic text-green-deep/75">{note}</p>
      )}
    </div>
  )
}

export default SectionHeader

// Kategorititel som på kortet (KOMPONENTER.md §3): serif 700 28/1.1 grøn +
// en 1 px streg, der løber til højre. Undertitel i kursiv 17, 4 under.
function SectionHeader({ id, title, note, level = 2 }) {
  const Heading = level === 2 ? 'h2' : 'h3'
  return (
    <>
      <div className="flex items-center gap-3">
        <Heading id={id} className="flex-none font-serif text-lg leading-tight font-bold text-green">
          {title}
        </Heading>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>
      {note && <p className="mt-1 italic">{note}</p>}
    </>
  )
}

export default SectionHeader

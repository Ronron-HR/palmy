// Kategorititel som på kortet (KOMPONENTER.md §3): serif 700 28/1.1 grøn +
// en 1 px streg, der løber til højre. Undertitel i kursiv 17, 4 under.
function SectionHeader({ id, title, note, level = 2 }) {
  const Heading = level === 2 ? 'h2' : 'h3'
  return (
    <>
      <div className="flex items-center gap-3">
        <Heading id={id} className="flex-none font-serif text-xl leading-tight text-green">
          {title}
        </Heading>
        {/* Streg som border (ikke baggrund), så den også kommer med på print. */}
        <span aria-hidden="true" className="flex-1 border-t-2 border-gold" />
      </div>
      {note && <p className="mt-1 italic">{note}</p>}
    </>
  )
}

export default SectionHeader

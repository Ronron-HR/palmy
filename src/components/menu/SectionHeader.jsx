// Sektionsoverskrift: stor serif og en tynd streg under. Ingen versaler og ingen
// pynt — menuen skal læses, ikke dekoreres.
function SectionHeader({ id, title, note, level = 3 }) {
  const Heading = level === 2 ? 'h2' : 'h3'
  return (
    <div className="mb-2 border-b border-line pb-4">
      <Heading id={id} className="font-display text-4xl leading-none text-fg sm:text-5xl">
        {title}
      </Heading>
      {note && <p className="mt-3 text-sm text-muted">{note}</p>}
    </div>
  )
}

export default SectionHeader

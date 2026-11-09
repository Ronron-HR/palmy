// Sektionsoverskrift: kategoriens navn i skiltets skrift over en kraftig blæk-streg,
// som overskriften på en menutavle. Ingen pynt — menuen skal læses, ikke dekoreres.
function SectionHeader({ id, title, note, level = 3 }) {
  const Heading = level === 2 ? 'h2' : 'h3'
  return (
    <div className="mb-1 border-b-2 border-fg pb-3">
      <Heading id={id} className="font-display text-h3 text-fg">
        {title}
      </Heading>
      {note && <p className="mt-2 text-sm text-muted">{note}</p>}
    </div>
  )
}

export default SectionHeader

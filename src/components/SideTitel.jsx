// Sidetitel (palmy_handoff "H1 undersider"): eyebrow i rød versal og stor serif.
function SideTitel({ eyebrow, children, className = '' }) {
  return (
    <div className={`pt-10 md:pt-16 ${className}`}>
      {eyebrow && <p className="eyebrow text-red">{eyebrow}</p>}
      <h1 className="page-h1 mt-3 font-serif text-green">{children}</h1>
    </div>
  )
}

export default SideTitel

// Palmer i heroen, tegnet som SVG i samme silhuet-stil som Palmys logo.
// Stammer og ø står stille; hvert palmeblad drejer om kronen i sin egen takt
// (index.css: .palm-frond, .palm-crown), så spidserne bevæger sig mest og
// bladene aldrig følges ad — som i en jævn vind. Formen regnes ud én gang.

const r = (n) => Math.round(n * 10) / 10

// Et blad fra kronen C i retning `deg` (−90 = lige op), længde L. Ribben
// buer op og hænger så ned mod spidsen; småbladene er smalle, fyldte og
// vinklet mod spidsen, længst på midten.
function frondPath(C, deg, L) {
  const a = (deg * Math.PI) / 180
  const dir = [Math.cos(a), Math.sin(a)]
  const droop = 0.18 + 0.32 * Math.abs(Math.cos(a)) // vandrette blade hænger mest
  const p0 = C
  const p1 = [C[0] + dir[0] * L * 0.55, C[1] + dir[1] * L * 0.55 - L * 0.16]
  const p2 = [C[0] + dir[0] * L, C[1] + dir[1] * L + L * droop]
  const at = (t, u = 1 - t) => [
    u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
    u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
  ]
  const tan = (t) => {
    const dx = 2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0])
    const dy = 2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1])
    const l = Math.hypot(dx, dy)
    return [dx / l, dy / l]
  }
  // Ribben som en spids, fyldt form (bred ved kronen, tynd i spidsen).
  const w0 = L * 0.035
  const n0 = tan(0)
  let d = `M${r(p0[0] - n0[1] * w0)} ${r(p0[1] + n0[0] * w0)}Q${r(p1[0])} ${r(p1[1])} ${r(p2[0])} ${r(p2[1])}Q${r(p1[0])} ${r(p1[1] - w0)} ${r(p0[0] + n0[1] * w0)} ${r(p0[1] - n0[0] * w0)}Z`
  const count = 13
  for (let i = 0; i < count; i++) {
    const t = 0.12 + (i / (count - 1)) * 0.8
    const [x, y] = at(t)
    const [tx, ty] = tan(t)
    const len = L * (0.12 + 0.3 * Math.sin(Math.PI * Math.min(t * 1.05, 1)))
    for (const side of [1, -1]) {
      let dx = -ty * side + tx * 0.9
      let dy = tx * side + ty * 0.9 + 0.35 // lidt tyngde
      const l = Math.hypot(dx, dy)
      dx /= l
      dy /= l
      const ex = x + dx * len
      const ey = y + dy * len
      const w = len * 0.13
      const mx = x + dx * len * 0.42 + tx * len * 0.1
      const my = y + dy * len * 0.42 + ty * len * 0.1
      d += `M${r(x)} ${r(y)}Q${r(mx - dy * w)} ${r(my + dx * w)} ${r(ex)} ${r(ey)}Q${r(mx + dy * w)} ${r(my - dx * w)} ${r(x)} ${r(y)}Z`
    }
  }
  return d
}

// Stammen: let buet, smal mod toppen, fra fod F til krone C.
function trunkPath(F, C, wBase, wTop, bend) {
  const mid = [(F[0] + C[0]) / 2 + bend, (F[1] + C[1]) / 2]
  return `M${r(F[0] - wBase)} ${r(F[1])}Q${r(mid[0] - (wBase + wTop) / 2)} ${r(mid[1])} ${r(C[0] - wTop)} ${r(C[1])}L${r(C[0] + wTop)} ${r(C[1])}Q${r(mid[0] + (wBase + wTop) / 2)} ${r(mid[1])} ${r(F[0] + wBase)} ${r(F[1])}Z`
}

// [retning, længde, udsving i grader, varighed i s]
const BIG = [
  [-176, 150, 5.5, 4.6], [-152, 168, 4.5, 5.3], [-128, 150, 3.5, 4.1],
  [-104, 128, 3, 5.8], [-80, 132, 3, 4.4], [-56, 156, 3.5, 5.1],
  [-32, 170, 4.5, 4.8], [-8, 152, 5.5, 5.6], [-200, 120, 6, 4.3],
]
const SMALL = [
  [-170, 86, 6, 3.9], [-140, 96, 5, 4.7], [-110, 80, 4, 4.2],
  [-75, 82, 4, 5], [-42, 96, 5, 4.5], [-12, 88, 6, 5.2],
]

function makePalm(C, F, fronds, trunk) {
  return {
    C,
    trunk: trunkPath(F, C, trunk[0], trunk[1], trunk[2]),
    fronds: fronds.map(([deg, L, amp, dur], i) => ({ d: frondPath(C, deg, L), amp, dur, i })),
  }
}

const PALMS = [
  makePalm([196, 168], [176, 404], BIG, [11, 6, -14]),
  makePalm([336, 286], [300, 406], SMALL, [7, 4, 6]),
]
const GROUND = 'M14 414Q120 392 214 396Q318 398 404 416Q300 408 210 409Q110 410 14 414Z'

function Palm({ className = '', seed = 0 }) {
  return (
    <svg viewBox="0 0 420 420" aria-hidden="true" focusable="false" className={`palm ${className}`}>
      <path d={GROUND} />
      {PALMS.map((palm, p) => (
        <g key={p}>
          <path d={palm.trunk} />
          <g
            className="palm-crown"
            style={{
              '--ox': `${palm.C[0]}px`,
              '--oy': `${palm.C[1]}px`,
              '--dur': `${6.2 + p * 1.3}s`,
              '--delay': `${-(seed * 2.1 + p * 1.7)}s`,
            }}
          >
            {palm.fronds.map((f) => (
              <path
                key={f.i}
                d={f.d}
                className="palm-frond"
                style={{
                  '--ox': `${palm.C[0]}px`,
                  '--oy': `${palm.C[1]}px`,
                  '--amp': `${f.amp}deg`,
                  '--dur': `${f.dur + seed * 0.37}s`,
                  '--delay': `${-((f.i * 0.73 + seed * 1.3) % f.dur)}s`,
                }}
              />
            ))}
          </g>
        </g>
      ))}
    </svg>
  )
}

export default Palm

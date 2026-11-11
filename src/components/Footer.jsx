import { business, hours, social, ui } from '../content'

// Footer på én linje (KOMPONENTER.md §8). id="kontakt", så gamle links til
// /#kontakt stadig lander her.
// - bleed: Forside og Menu på mobil, hvor stregen går i fuld bredde og
//   afstanden over er 48 (ellers 56), som i prototyperne.
// - Bunden har plads til ring-baren på mobil (60 + 36).
function Footer({ bleed = false }) {
  const spacing = bleed
    ? '-mx-(--gutter-mobile) mt-12 px-(--gutter-mobile) md:mx-0 md:mt-14 md:px-0'
    : 'mt-14'
  return (
    <footer
      id="kontakt"
      className={`${spacing} border-t border-line pt-4 pb-ringbar text-xs leading-loose md:pb-8`}
    >
      {business.address} · {hours.line} · <a href={`tel:${business.phoneHref}`}>{business.phoneDisplay}</a>
      {' · '}
      <a href={social.instagram}>{ui.instagram}</a>
      {' · '}
      <a href={social.facebook}>{ui.facebook}</a>
    </footer>
  )
}

export default Footer

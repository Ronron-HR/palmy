import { navigate } from '../hooks/usePathname'

// Intern navigationslink — opdaterer history uden fuld sideindlæsning.
// Almindelig venstreklik uden modifier-taster fanges; midterklik/nyt-faneblad
// osv. falder tilbage til normal <a>-adfærd.
function Link({ to, children, className, onClick }) {
  const handleClick = (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }
    event.preventDefault()
    navigate(to)
    onClick?.(event)
    // Flyt fokus til den nye sides indhold, så tastatur/skærmlæser følger med.
    requestAnimationFrame(() => {
      const main = document.getElementById('indhold')
      if (!main) return
      if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1')
      main.focus({ preventScroll: true })
    })
  }

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}

export default Link

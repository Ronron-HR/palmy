import { useEffect } from 'react'
import { dishes } from '../data/menu'

const CACHE_KEY = 'palmy-menu-cache-v1'

// Menudata er bundlet i selve JS-filen og kræver i sig selv ikke netværk —
// men vi spejler den til localStorage alligevel, så Bestillingsvisningen har
// et holdbart lokalt snapshot at læne sig op ad, uanset netforbindelsen.
// (Ægte offline genindlæsning af siden — F5 uden internet — afhænger derudover
// af browserens egen cache af selve app-bundlet, hvilket ligger uden for det
// denne hook kan løse.)
export function useMenuCache() {
  useEffect(() => {
    try {
      window.localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ dishes, cachedAt: new Date().toISOString() }),
      )
    } catch {
      // localStorage kan være utilgængeligt (privat browsing, fuld disk osv.)
      // — det må aldrig stoppe personalet i at slå numre op.
    }
  }, [])
}

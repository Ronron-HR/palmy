// Cookieless klik-tracking af opkalds-CTA'er. Sender en let beacon til en
// distinkt sti pr. CTA (/cta/<source>.gif). Stierne er statiske 1×1-pixels, så
// hvert klik giver en ren 200, og Cloudflares trafik-analytics kan tælle dem
// pr. sti — uden cookies, uden bibliotek. Må aldrig blokere selve tel:-opkaldet.
export function trackCall(source) {
  try {
    const url = `/cta/${source}.gif`
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon(url)
    } else if (typeof Image !== 'undefined') {
      const img = new Image()
      img.src = `${url}?t=${Date.now()}`
    }
  } catch {
    // Tracking er bedste-forsøg og må aldrig stå i vejen for opkaldet.
  }
}

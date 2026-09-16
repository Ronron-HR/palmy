// Cloudflare Pages Function — kører før alle requests på dette projekt.
//
// Ét kanonisk domæne: alt andet end www.palmyspisested.com (apex-domænet og
// produktions-aliaset på pages.dev) 301'er til www med samme sti, så Google
// aldrig ser flere kopier af sitet. Hash-prefixede preview-deploys
// (<hash>.palmy.pages.dev) røres ikke, så previews stadig virker.
//
// Ligger her (og ikke i _redirects) fordi host-baserede regler i _redirects
// ikke slog igennem på de tilknyttede custom domains.

const CANONICAL_HOST = 'www.palmyspisested.com'
const REDIRECT_HOSTS = new Set(['palmyspisested.com', 'palmy.pages.dev'])

export async function onRequest({ request, next }) {
  const url = new URL(request.url)
  if (REDIRECT_HOSTS.has(url.hostname)) {
    url.hostname = CANONICAL_HOST
    url.protocol = 'https:'
    return Response.redirect(url.toString(), 301)
  }
  return next()
}

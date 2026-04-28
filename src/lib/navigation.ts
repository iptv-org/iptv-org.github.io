import { browser } from '$app/environment'
import { goto } from '$app/navigation'

export function setSearchParam(key?: string, value?: string) {
  const url = new URL(window.location.href)

  if (key && typeof value === 'string') {
    url.searchParams.set(key, value)
  } else {
    url.search = ''
  }

  goto(url.pathname + url.search)
}

export function setPageTitle(value?: string) {
  if (browser) {
    const title = value ? `${value} · iptv-org` : 'iptv-org'
    window.document.title = title
  }
}

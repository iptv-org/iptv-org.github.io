import { browser } from '$app/environment'
import { goto } from '$app/navigation'

export function setSearchParam(key?: string, value?: string) {
  let query = key ? `?${key}=${value}` : ''
  query = query.replace(/\+/g, '%2B')
  const url = `${window.location.protocol}//${window.location.host}/${query}`
  goto(url)
  setPageTitle(value)
}

export function setPageTitle(value?: string) {
  if (browser) {
    const title = value ? `${value} · iptv-org` : 'iptv-org'
    window.document.title = title
  }
}

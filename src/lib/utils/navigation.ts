import { browser } from '$app/environment'
import { pushState } from '$app/navigation'

export function setSearchParam(key?: string, value?: string) {
  let query = key && value ? `?${key}=${value}` : ''
  query = query.replace(/\+/g, '%2B')
  const url = `${window.location.protocol}//${window.location.host}/${query}`
  const state: { [key: string]: string } = {}
  state[key] = value
  pushState(url, state)
  setPageTitle(value)
}

export function setPageTitle(value?: string) {
  if (browser) {
    const title = value ? `${value} · iptv-org` : 'iptv-org'
    window.document.title = title
  }
}

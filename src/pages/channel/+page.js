import { redirect } from '@sveltejs/kit'

export function load({ url }) {
  const id = url.searchParams.get('id')
  const [name, country] = id.split('.')
  const redirectUrl = `/channels/${country}/${name}`

  throw redirect(302, redirectUrl)
}

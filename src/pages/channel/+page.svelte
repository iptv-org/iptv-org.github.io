<script>
  import { page } from '$app/state'
  import { onMount } from 'svelte'

  onMount(() => {
    const id = page.url.searchParams.get('id')
    if (!id) return window.location.replace('/')
    const [name, country] = id.split('.')
    if (!name || !country) return window.location.replace('/')

    const redirectUrl = `/channels/${country}/${name}`

    window.location.replace(redirectUrl)
  })
</script>

Redirecting...

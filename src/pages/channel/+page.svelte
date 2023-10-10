<script>
  import { page } from '$app/stores'
  import { onMount } from 'svelte'

  onMount(() => {
    const id = $page.url.searchParams.get('id')
    const [name, country] = id.split('.')
    const redirectUrl = `/channels/${country}/${name}`

    window.location.replace(redirectUrl)
  })
</script>

Redirecting...

<script>
  import IconButton from './IconButton.svelte'
  import { onMount } from 'svelte'
  import * as Icon from '~/icons'

  let dark = false
  function toggleDarkMode() {
    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    const mode = localStorage.theme || prefersColorScheme
    if (mode === 'dark') {
      dark = false
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    } else {
      dark = true
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    }
  }

  onMount(() => {
    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    const mode = localStorage.theme || prefersColorScheme
    if (mode === 'dark') {
      dark = true
    } else {
      dark = false
    }
  })
</script>

<IconButton onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
  {#if dark}
    <Icon.LightMode size={20} />
  {:else}
    <Icon.DarkMode size={20} />
  {/if}
</IconButton>

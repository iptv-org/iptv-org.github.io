<script>
  import '~/app.css'
</script>

<svelte:head>
  <script>
    if (document) {
      const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      const mode = localStorage.theme || prefersColorScheme
      if (mode === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  </script>
</svelte:head>

<slot />

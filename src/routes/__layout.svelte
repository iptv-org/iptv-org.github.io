<script>
  import '../app.css'
  import NavBar from '../components/NavBar.svelte'
  import Modal from 'svelte-simple-modal'

  let scrollTop = 0
</script>

<svelte:window bind:scrollY="{scrollTop}" />
<svelte:head>
  <script>
    if (document) {
      let mode = localStorage.theme || 'light'
      if (mode === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
      }
    }
  </script>
</svelte:head>

<header
  class:absolute="{scrollTop <= 150}"
  class:fixed="{scrollTop > 150}"
  class="z-40 w-full min-w-[360px]"
  style="top: {scrollTop > 150 && scrollTop <= 210 ? scrollTop-210: 0}px"
>
  <NavBar withSearch="{scrollTop > 150}" />
</header>

<main class="bg-slate-50 dark:bg-[#1d232e] min-h-screen pt-10 min-w-[360px]">
  <Modal
    unstyled="{true}"
    classBg="fixed top-0 left-0 z-40 w-screen h-screen flex flex-col bg-black/[.7] overflow-y-scroll"
    closeButton="{false}"
    ><slot
  /></Modal>
</main>

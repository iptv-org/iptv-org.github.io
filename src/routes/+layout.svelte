<script lang="ts">
  import { SvelteToast } from '@zerodevx/svelte-toast'
  import Modal from 'svelte-simple-modal'
  import type { Snippet } from 'svelte'
  import './+layout.css'

  interface Props {
    children?: Snippet
  }

  let { children }: Props = $props()

  const toastOptions = {
    duration: 2000,
    reversed: true,
    intro: { x: -192 },
    dismissable: false,
    classes: ['custom']
  }
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

<Modal
  unstyled={true}
  classBg="fixed top-0 left-0 z-70 w-screen h-screen flex flex-col bg-black/[.7] overflow-y-scroll"
  closeButton={false}
>
  {@render children?.()}
</Modal>

<SvelteToast options={toastOptions} />

<style>
  :root {
    --toastContainerTop: auto;
    --toastContainerRight: auto;
    --toastContainerBottom: 1rem;
    --toastContainerLeft: 1.5rem;
  }

  :global(.custom) {
    --toastWidth: 14rem;
    --toastMinHeight: auto;
    --toastBackground: #222;
    --toastMsgPadding: 8px 10px;
    --toastBarHeight: 0;
    --toastBorderRadius: 0.25rem;
  }
</style>

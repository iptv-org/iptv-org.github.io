<script>
  import { query, hasQuery, search } from '~/store'
  import SearchFieldMini from './SearchFieldMini.svelte'
  import Divider from './Divider.svelte'
  import CreatePlaylistButton from './CreatePlaylistButton.svelte'
  import ToggleModeButton from './ToggleModeButton.svelte'
  import GitHubButton from './GitHubButton.svelte'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  export let withSearch = false

  function reset() {
    document.body.scrollIntoView()
    query.set('')
    hasQuery.set(false)
    search('')
  }
</script>

<nav
  class="bg-white border-b border-gray-200 py-2.5 dark:border-gray-700 dark:bg-gray-800 w-full h-[61px]"
>
  <div class="flex justify-between items-center mx-auto px-3 w-full max-w-6xl">
    <div class="flex flex-start items-center sm:basis-88 shrink">
      <a
        href="/"
        on:click={() => {
          reset()
        }}
        class="flex mr-6"
      >
        <span
          class="text-[1.15rem] text-[#24292f] self-center font-semibold whitespace-nowrap dark:text-white font-mono"
          >/iptv-org</span
        >
      </a>
      <div class="hidden sm:block w-full">
        {#if withSearch}
          <SearchFieldMini />
        {/if}
      </div>
    </div>

    <div class="flex flex-end items-center space-x-4 pl-3">
      <CreatePlaylistButton
        on:click={() => {
          if ($page.url.pathname !== '/') {
            goto('/')
          }
        }}
      />
      <Divider />
      <div class="inline-flex space-x-2">
        <ToggleModeButton />
        <GitHubButton />
      </div>
    </div>
  </div>
</nav>

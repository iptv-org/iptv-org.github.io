<script>
  import { query, hasQuery, search, isSearching } from '~/store'
  import { setSearchParam } from '~/navigation'
  import { goto } from '$app/navigation'
  import {
    CreatePlaylistButton,
    ToggleModeButton,
    GitHubButton,
    SearchButton,
    SearchField,
    Logo
  } from '~/components'

  export let version = 'default'
  export let onSearchButtonClick = () => {}

  let scrollY = 0
  let input

  function scrollToTop() {
    document.body.scrollIntoView()
  }

  function reset() {
    scrollToTop()
    query.set('')
    setSearchParam('q', '')
    hasQuery.set(false)
    isSearching.set(true)
    setTimeout(() => {
      search('')
    }, 0)
  }

  function focusOnInput() {
    if (input) input.focus()
  }
</script>

<svelte:window bind:scrollY />

{#if version === 'default'}
  <nav
    class="py-2.5 w-full h-[61px] bg-[#f8fafc] dark:bg-primary-850 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700"
    class:border-b={scrollY > 0}
  >
    <div class="flex justify-between items-center mx-auto px-3 w-full max-w-7xl">
      <div class="flex flex-start items-center sm:basis-120 shrink">
        <a href="/" class="pr-2" onclick={reset}>
          <Logo />
        </a>
        <div class="hidden sm:block w-full">
          {#if scrollY > 150}
            <SearchField
              version="mini"
              bind:this={input}
              onClear={() => {
                query.set('')
                focusOnInput()
              }}
              onSubmit={() => {
                goto(`/?q=${$query}`)
              }}
            />
          {/if}
        </div>
      </div>

      <div class="inline-flex sm:space-x-1">
        {#if scrollY > 150}
          <div class="block sm:hidden">
            <SearchButton
              onClick={() => {
                scrollToTop()
                onSearchButtonClick()
              }}
            />
          </div>
        {/if}
        <CreatePlaylistButton />
        <ToggleModeButton />
        <GitHubButton />
      </div>
    </div>
  </nav>
{:else if version === 'channelPage'}
  <nav
    class="py-2.5 w-full h-[61px] bg-[#f8fafc] dark:bg-primary-850 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700"
    class:border-b={scrollY > 0}
  >
    <div class="flex justify-between items-center mx-auto px-3 w-full max-w-7xl">
      <div class="flex flex-start items-center sm:basis-120 shrink">
        <a href="/" class="pr-2" onclick={reset}>
          <Logo />
        </a>
        <div class="hidden sm:block w-full">
          <SearchField
            version="mini"
            onClear={reset}
            onSubmit={() => {
              goto(`/?q=${$query}`)
            }}
          />
        </div>
      </div>

      <div class="inline-flex sm:space-x-1">
        <div class="block sm:hidden">
          <SearchButton
            onClick={() => {
              goto('/')
            }}
          />
        </div>
        <ToggleModeButton />
        <GitHubButton />
      </div>
    </div>
  </nav>
{/if}

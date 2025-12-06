<script lang="ts">
  import { SvelteURLSearchParams } from 'svelte/reactivity'
  import { query, updateSearchResults } from '$lib/store'
  import { setSearchParam } from '$lib/navigation'
  import { SearchField } from '$lib/components'
  import { goto } from '$app/navigation'
  import { resolve } from '$app/paths'
  import * as NavBar from './'

  const { version = 'default', onSearchButtonClick = () => {} } = $props()

  let scrollY = $state(0)

  function scrollToTop() {
    document.body.scrollIntoView()
  }

  function reset() {
    scrollToTop()
    query.set('')
    setSearchParam('q', '')
    updateSearchResults()
  }

  let searchField: SearchField = $state()
  function focusOnInput() {
    if (searchField) searchField.focus()
  }

  const searchParams = $derived.by(() => {
    const _searchParams = new SvelteURLSearchParams()
    _searchParams.set('q', $query)

    return _searchParams
  })
</script>

<svelte:window bind:scrollY />

{#if version === 'default'}
  <nav
    class="py-2.5 w-full h-[61px] bg-[#f8fafc] dark:bg-primary-850 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700"
    class:border-b={scrollY > 0}
  >
    <div class="flex justify-between items-center mx-auto px-3 w-full max-w-7xl">
      <div class="flex flex-start items-center sm:basis-120 shrink">
        <a href={resolve('/')} class="pr-2" onclick={reset}>
          <NavBar.Logo />
        </a>
        <div class="hidden sm:block w-full">
          {#if scrollY > 150}
            <SearchField
              version="mini"
              bind:this={searchField}
              onClear={() => {
                query.set('')
                focusOnInput()
              }}
              onSubmit={() => {
                goto(`${resolve('/')}?${searchParams.toString()}`)
              }}
            />
          {/if}
        </div>
      </div>

      <div class="inline-flex sm:space-x-1">
        {#if scrollY > 150}
          <div class="block sm:hidden">
            <NavBar.SearchButton
              onClick={() => {
                scrollToTop()
                onSearchButtonClick()
              }}
            />
          </div>
        {/if}
        <NavBar.CreatePlaylistButton />
        <NavBar.ToggleModeButton />
        <NavBar.GitHubButton />
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
        <a href={resolve('/')} class="pr-2" onclick={reset}>
          <NavBar.Logo />
        </a>
        <div class="hidden sm:block w-full">
          <SearchField
            version="mini"
            onClear={reset}
            onSubmit={() => {
              goto(`${resolve('/')}?${searchParams.toString()}`)
            }}
          />
        </div>
      </div>

      <div class="inline-flex sm:space-x-1">
        <div class="block sm:hidden">
          <NavBar.SearchButton
            onClick={() => {
              goto(resolve('/'))
            }}
          />
        </div>
        <NavBar.ToggleModeButton />
        <NavBar.GitHubButton />
      </div>
    </div>
  </nav>
{/if}

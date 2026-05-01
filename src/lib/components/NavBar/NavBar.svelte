<script lang="ts">
  import { DEFAULT_QUERY } from '../../../constants'
  import { setSearchParam } from '$lib/navigation'
  import { SearchField } from '$lib/components'
  import { goto } from '$app/navigation'
  import { resolve } from '$app/paths'
  import { query } from '$lib/store'
  import * as NavBar from './'

  const { version = 'default', onSearchButtonClick = () => {} } = $props()

  let scrollY = $state(0)

  function scrollToTop() {
    document.body.scrollIntoView()
  }

  let searchField: SearchField = $state()
  function focusOnInput() {
    if (searchField) searchField.focus()
  }

  function clearQuery() {
    query.set('')
    focusOnInput()
  }

  function onLogoClick(event: MouseEvent) {
    event.preventDefault()
    setSearchParam('q', DEFAULT_QUERY + ' ')
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
        <a href={resolve('/')} class="pr-2" onclick={onLogoClick}>
          <NavBar.Logo />
        </a>
        <div class="hidden sm:block w-full">
          {#if scrollY > 150}
            <SearchField
              version="mini"
              bind:this={searchField}
              onClear={clearQuery}
              onSubmit={() => {
                setSearchParam('q', $query)
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
        <a href={resolve('/')} class="pr-2">
          <NavBar.Logo />
        </a>
        <div class="hidden sm:block w-full">
          <SearchField
            version="mini"
            onClear={clearQuery}
            onSubmit={() => {
              goto(`${resolve('/')}?q=${encodeURIComponent($query)}`)
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

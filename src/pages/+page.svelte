<script lang="ts">
  import { NavBar, BottomBar, CountryItem, SearchField, SearchSyntaxPopup } from '~/components'
  import { setPageTitle, setSearchParam } from '~/navigation'
  import { Collection } from '@freearhey/core/browser'
  import type { Context } from 'svelte-simple-modal'
  import { ApiClient, DataProcessor } from '~/core'
  import { afterNavigate } from '$app/navigation'
  import { onMount, getContext } from 'svelte'
  import { page } from '$app/state'
  import {
    searchResults,
    downloadMode,
    isSearching,
    countries,
    isLoading,
    channels,
    hasQuery,
    loadData,
    isReady,
    search,
    query
  } from '~/store'

  const { open } = getContext<Context>('simple-modal')

  let found = $channels.count()
  searchResults.subscribe((results: Collection) => {
    found = results.count()
  })

  onMount(async () => {
    if ($channels.isEmpty()) {
      const client = new ApiClient()
      const processor = new DataProcessor()
      await loadData({ client, processor })
    }

    isLoading.set(false)
    isSearching.set(true)
    setTimeout(() => {
      search($query)
    }, 0)
    isReady.set(true)
  })

  afterNavigate(() => {
    const q = page.url.searchParams.get('q')

    if (q) {
      query.set(q)
      hasQuery.set(true)
      setPageTitle(q)
    } else {
      hasQuery.set(false)
      setPageTitle(null)
    }

    if (!$isLoading) {
      isSearching.set(true)
      setTimeout(() => {
        search($query)
      }, 0)
    }
  })

  let scrollY = 0

  function showSearchSyntax() {
    open(
      SearchSyntaxPopup,
      {},
      { transitionBgProps: { duration: 0 }, transitionWindowProps: { duration: 0 } }
    )
  }

  let searchField: SearchField
  function focusOnSearchField() {
    if (searchField) searchField.focus()
  }

  function onSearch() {
    setSearchParam('q', $query)
    isSearching.set(true)
    setTimeout(() => {
      search($query)
    }, 0)
  }

  function resetSearch() {
    query.set('')
    focusOnSearchField()
  }
</script>

<svelte:window bind:scrollY />
<svelte:head>
  <title>iptv-org</title>
  <meta name="description" content="iptv-org is user editable database for TV channels" />
  <link rel="canonical" href="https://iptv-org.github.io/" />
</svelte:head>

<header
  class:absolute={scrollY <= 150}
  class:fixed={scrollY > 150}
  class="z-20 w-full min-w-[360px] flex items-center"
  style="top: {scrollY > 150 && scrollY <= 210 ? scrollY - 210 : 0}px"
>
  <NavBar onSearchButtonClick={focusOnSearchField} />
</header>

<main class="bg-slate-50 dark:bg-primary-850 min-h-screen min-w-[360px]">
  <section class="max-w-5xl mx-auto px-2 pt-16 sm:pt-20 pb-20 overflow-hidden min-h-full">
    <SearchField bind:this={searchField} onSubmit={onSearch} onClear={resetSearch} />
    <div class="pt-2 pb-6 flex justify-between px-1">
      <span class="inline-flex text-sm text-gray-500 dark:text-gray-400 font-mono pt-[2px]"
        >Found&nbsp;
        <span class:animate-spin={$isLoading}>{!$isLoading ? found.toLocaleString() : '/'}</span>
        &nbsp;channel(s)</span
      >
      <button
        type="button"
        on:click|preventDefault={showSearchSyntax}
        class="inline-flex text-sm text-gray-500 dark:text-gray-400 font-mono hover:underline hover:text-blue-500 dark:hover:text-blue-400 pt-[2px] cursor-pointer"
      >
        Search syntax
      </button>
    </div>
    {#if $isLoading}
      <div
        class="flex items-center justify-center w-full pt-1 pb-6 tracking-tight text-sm text-gray-500 dark:text-gray-400 font-mono"
      >
        loading...
      </div>
    {/if}
    {#each $countries.all() as country (country.code)}
      <CountryItem {country} />
    {/each}
  </section>
</main>

{#if $downloadMode}
  <BottomBar />
{/if}

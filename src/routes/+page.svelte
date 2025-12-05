<script lang="ts">
  import { NavBar, BottomBar, CountryList, SearchField, SearchSyntaxPopup } from '$lib/components'
  import store, { searchResults, query, downloadMode, updateSearchResults } from '$lib/store'
  import { setPageTitle, setSearchParam } from '$lib/navigation'
  import type { Context } from 'svelte-simple-modal'
  import { afterNavigate } from '$app/navigation'
  import { onMount, getContext } from 'svelte'
  import { Country } from '$lib/models'
  import { page } from '$app/state'
  import * as api from '$lib/api'

  const { open } = getContext<Context>('simple-modal')

  let countries: Country[] = $state([])
  let isLoading = $state(true)

  onMount(async () => {
    isLoading = true

    const data = await api.loadData()

    countries = data.countries

    store.init(data)

    isLoading = false

    updateSearchResults()
  })

  afterNavigate(() => {
    const searchQuery = page.url.searchParams.get('q')

    if (searchQuery) {
      query.set(decodeURIComponent(searchQuery))
      setPageTitle(searchQuery)
    } else {
      setPageTitle(null)
    }

    if (isLoading) return

    setTimeout(() => {
      updateSearchResults()
    }, 0)
  })

  let scrollY = $state(0)

  function showSearchSyntax(event) {
    event.preventDefault()
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
    updateSearchResults()
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
  <section class="max-w-[960px] mx-auto px-2 pt-16 sm:pt-20 pb-20 overflow-hidden min-h-full">
    <SearchField bind:this={searchField} onSubmit={onSearch} onClear={resetSearch} />
    <div class="pt-2 pb-6 flex justify-between px-1">
      <span class="inline-flex text-sm text-gray-500 dark:text-gray-400 font-mono pt-0.5"
        >Found&nbsp;
        <span class:animate-spin={isLoading}
          >{!isLoading ? $searchResults.length.toLocaleString() : '/'}</span
        >
        &nbsp;channel(s)</span
      >
      <button
        type="button"
        onclick={showSearchSyntax}
        class="inline-flex text-sm text-gray-500 dark:text-gray-400 font-mono hover:underline hover:text-blue-500 dark:hover:text-blue-400 pt-0.5 cursor-pointer"
      >
        Search syntax
      </button>
    </div>
    {#if isLoading}
      <div
        class="flex items-center justify-center w-full pt-1 pb-6 tracking-tight text-sm text-gray-500 dark:text-gray-400 font-mono"
      >
        loading...
      </div>
    {/if}
    <CountryList {countries} />
  </section>
</main>

{#if $downloadMode}
  <BottomBar />
{/if}

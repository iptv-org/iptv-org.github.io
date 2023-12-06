<script>
  import NavBar from '~/components/NavBar.svelte'
  import BottomBar from '~/components/BottomBar.svelte'
  import Modal from 'svelte-simple-modal'
  import { page } from '$app/stores'
  import {
    fetchChannels,
    channels,
    hasQuery,
    countries,
    filteredChannels,
    query,
    setSearchParam,
    setPageTitle,
    downloadMode,
    search
  } from '~/store'
  import { onMount, onDestroy } from 'svelte'
  import CountryItem from '~/components/CountryItem.svelte'
  import SearchField from '~/components/SearchField.svelte'
  import _ from 'lodash'
  import { afterNavigate } from '$app/navigation'

  let _countries = []
  let isLoading = true

  $: groupedByCountry = _.groupBy($filteredChannels, 'country')

  function loadMore({ detail }) {
    let { loaded, complete } = detail
    if (limit < _countries.length) {
      limit++
      loaded()
    } else {
      complete()
    }
  }

  onMount(async () => {
    if (!$channels.length) {
      await fetchChannels()
    }
    _countries = Object.values($countries)
    isLoading = false
    search($query)
  })

  afterNavigate(() => {
    const q = $page.url.searchParams.get('q')
    if (q) {
      setPageTitle(q)
      query.set(q)
      hasQuery.set(true)
    } else {
      setPageTitle(null)
      hasQuery.set(false)
    }
    search($query)
  })

  let scrollTop = 0
</script>

<svelte:window bind:scrollY={scrollTop} />
<svelte:head>
  <title>iptv-org</title>
  <meta name="description" content="iptv-org is user editable database for TV channels" />
</svelte:head>

<header
  class:absolute={scrollTop <= 150}
  class:fixed={scrollTop > 150}
  class="z-40 w-full min-w-[360px] flex items-center"
  style="top: {scrollTop > 150 && scrollTop <= 210 ? scrollTop - 210 : 0}px"
>
  <NavBar withSearch={scrollTop > 150} />
</header>

<main class="bg-slate-50 dark:bg-[#1d232e] min-h-screen min-w-[360px]">
  <Modal
    unstyled={true}
    classBg="fixed top-0 left-0 z-40 w-screen h-screen flex flex-col bg-black/[.7] overflow-y-auto"
    closeButton={false}
  >
    <section class="max-w-5xl mx-auto px-2 pt-24 sm:pt-32 pb-20 overflow-hidden min-h-full">
      <SearchField bind:isLoading bind:found={$filteredChannels.length}></SearchField>
      {#if isLoading}
        <div
          class="flex items-center justify-center w-full pt-1 pb-6 tracking-tight text-sm text-gray-500 dark:text-gray-400 font-mono"
        >
          loading...
        </div>
      {/if}
      {#each _countries as country (country.code)}
        {#if groupedByCountry[country.code] && groupedByCountry[country.code].length > 0}
          <CountryItem
            bind:country
            bind:channels={groupedByCountry[country.code]}
            bind:hasQuery={$hasQuery}
          ></CountryItem>
        {/if}
      {/each}
    </section>
  </Modal>
</main>

{#if $downloadMode}
  <BottomBar />
{/if}

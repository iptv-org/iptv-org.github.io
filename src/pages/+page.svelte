<script>
  import NavBar from '~/components/NavBar.svelte'
  import BottomBar from '~/components/BottomBar.svelte'
  import Modal from 'svelte-simple-modal'
  import { page } from '$app/stores'
  import InfiniteLoading from 'svelte-infinite-loading'
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
  const initLimit = 10
  let limit = initLimit
  let infiniteId = +new Date()
  let isLoading = true

  const unsubscribe = filteredChannels.subscribe(reset)
  onDestroy(unsubscribe)

  $: visible = _countries.slice(0, limit)

  $: grouped = _.groupBy($filteredChannels, 'country')

  function loadMore({ detail }) {
    let { loaded, complete } = detail
    if (limit < _countries.length) {
      limit++
      loaded()
    } else {
      complete()
    }
  }

  function reset() {
    infiniteId = +new Date()
    limit = initLimit
  }

  onMount(async () => {
    const params = new URLSearchParams(window.location.search)
    const q = params.get('q')
    if (q) {
      setPageTitle(q)
      query.set(q)
      hasQuery.set(true)
    }

    if (!$channels.length) {
      await fetchChannels()
    }
    _countries = Object.values($countries)
    isLoading = false

    if ($hasQuery) {
      search($query)
    }

    window.onpopstate = event => {
      const q = event.state.q
      if (q) {
        setPageTitle(q)
        query.set(q)
        hasQuery.set(true)
        search($query)
      } else {
        setPageTitle(null)
        hasQuery.set(false)
      }
    }
  })

  afterNavigate(() => {
    setSearchParam('q', $query)
    search($query)
  })

  let scrollTop = 0
</script>

<svelte:window bind:scrollY={scrollTop} />
<svelte:head>
  <title>iptv-org</title>
  <meta name="description" content="Collection of resources dedicated to IPTV" />
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
      {#each visible as country (country.code)}
        {#if grouped[country.code] && grouped[country.code].length > 0}
          <CountryItem bind:country bind:channels={grouped[country.code]} bind:hasQuery={$hasQuery}
          ></CountryItem>
        {/if}
      {/each}
      {#if !isLoading}
        <InfiniteLoading on:infinite={loadMore} identifier={infiniteId} distance={500}>
          <div slot="noResults"></div>
          <div slot="noMore"></div>
          <div slot="error"></div>
          <div slot="spinner"></div>
        </InfiniteLoading>
      {/if}
    </section>
  </Modal>
</main>

{#if $downloadMode}
  <BottomBar />
{/if}

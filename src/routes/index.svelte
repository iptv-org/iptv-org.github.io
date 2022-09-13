<script>
  import InfiniteLoading from 'svelte-infinite-loading'
  import {
    fetchChannels,
    hasQuery,
    countries,
    filteredChannels,
    query,
    search,
    setSearchParam,
    setPageTitle
  } from '../store.js'
  import { onMount, onDestroy } from 'svelte'
  import CountryItem from '../components/CountryItem.svelte'
  import SearchField from '../components/SearchField.svelte'
  import _ from 'lodash'

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

    await fetchChannels()
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
</script>

<svelte:head>
  <title>iptv-org</title>
  <meta name="description" content="Collection of resources dedicated to IPTV" />
</svelte:head>

<section class="container max-w-5xl mx-auto px-2 py-20">
  <SearchField bind:isLoading="{isLoading}" bind:found="{$filteredChannels.length}"></SearchField>
  {#if isLoading}
  <div
    class="flex items-center justify-center w-full pt-1 pb-6 tracking-tight text-sm text-gray-500 dark:text-gray-400 font-mono"
  >
    loading...
  </div>
  {/if} {#each visible as country (country.code)} {#if grouped[country.code] &&
  grouped[country.code].length > 0}
  <CountryItem
    bind:country="{country}"
    bind:channels="{grouped[country.code]}"
    bind:hasQuery="{$hasQuery}"
  ></CountryItem>
  {/if} {/each} {#if !isLoading}
  <InfiniteLoading on:infinite="{loadMore}" identifier="{infiniteId}" distance="{500}">
    <div slot="noResults"></div>
    <div slot="noMore"></div>
    <div slot="error"></div>
    <div slot="spinner"></div>
  </InfiniteLoading>
  {/if}
</section>

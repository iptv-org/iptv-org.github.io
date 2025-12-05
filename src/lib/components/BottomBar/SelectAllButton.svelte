<script lang="ts">
  import { IconButton } from '$lib/components'
  import type { Feed } from '$lib/models'
  import * as Icon from '$lib/icons'
  import {
    feeds,
    searchResultsKeyByChannel,
    selectedFeedsKeyByChannel,
    selectFeeds,
    deselectFeeds,
    searchResults,
    selectedFeeds
  } from '$lib/store'

  interface Props {
    variant?: string
  }

  const { variant = 'default' }: Props = $props()

  const selectableFeeds = $feeds.filter((feed: Feed) => feed.hasStreams())

  searchResults.subscribe(() => {
    updateState()
  })

  selectedFeeds.subscribe(() => {
    updateState()
  })

  let isLoading = $state(false)
  let isSelected = $state(false)
  function updateState() {
    setTimeout(() => {
      const selectedFeedsInSearchResults = selectableFeeds.filter(
        (feed: Feed) =>
          $searchResultsKeyByChannel.has(feed.channel) &&
          $selectedFeedsKeyByChannel.has(feed.channel)
      )
      const selectableFeedsInSearchResults = selectableFeeds.filter((feed: Feed) =>
        $searchResultsKeyByChannel.has(feed.channel)
      )
      isSelected =
        selectedFeedsInSearchResults.length > 0 &&
        selectedFeedsInSearchResults.length === selectableFeedsInSearchResults.length
    }, 0)
  }

  function selectAll() {
    isLoading = true
    setTimeout(() => {
      const selectableFeedsInSearchResults = selectableFeeds.filter((feed: Feed) =>
        $searchResultsKeyByChannel.has(feed.channel)
      )
      selectFeeds(selectableFeedsInSearchResults)
      isLoading = false
    }, 0)
  }

  function deselectAll() {
    isLoading = true
    setTimeout(() => {
      const selectableFeedsInSearchResults = selectableFeeds.filter((feed: Feed) =>
        $searchResultsKeyByChannel.has(feed.channel)
      )
      deselectFeeds(selectableFeedsInSearchResults)
      isLoading = false
    }, 0)
  }
</script>

{#if isLoading}
  <div class="h-10 w-10 flex items-center justify-center text-gray-100">
    <Icon.Spinner size={21} />
  </div>
{:else if isSelected}
  <IconButton onClick={deselectAll} aria-label="Deselect All" title="Deselect All" {variant}>
    <Icon.DeselectAll size={24} />
  </IconButton>
{:else}
  <IconButton onClick={selectAll} aria-label="Select All" title="Select All" {variant}>
    <Icon.SelectAll size={24} />
  </IconButton>
{/if}

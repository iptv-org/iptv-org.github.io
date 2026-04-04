<script lang="ts">
  import { IconButton } from '$lib/components'
  import type { Stream } from '$lib/models'
  import * as Icon from '$lib/icons'
  import {
    streams,
    searchResultsKeyByChannel,
    selectedStreamsKeyByChannel,
    selectStreams,
    deselectStreams,
    searchResults,
    selectedStreams
  } from '$lib/store'

  interface Props {
    variant?: string
  }

  const { variant = 'default' }: Props = $props()

  searchResults.subscribe(() => {
    updateState()
  })

  selectedStreams.subscribe(() => {
    updateState()
  })

  let isLoading = $state(false)
  let isSelected = $state(false)
  function updateState() {
    setTimeout(() => {
      const selectedStreamsInSearchResults = $streams.filter(
        (stream: Stream) =>
          $searchResultsKeyByChannel.has(stream.channel) &&
          $selectedStreamsKeyByChannel.has(stream.channel)
      )
      const selectableStreamsInSearchResults = $streams.filter((stream: Stream) =>
        $searchResultsKeyByChannel.has(stream.channel)
      )
      isSelected =
        selectedStreamsInSearchResults.length > 0 &&
        selectedStreamsInSearchResults.length === selectableStreamsInSearchResults.length
    }, 0)
  }

  function selectAll() {
    isLoading = true
    setTimeout(() => {
      const selectableStreamsInSearchResults = $streams.filter((stream: Stream) =>
        $searchResultsKeyByChannel.has(stream.channel)
      )
      selectStreams(selectableStreamsInSearchResults)
      isLoading = false
    }, 0)
  }

  function deselectAll() {
    isLoading = true
    setTimeout(() => {
      const selectableStreamsInSearchResults = $streams.filter((stream: Stream) =>
        $searchResultsKeyByChannel.has(stream.channel)
      )
      deselectStreams(selectableStreamsInSearchResults)
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

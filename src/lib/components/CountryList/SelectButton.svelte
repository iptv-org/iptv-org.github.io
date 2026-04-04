<script lang="ts">
  import type { Country, Stream } from '$lib/models'
  import { Checkbox } from '$lib/components'
  import {
    searchResultsKeyByChannel,
    selectedStreamsKeyByChannel,
    selectedStreams,
    deselectStreams,
    selectStreams,
    searchResults
  } from '$lib/store'

  interface Props {
    country: Country
  }

  const { country }: Props = $props()

  function getSelectableStreams() {
    return country.getStreams()
  }

  const selectableStreams = getSelectableStreams()

  searchResults.subscribe(() => {
    updateState()
  })

  selectedStreams.subscribe(() => {
    updateState()
  })

  let isSelected = $state(false)
  let isDisabled = $state(false)
  let isIndeterminate = $state(false)
  function updateState() {
    setTimeout(() => {
      const selectedStreamsInSearchResults = selectableStreams.filter(
        (stream: Stream) =>
          $searchResultsKeyByChannel.has(stream.channel) &&
          $selectedStreamsKeyByChannel.has(stream.channel)
      )
      const selectableStreamsInSearchResults = selectableStreams.filter((stream: Stream) =>
        $searchResultsKeyByChannel.has(stream.channel)
      )
      isSelected =
        selectedStreamsInSearchResults.count() > 0 &&
        selectedStreamsInSearchResults.count() === selectableStreamsInSearchResults.count()
      isIndeterminate = selectedStreamsInSearchResults.count() > 0
      isDisabled = selectableStreamsInSearchResults.isEmpty()
    }, 0)
  }

  function onCheckboxChange(selected: boolean) {
    const selectableStreamsInSearchResults = selectableStreams.filter((stream: Stream) =>
      $searchResultsKeyByChannel.has(stream.channel)
    )
    if (selected) {
      selectStreams(selectableStreamsInSearchResults.all())
    } else {
      deselectStreams(selectableStreams.all())
    }
  }
</script>

<Checkbox
  selected={isSelected}
  disabled={isDisabled}
  indeterminate={isIndeterminate}
  onChange={onCheckboxChange}
/>

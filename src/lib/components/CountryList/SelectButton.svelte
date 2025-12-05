<script lang="ts">
  import type { Country, Feed } from '$lib/models'
  import { Checkbox } from '$lib/components'
  import {
    searchResultsKeyByChannel,
    selectedFeedsKeyByChannel,
    deselectFeeds,
    searchResults,
    selectedFeeds,
    selectFeeds
  } from '$lib/store'

  interface Props {
    country: Country
  }

  const { country }: Props = $props()

  function getSelectableFeeds() {
    return country.getFeeds().filter((feed: Feed) => feed.hasStreams())
  }

  const selectableFeeds = getSelectableFeeds()

  searchResults.subscribe(() => {
    updateState()
  })

  selectedFeeds.subscribe(() => {
    updateState()
  })

  let isDisabled = $state(false)
  let isSelected = $state(false)
  let isIndeterminate = $state(false)
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
        selectedFeedsInSearchResults.count() > 0 &&
        selectedFeedsInSearchResults.count() === selectableFeedsInSearchResults.count()
      isIndeterminate = selectedFeedsInSearchResults.count() > 0
      isDisabled = selectableFeedsInSearchResults.isEmpty()
    }, 0)
  }

  function onCheckboxChange(selected: boolean) {
    const selectableFeedsInSearchResults = selectableFeeds.filter((feed: Feed) =>
      $searchResultsKeyByChannel.has(feed.channel)
    )
    if (selected) {
      selectFeeds(selectableFeedsInSearchResults.all())
    } else {
      deselectFeeds(selectableFeeds.all())
    }
  }
</script>

<Checkbox
  selected={isSelected}
  disabled={isDisabled}
  indeterminate={isIndeterminate}
  onChange={onCheckboxChange}
/>

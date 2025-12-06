<script lang="ts">
  import { selectFeeds, deselectFeeds, selectedFeeds } from '$lib/store'
  import { Checkbox } from '$lib/components'
  import type { Feed } from '$lib/models'

  interface Props {
    feed: Feed
  }

  const { feed }: Props = $props()

  function hasStreams() {
    return feed.hasStreams()
  }

  let isSelected = $state(false)
  const isDisabled = !hasStreams()
  function updateState() {
    setTimeout(() => {
      isSelected = $selectedFeeds.has(feed)
    }, 0)
  }

  selectedFeeds.subscribe(() => {
    updateState()
  })

  function onCheckboxChange(selected: boolean) {
    if (selected) {
      selectFeeds([feed])
    } else {
      deselectFeeds([feed])
    }
  }
</script>

<Checkbox selected={isSelected} disabled={isDisabled} onChange={onCheckboxChange} />

<script lang="ts">
  import { selectFeeds, deselectFeeds, selectedFeeds } from '$lib/store'
  import type { Feed } from '$lib/models'
  import { Checkbox } from '$lib/components'

  interface Props {
    feed: Feed
  }

  const { feed }: Props = $props()

  let isSelected = $state(false)
  const isDisabled = !feed.hasStreams()
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

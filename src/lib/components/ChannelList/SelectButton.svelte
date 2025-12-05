<script lang="ts">
  import { selectFeeds, deselectFeeds, selectedFeeds } from '$lib/store'
  import type { Channel, Feed } from '$lib/models'
  import { Checkbox } from '$lib/components'

  interface Props {
    channel: Channel
  }

  const { channel }: Props = $props()

  function getSelectableFeeds() {
    return channel.getFeeds().filter((feed: Feed) => feed.hasStreams())
  }

  const selectableFeeds = getSelectableFeeds()

  let isSelected = $state(false)
  let isDisabled = $state(false)
  let isIndeterminate = $state(false)
  function updateState() {
    setTimeout(() => {
      const selectedChannelFeeds = Array.from($selectedFeeds).filter(
        (feed: Feed) => feed.channel === channel.id
      )
      isSelected = selectedChannelFeeds.length === selectableFeeds.count()
      isIndeterminate = selectedChannelFeeds.length > 0
      isDisabled = selectableFeeds.isEmpty()
    }, 0)
  }

  selectedFeeds.subscribe(() => {
    updateState()
  })

  function onCheckboxChange(selected: boolean) {
    if (selected) {
      selectFeeds(selectableFeeds.all())
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

<script lang="ts">
  import { selectStreams, deselectStreams, selectedStreams } from '$lib/store'
  import type { Feed, Stream } from '$lib/models'
  import { Checkbox } from '$lib/components'

  interface Props {
    feed: Feed
  }

  const { feed }: Props = $props()

  function getSelectableStreams() {
    return feed.getStreams()
  }

  const selectableStreams = getSelectableStreams()

  let isSelected = $state(false)
  let isDisabled = $state(false)
  let isIndeterminate = $state(false)
  function updateState() {
    setTimeout(() => {
      const selectedFeedStreams = Array.from($selectedStreams).filter(
        (stream: Stream) => stream.getId() === feed.getStreamId()
      )
      isSelected = selectedFeedStreams.length === selectableStreams.count()
      isIndeterminate = selectedFeedStreams.length > 0
      isDisabled = selectableStreams.isEmpty()
    }, 0)
  }

  selectedStreams.subscribe(() => {
    updateState()
  })

  function onCheckboxChange(selected: boolean) {
    if (selected) {
      selectStreams(selectableStreams.all())
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

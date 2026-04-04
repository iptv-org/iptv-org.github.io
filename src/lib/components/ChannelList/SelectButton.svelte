<script lang="ts">
  import { selectStreams, deselectStreams, selectedStreams } from '$lib/store'
  import type { Channel, Stream } from '$lib/models'
  import { Checkbox } from '$lib/components'

  interface Props {
    channel: Channel
  }

  const { channel }: Props = $props()

  function getSelectableStreams() {
    return channel.getStreams()
  }

  const selectableStreams = getSelectableStreams()

  let isSelected = $state(false)
  let isDisabled = $state(false)
  let isIndeterminate = $state(false)
  function updateState() {
    setTimeout(() => {
      const selectedChannelStreams = Array.from($selectedStreams).filter(
        (stream: Stream) => stream.channel === channel.id
      )
      isSelected = selectedChannelStreams.length === selectableStreams.count()
      isIndeterminate = selectedChannelStreams.length > 0
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

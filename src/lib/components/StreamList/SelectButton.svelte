<script lang="ts">
  import { selectStreams, deselectStreams, selectedStreams } from '$lib/store'
  import { Checkbox } from '$lib/components'
  import type { Stream } from '$lib/models'

  interface Props {
    stream: Stream
  }

  const { stream }: Props = $props()

  let isSelected = $state(false)
  function updateState() {
    setTimeout(() => {
      isSelected = $selectedStreams.has(stream)
    }, 0)
  }

  selectedStreams.subscribe(() => {
    updateState()
  })

  function onCheckboxChange(selected: boolean) {
    if (selected) {
      selectStreams([stream])
    } else {
      deselectStreams([stream])
    }
  }
</script>

<Checkbox selected={isSelected} onChange={onCheckboxChange} />

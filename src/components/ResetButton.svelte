<script lang="ts">
  import { Collection } from '@freearhey/core/browser'
  import IconButton from './IconButton.svelte'
  import { selected } from '~/store'
  import * as Icon from '~/icons'

  export let variant = 'default'

  let isAnySelected = true

  selected.subscribe((_selected: Collection) => {
    isAnySelected = _selected.notEmpty()
  })

  function reset() {
    selected.set(new Collection())
  }
</script>

{#if isAnySelected}
  <IconButton onClick={reset} aria-label="Reset" title="Reset" {variant}>
    <Icon.Reset size={24} />
  </IconButton>
{/if}

<script lang="ts">
  import { IconButton } from '$lib/components'
  import { clickOutside } from '$lib/actions'
  import type { Snippet } from 'svelte'
  import * as Icon from '$lib/icons'

  interface Props {
    variant?: string
    children?: Snippet
  }

  const { variant = 'default', children }: Props = $props()

  let isOpen = $state(false)
  function toggleMenu() {
    isOpen = !isOpen
  }

  export function close() {
    isOpen = false
  }
</script>

<div class="relative" use:clickOutside={close}>
  <IconButton onClick={toggleMenu} aria-label="Menu" title="Menu" {variant}>
    <Icon.Menu size={16} />
  </IconButton>

  {#if isOpen}
    <div
      class="rounded-md bg-white dark:bg-primary-810 absolute top-10 right-0 w-48 z-10 p-1 border border-gray-200 dark:border-primary-750"
    >
      {@render children?.()}
    </div>
  {/if}
</div>

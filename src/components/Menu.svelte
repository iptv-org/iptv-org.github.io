<script lang="ts">
  import IconButton from '~/components/IconButton.svelte'
  import { clickOutside } from '~/actions'
  import * as Icon from '~/icons'

  export let isOpened = false

  function toggleMenu() {
    isOpened = !isOpened
  }

  function closeMenu() {
    isOpened = false
  }
</script>

<div class="relative" use:clickOutside on:outside={closeMenu}>
  <IconButton onClick={toggleMenu} aria-label="Menu" title="Menu">
    <Icon.Menu size={16} />
  </IconButton>

  {#if isOpened}
    <div
      class="rounded-md bg-white dark:bg-primary-810 absolute top-10 right-0 w-48 z-10 p-1 border border-gray-200 dark:border-primary-750"
    >
      <slot />
    </div>
  {/if}
</div>

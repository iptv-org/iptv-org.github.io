<script>
  import OutlineButton from '~/components/OutlineButton.svelte'
  import { selected, filteredChannels } from '~/store'

  $: isAllSelected = $selected.length === $filteredChannels.length

  function selectAll() {
    selected.set($filteredChannels)
  }

  function deselectAll() {
    selected.set([])
  }
</script>

{#if isAllSelected}
  <OutlineButton on:click={deselectAll} aria-label="Deselect All ({$selected.length})">
    <span class="text-gray-500 dark:text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-5 h-5"
      >
        <path
          fill-rule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
    <span class="hidden md:inline">Deselect All ({$selected.length})</span>
  </OutlineButton>
{:else}
  <OutlineButton on:click={selectAll} aria-label="Select All ({$filteredChannels.length})">
    <span class="text-gray-500 dark:text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-5 h-5"
      >
        <path
          fill-rule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clip-rule="evenodd"
        />
      </svg>
    </span>

    <span class="hidden md:inline">Select All ({$filteredChannels.length})</span>
  </OutlineButton>
{/if}

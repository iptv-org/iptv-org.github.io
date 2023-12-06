<script>
  import OutlineButton from '~/components/OutlineButton.svelte'
  import { selected, filteredChannels, channels } from '~/store'

  $: hasStreams = $channels.filter(c => c.streams > 0)
  $: isAllSelected = $selected.length === hasStreams.length

  function selectAll() {
    selected.set(hasStreams)
  }

  function deselectAll() {
    selected.set([])
  }
</script>

{#if isAllSelected}
  <OutlineButton on:click={deselectAll} aria-label="Deselect All">
    <span class="text-gray-500 dark:text-white">
      <svg
        fill="currentColor"
        class="w-5 h-5"
        clip-rule="evenodd"
        fill-rule="evenodd"
        stroke-linejoin="round"
        stroke-miterlimit="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          d="m17.5 11c2.484 0 4.5 2.016 4.5 4.5s-2.016 4.5-4.5 4.5-4.5-2.016-4.5-4.5 2.016-4.5 4.5-4.5zm-5.979 5c.043.522.153 1.025.321 1.5h-9.092c-.414 0-.75-.336-.75-.75s.336-.75.75-.75zm7.979-1c-.592 0-3.408 0-4 0-.265 0-.5.235-.5.5s.235.5.5.5h4c.265 0 .5-.235.5-.5s-.235-.5-.5-.5zm-6.873-3c-.328.456-.594.96-.785 1.5h-9.092c-.414 0-.75-.336-.75-.75s.336-.75.75-.75zm7.373-3.25c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z"
          fill-rule="nonzero"
        /></svg
      >
    </span>
    <span class="hidden md:inline">Deselect All</span>
  </OutlineButton>
{:else}
  <OutlineButton on:click={selectAll} aria-label="Select All">
    <span class="text-gray-500 dark:text-white">
      <svg
        fill="currentColor"
        class="w-5 h-5"
        clip-rule="evenodd"
        fill-rule="evenodd"
        stroke-linejoin="round"
        stroke-miterlimit="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          d="m17.5 11c2.484 0 4.5 2.016 4.5 4.5s-2.016 4.5-4.5 4.5-4.5-2.016-4.5-4.5 2.016-4.5 4.5-4.5zm-5.979 5c.043.522.153 1.025.321 1.5h-9.092c-.414 0-.75-.336-.75-.75s.336-.75.75-.75zm3.704-.024 1.442 1.285c.095.085.215.127.333.127.136 0 .271-.055.37-.162l2.441-2.669c.088-.096.131-.217.131-.336 0-.274-.221-.499-.5-.499-.136 0-.271.055-.37.162l-2.108 2.304-1.073-.956c-.096-.085-.214-.127-.333-.127-.277 0-.5.224-.5.499 0 .137.056.273.167.372zm-2.598-3.976c-.328.456-.594.96-.785 1.5h-9.092c-.414 0-.75-.336-.75-.75s.336-.75.75-.75zm7.373-3.25c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z"
          fill-rule="nonzero"
        /></svg
      >
    </span>

    <span class="hidden md:inline">Select All</span>
  </OutlineButton>
{/if}

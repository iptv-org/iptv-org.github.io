<script>
  import { downloadMode } from '~/store'
  import OutlineButton from '~/components/OutlineButton.svelte'
  import ActionButton from '~/components/ActionButton.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
</script>

<ActionButton
  active={$downloadMode}
  on:click={() => {
    downloadMode.set(!$downloadMode)
    dispatch('click')
  }}
  aria-label="Create Playlist"
>
  <span class="inline">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 512 512"
      ><path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="48"
        d="M160 144h288M160 256h288M160 368h288"
      /><circle
        cx="80"
        cy="144"
        r="16"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
      /><circle
        cx="80"
        cy="256"
        r="16"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
      /><circle
        cx="80"
        cy="368"
        r="16"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
      /></svg
    >
  </span><span class="hidden md:inline">Create Playlist</span>
</ActionButton>

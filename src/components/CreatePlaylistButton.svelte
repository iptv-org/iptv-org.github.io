<script>
  import { downloadMode } from '~/store'
  import DefaultButton from '~/components/DefaultButton.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
</script>

<div class="w-14 sm:w-40">
  {#if $downloadMode}
  <DefaultButton on:click="{() => {downloadMode.set(false);dispatch('click')}}" area-label="Done">
    <span class="sm:hidden inline">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-5 h-5"
      >
        <path
          fill-rule="evenodd"
          d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5zm6.61 10.936a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clip-rule="evenodd"
        />
        <path
          d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z"
        />
      </svg>
    </span>

    <span class="hidden sm:inline">Done</span>
  </DefaultButton>

  {:else}
  <button
    class="rounded-md bg-accent-500 hover:bg-accent-600 transition-colors duration-200 text-sm text-white font-semibold text-center px-4 h-10 flex items-center w-full justify-center"
    on:click="{() => {downloadMode.set(true);dispatch('click')}}"
    area-label="Create Playlist"
  >
    <span class="sm:hidden inline">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-5 h-5"
      >
        <path
          fill-rule="evenodd"
          d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM12.75 12a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V18a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V12z"
          clip-rule="evenodd"
        />
        <path
          d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z"
        /></svg></span
    ><span class="hidden sm:inline">Create Playlist</span>
  </button>
  {/if}
</div>

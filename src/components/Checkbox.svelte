<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let selected = false
  export let indeterminate = false

  function toggle(state) {
    dispatch('change', { state })
  }
</script>

{#if selected}
  <button
    class="w-12 h-12 rounded-full text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 flex items-center justify-center"
    aria-label="Unselect"
    on:click={() => toggle(false)}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
      <path
        fill-rule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
{:else if indeterminate}
  <button
    class="w-12 h-12 rounded-full text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 flex items-center justify-center"
    aria-label="Unselect"
    on:click={() => toggle(false)}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
      <path
        fill-rule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
{:else}
  <button
    class="w-12 h-12 rounded-full text-gray-200 hover:text-gray-400 dark:text-gray-700 dark:hover:text-gray-600 transition-colors duration-200 flex items-center justify-center"
    aria-label="Select"
    on:click={() => toggle(true)}
  >
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6"
      stroke="currentColor"
      stroke-width="1.5"
    >
      <circle cx="12" cy="12" r="10" fill="none" />
    </svg>
  </button>
{/if}

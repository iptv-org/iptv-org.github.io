<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  let expanded = false
</script>

<button
  class="w-7 h-7 flex justify-center align-middle text-gray-500 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-600 shrink-0 items-center"
  on:click={() => {
    expanded = !expanded
    dispatch('click', { state: expanded })
  }}
  aria-label={expanded ? 'Collapse' : 'Expand'}
>
  <svg
    class="w-4 h-4"
    class:rotate-90={expanded}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
  </svg>
</button>

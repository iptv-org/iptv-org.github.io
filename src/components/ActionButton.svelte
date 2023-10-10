<script>
  export let disabled = false
</script>

<button
  {...$$restProps}
  class="rounded-md transition-colors duration-200 border border-transparent text-white text-sm font-semibold text-center px-4 h-10 flex items-center justify-center space-x-3 shrink-0 min-w-14 w-auto"
  class:bg-gray-200={disabled}
  class:bg-primary-600={!disabled}
  class:dark:bg-gray-700={disabled}
  class:dark:hover:bg-primary-500={!disabled}
  class:hover:bg-gray-200={disabled}
  class:hover:bg-primary-700={!disabled}
  class:pointer-events-none={disabled}
  on:click
>
  <slot />
</button>

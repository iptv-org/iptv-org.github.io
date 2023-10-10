<script>
  export let disabled = false
  export let active = false
</script>

<button
  {...$$restProps}
  class="rounded-md transition-colors duration-200 border border-transparent text-white text-sm font-semibold text-center h-10 flex items-center justify-center space-x-3 px-4"
  class:bg-gray-200={disabled || active}
  class:bg-primary-600={!disabled && !active}
  class:dark:bg-gray-700={disabled || active}
  class:dark:hover:bg-primary-500={!disabled && !active}
  class:dark:hover:bg-gray-700={active}
  class:hover:bg-gray-200={disabled || active}
  class:hover:bg-primary-700={!disabled && !active}
  class:pointer-events-none={disabled}
  on:click
>
  <slot />
</button>

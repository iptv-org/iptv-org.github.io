<script lang="ts">
  export let label = 'Button'
  export let onClick = () => {}
</script>

<button
  type="button"
  onclick={onClick}
  class="w-full text-left rounded-md text-sm h-10 flex items-center text-gray-500 dark:text-gray-400 font-normal hover:bg-gray-100 dark:hover:bg-primary-750 space-x-3 px-2 border border-transparent cursor-pointer"
  {...$$restProps}
>
  <div class="w-5 h-5 flex items-center justify-center">
    <slot name="left" />
  </div>
  <div class="w-full">{label}</div>
  <div>
    <slot name="right" />
  </div>
</button>

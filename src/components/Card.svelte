<script>
  export let border = false

  let className = 'rounded-md bg-white dark:bg-primary-810'
  if (border) className += ' border border-gray-200 dark:border-gray-700'
</script>

<div class={className}>
  <div class="flex justify-between items-center pt-2 sm:pt-2.5 pl-4 pr-2.5 rounded-t w-full">
    <slot name="headerLeft" />
    <slot name="headerRight" />
  </div>
  <div>
    <slot name="body" />
  </div>
</div>

<script>
  export let onClick = () => {}
  export let variant = 'default'
  export let size = 40

  let className = 'rounded-lg text-sm flex items-center justify-center cursor-pointer shrink-0'
  if (variant === 'light') className += ' hover:bg-primary-810 text-gray-300'
  else className += ' hover:bg-gray-100 dark:hover:bg-primary-750 text-gray-400'
</script>

<button
  type="button"
  class={className}
  style:width={`${size}px`}
  style:height={`${size}px`}
  onclick={onClick}
  {...$$restProps}
>
  <slot />
</button>

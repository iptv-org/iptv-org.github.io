<script>
  export let onClick = () => {}
  export let variant = 'default'
  export let size = 40

  let className =
    'rounded-lg text-sm flex items-center justify-center cursor-pointer shrink-0 text-gray-400'
  if (variant === 'dark') className += ' hover:bg-primary-750'
  else if (variant === 'light') className += ' hover:bg-gray-100'
  else if (variant === 'overlay') className += ' hover:bg-white/10'
  else className += ' hover:bg-gray-100 dark:hover:bg-primary-750'
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

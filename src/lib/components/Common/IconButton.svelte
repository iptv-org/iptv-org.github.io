<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'

  type Props = {
    variant?: string
    size?: number
    onClick?: () => void
    children?: Snippet
  } & HTMLButtonAttributes

  const {
    variant = 'default',
    size = 40,
    onClick = () => {},
    children,
    ...restProps
  }: Props = $props()

  function getClasses() {
    let classes =
      'rounded-lg text-sm flex items-center justify-center cursor-pointer shrink-0 text-gray-400'

    if (variant === 'dark') classes += ' hover:bg-primary-750'
    else if (variant === 'light') classes += ' hover:bg-gray-100'
    else if (variant === 'overlay') classes += ' hover:bg-white/10'
    else classes += ' hover:bg-gray-100 dark:hover:bg-primary-750'

    return classes
  }
</script>

<button
  {...restProps}
  type="button"
  class={getClasses()}
  style:width={`${size}px`}
  style:height={`${size}px`}
  onclick={onClick}
>
  {@render children?.()}
</button>

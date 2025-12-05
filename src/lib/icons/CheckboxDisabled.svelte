<script lang="ts">
  interface Props {
    size: number
  }

  let { size, ...restProps }: Props = $props()
</script>

<svg
  {...restProps}
  width={size}
  height={size}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <circle cx="12" cy="12" r="3" />
</svg>

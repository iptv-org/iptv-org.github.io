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
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  stroke="currentColor"
  stroke-width="1.5"
>
  <circle cx="12" cy="12" r="10" fill="none" />
</svg>

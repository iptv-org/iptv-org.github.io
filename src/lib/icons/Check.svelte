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
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M4 12.6111L8.92308 17.5L20 6.5"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>

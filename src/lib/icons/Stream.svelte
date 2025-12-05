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
    d="M3 15.1001C3.96089 15.2961 4.84294 15.7703 5.53638 16.4637C6.22982 17.1572 6.70403 18.0392 6.9 19.0001M3 19H3.01M3 11.0498C5.03079 11.2757 6.92428 12.1859 8.36911 13.6307C9.81395 15.0755 10.7241 16.969 10.95 18.9998M15 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H5C3.89543 5 3 5.89543 3 7"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>

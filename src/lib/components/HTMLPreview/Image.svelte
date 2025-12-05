<script lang="ts">
  import type { HTMLPreviewImage } from './types'

  interface Props {
    value: HTMLPreviewImage
  }

  const { value }: Props = $props()
</script>

<img
  src={value.src}
  alt={value.alt}
  title={value.title}
  referrerpolicy="no-referrer"
  class="border rounded-sm overflow-hidden border-gray-200 bg-[#e6e6e6]"
/>

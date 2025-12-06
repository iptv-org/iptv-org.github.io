<script lang="ts">
  import { HTMLPreview, LogoMenu } from '$lib/components'
  import { Logo } from '$lib/models'

  interface Props {
    logo: Logo
  }

  let { logo }: Props = $props()
</script>

<div class="w-full rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 relative">
  <div
    class="flex justify-center overflow-hidden items-center rounded-t-sm min-h-34 bg-white dark:bg-primary-810"
  >
    <div class="flex bg-white">
      <img
        src={logo.url}
        alt={logo.url}
        title={logo.url}
        referrerpolicy="no-referrer"
        class="bg-gray-100 text-sm text-gray-400 dark:text-gray-600"
        width={logo.width || ''}
        height={logo.height || ''}
      />
    </div>
    <div class="absolute top-1.5 right-1.5">
      <LogoMenu {logo} />
    </div>
  </div>
  <div class="w-full flex px-6 pt-4 pb-2 border-t border-gray-200 dark:border-gray-700">
    <HTMLPreview fieldset={logo.getFieldset()} />
  </div>
</div>

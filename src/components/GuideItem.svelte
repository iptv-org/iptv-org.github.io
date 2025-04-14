<script lang="ts">
  import { Guide } from '~/models'
  import * as Icon from '~/icons'

  export let guide: Guide
</script>

<div
  class="w-full inline-flex justify-between px-4 border-b-[1px] border-gray-200 dark:border-gray-700 last:border-0"
>
  <div class="flex space-x-4 items-center w-full min-h-11 py-3">
    <div class="text-gray-400 w-8 text-sm">{guide.languageCode}</div>
    <a
      class="whitespace-nowrap text-sm text-gray-600 dark:text-gray-100 hover:text-blue-500 hover:underline inline-flex align-middle max-w-[50%] w-full items-center space-x-1"
      href={guide.getUrl()}
      title={guide.getUrl()}
      target="_blank"
      rel="noreferrer"
    >
      <span class="truncate">{guide.siteDomain}</span><span
        class="text-sm text-gray-400 dark:text-gray-500"
      >
        <Icon.ExternalLink size={16} />
      </span></a
    >
    <div class="text-right text-gray-400 text-sm w-full" title={guide.siteId}>
      {guide.siteName}
    </div>
  </div>
</div>

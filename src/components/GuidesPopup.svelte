<script lang="ts">
  import { CloseButton, GuideItem, Popup, Card } from '~/components'
  import type { Context } from 'svelte-simple-modal'
  import type { Feed } from '~/models'
  import { getContext } from 'svelte'
  import * as Icon from '~/icons'

  export let feed: Feed
  export let title = 'Guides'

  const { close } = getContext<Context>('simple-modal')
</script>

<Popup onClose={() => close()} wrapperClass="flex justify-center p-2 pt-16 sm:py-44 z-50">
  <Card>
    <div
      slot="headerLeft"
      class="text-l font-medium text-gray-800 dark:text-white inline-flex items-center"
    >
      <span
        class="inline-flex items-center pr-2 text-sm font-semibold text-gray-500 dark:text-gray-100 rounded-full"
      >
        <Icon.Guide size={20} />
      </span>
      <span>{title}</span>
    </div>
    <div slot="headerRight">
      <CloseButton onClick={() => close()} />
    </div>
    <div slot="body" class="p-2 sm:p-5 w-full">
      <div class="dark:border-gray-700 rounded-md border border-gray-200">
        {#each feed.getGuides().all() as guide}
          <GuideItem {guide} />
        {/each}
      </div>
    </div>
  </Card>
</Popup>

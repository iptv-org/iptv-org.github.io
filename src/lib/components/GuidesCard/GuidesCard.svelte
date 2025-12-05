<script lang="ts">
  import { CloseButton, GuideList, Card } from '$lib/components'
  import type { Feed } from '$lib/models'
  import * as Icon from '$lib/icons'

  interface Props {
    feed: Feed
    onClose?: () => void
  }

  const { feed, onClose = () => {} }: Props = $props()

  function getGuides() {
    return feed.getGuides()
  }
</script>

<Card>
  {#snippet headerLeft()}
    <div class="text-l font-medium text-gray-800 dark:text-white inline-flex items-center">
      <span
        class="inline-flex items-center pr-2 text-sm font-semibold text-gray-500 dark:text-gray-100 rounded-full"
      >
        <Icon.Guide size={20} />
      </span>
      <span>Guides</span>
    </div>
  {/snippet}
  {#snippet headerRight()}
    <div>
      <CloseButton onClick={onClose} />
    </div>
  {/snippet}
  {#snippet body()}
    <div class="p-2 sm:p-5 w-full">
      <div class="dark:border-gray-700 rounded-md border border-gray-200">
        <GuideList guides={getGuides()} />
      </div>
    </div>
  {/snippet}
</Card>

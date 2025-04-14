<script lang="ts">
  import { CloseButton, StreamItem, Popup, Card } from '~/components'
  import { Collection } from '@freearhey/core/browser'
  import type { Context } from 'svelte-simple-modal'
  import { getContext } from 'svelte'
  import * as Icon from '~/icons'

  export let streams: Collection = new Collection()
  export let title = 'Streams'

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
        <Icon.Stream size={21} />
      </span>{title}
    </div>
    <div slot="headerRight">
      <CloseButton onClick={() => close()} />
    </div>
    <div slot="body" class="flex flex-col gap-2 p-2 sm:p-5">
      {#each streams.all() as stream, index (stream.getUUID())}
        <StreamItem {stream} />
      {/each}
    </div>
  </Card>
</Popup>

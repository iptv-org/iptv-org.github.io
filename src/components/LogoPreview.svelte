<script lang="ts">
  import type { Context } from 'svelte-simple-modal'
  import type { Channel, Feed } from '~/models'
  import { LogosPopup } from '~/components'
  import { getContext } from 'svelte'
  import * as Icon from '~/icons'

  export let channel: Channel
  export let feed: Feed = undefined

  const hasLogo = feed ? feed.hasLogo() : channel.hasLogo()
  const displayName = feed ? feed.getDisplayName() : channel.getDisplayName()
  const logoUrl = feed ? feed.getLogoUrl() : channel.getLogoUrl()

  const { open } = getContext<Context>('simple-modal')

  function showLogos() {
    open(
      LogosPopup,
      { channel, feed },
      { transitionBgProps: { duration: 0 }, transitionWindowProps: { duration: 0 } }
    )
  }
</script>

{#if hasLogo}
  <div class="w-full justify-center items-center flex h-34 relative">
    <button
      onclick={showLogos}
      class="cursor-pointer h-34 w-full relative flex justify-center items-center"
      title="Logos"
    >
      <img
        src={logoUrl}
        alt={`${displayName} logo`}
        title={logoUrl}
        referrerpolicy="no-referrer"
        class="bg-gray-100 text-sm text-gray-400 dark:text-gray-600 max-h-full max-w-full rounded-sm overflow-hidden"
      />
    </button>
    <div class="absolute bottom-1 right-1 pointer-events-none">
      <Icon.Open size={20} class="text-gray-400" />
    </div>
  </div>
{/if}

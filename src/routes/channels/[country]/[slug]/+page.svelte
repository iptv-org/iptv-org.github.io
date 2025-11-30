<script lang="ts">
  import { NavBar, FeedsCard, ChannelCard } from '$lib/components'
  import type { Channel } from '$lib/models'

  interface Props {
    data: {
      channel: Channel
    }
  }

  const { data }: Props = $props()

  const { channel } = data

  /* eslint-disable-next-line */
  const schema = `<script type="application/ld+json">${JSON.stringify(channel.getStructuredData())}<\/script>`
</script>

<svelte:head>
  <title>{channel ? `${channel.getUniqueName()} • iptv-org` : 'iptv-org'}</title>
  <meta
    name="description"
    content="Detailed description of {channel ? channel.getUniqueName() : ''}."
  />

  {@html schema}
</svelte:head>

<header class="fixed z-40 w-full min-w-[360px] top-0">
  <NavBar version="channelPage" />
</header>

<main class="bg-slate-50 dark:bg-primary-850 min-h-screen min-w-[360px] pt-16">
  <section class="container max-w-3xl mx-auto px-2 pt-1 sm:pt-6 pb-20 flex-col space-y-4">
    <ChannelCard {channel} variant="channelPage" />
    {#if channel.getFeeds().isNotEmpty()}
      <FeedsCard {channel} variant="channelPage" />
    {/if}
  </section>
</main>

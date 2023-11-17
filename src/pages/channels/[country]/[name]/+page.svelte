<script>
  import GuideItem from '~/components/GuideItem.svelte'
  import StreamItem from '~/components/StreamItem.svelte'
  import HTMLPreview from '~/components/HTMLPreview.svelte'
  import EditButton from '~/components/EditButton.svelte'
  import NavBar from '~/components/NavBar.svelte'

  export let data

  let isLoading = false
  let channel = data.channel
  let streams = channel ? channel._streams : []
  let guides = channel ? channel._guides : []

  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'TelevisionChannel',
    image: channel.logo,
    identifier: channel.id,
    name: channel.name,
    alternateName: channel.alt_names.map(value => ({ '@value': value })),
    genre: channel._categories.map(category => ({ '@value': category.name })),
    sameAs: channel.website
  }
  const schema = () => {
    return `<script type="application/ld+json">${JSON.stringify(structuredData)}<\/script>`
  }
</script>

<svelte:head>
  <title>{channel && channel.displayName ? `${channel.displayName} • iptv-org` : 'iptv-org'}</title>
  <meta name="description" content="Detailed description of {channel.displayName}." />
  {@html schema()}
</svelte:head>

<header class="fixed z-40 w-full min-w-[360px] top-0">
  <NavBar withSearch />
</header>

<main class="bg-slate-50 dark:bg-[#1d232e] min-h-screen min-w-[360px] pt-16">
  <section class="container max-w-[820px] mx-auto px-2 pt-6 pb-20 flex-col space-y-4">
    {#if isLoading}
      <div
        class="flex items-center justify-center w-full pt-1 pb-6 tracking-tight text-sm text-gray-500 dark:text-gray-400 font-mono"
      >
        loading...
      </div>
    {/if}
    {#if channel}
      <div class="border rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-white">
        <div
          class="flex justify-between items-center py-3 pl-5 pr-4 rounded-t border-b dark:border-gray-700"
        >
          <div class="w-2/3 overflow-hidden">
            <div class="flex space-x-3">
              <h1 class="text-l font-medium text-gray-900 dark:text-white">
                {channel.displayName}
              </h1>
              <div class="flex items-center space-x-2">
                {#if channel.is_closed}
                  <div
                    class="text-gray-500 border-[1px] border-gray-200 text-xs inline-flex items-center px-2.5 py-0.5 dark:text-gray-300 cursor-default rounded-full h-6"
                    title="closed: {channel.closed}"
                  >
                    Closed
                  </div>
                {/if}
                {#if channel.is_blocked}
                  <div
                    class="text-gray-500 border-[1px] border-gray-200 text-xs inline-flex items-center px-2.5 py-0.5 dark:text-gray-300 cursor-default rounded-full h-6"
                    title="The channel has been added to our blocklist due to the claim of the copyright holder"
                  >
                    Blocked
                  </div>
                {/if}
              </div>
            </div>
          </div>
          <div class="inline-flex w-1/3 justify-end space-x-3">
            <EditButton {channel} />
          </div>
        </div>
        <div class="overflow-y-auto overflow-x-hidden w-full p-10">
          <HTMLPreview data={channel} />
        </div>
      </div>
    {/if}
    {#if streams.length}
      <div class="border rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-white">
        <div
          class="flex justify-between items-center py-3 pl-5 pr-4 rounded-t border-b dark:border-gray-700"
        >
          <div class="w-1/3 overflow-hidden">
            <h2 class="text-l font-medium text-gray-900 dark:text-white">Streams</h2>
          </div>
        </div>
        <div class="overflow-y-auto overflow-x-hidden w-full p-6">
          <div class="space-y-2">
            {#each streams as stream}
              <StreamItem {stream} />
            {/each}
          </div>
        </div>
      </div>
    {/if}
    {#if guides.length}
      <div class="border rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-white">
        <div
          class="flex justify-between items-center py-3 pl-5 pr-4 rounded-t border-b dark:border-gray-700"
        >
          <div class="w-1/3 overflow-hidden">
            <h2 class="text-l font-medium text-gray-900 dark:text-white">Guides</h2>
          </div>
        </div>
        <div class="overflow-y-auto overflow-x-hidden w-full p-6">
          <div class="dark:border-gray-700 rounded-md border border-gray-200">
            {#each guides as guide, index}
              <GuideItem {guide} {index} />
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </section>
</main>

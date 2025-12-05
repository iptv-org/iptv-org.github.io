<script lang="ts">
  import { CloseButton, CodeBlock, Card } from '$lib/components'

  interface Props {
    onClose?: () => void
  }

  const { onClose = () => {} }: Props = $props()

  const examples = [
    { query: 'cat', result: 'Finds channels that have "cat" in their descriptions.' },
    { query: 'cat dog', result: 'Finds channels that have "cat" AND "dog" in their descriptions.' },
    { query: 'cat,dog', result: 'Finds channels that have "cat" OR "dog" in their descriptions.' },
    {
      query: 'name:"Nat Geo"',
      result: 'Find channels that have "Nat Geo" in the name.'
    },
    {
      query: 'alt_name:חינוכית',
      result: 'Finds channels whose alternative name contains "חינוכית".'
    },
    { query: 'network:ABC', result: 'Finds all channels operated by the ABC Network.' },
    {
      query: 'owner:/^$/',
      result: 'Finds channels that have no owner listed.'
    },
    { query: 'country:GY', result: 'Finds all channels that are broadcast from Guyana.' },
    { query: 'broadcast_area:c/CV', result: 'Finds channels that are broadcast in Cape Verde.' },
    {
      query: 'timezone:Asia/Kabul',
      result: 'Find channels that are broadcast in the time zone Asia/Kabul.'
    },
    { query: 'language:fra', result: 'Find channels that are broadcast in French.' },
    { query: 'category:news', result: 'Finds all the news channels.' },
    { query: 'format:1080p', result: 'Find channels that are broadcast in 1080p.' },
    { query: 'website:/./', result: 'Finds channels that have a link to the official website.' },
    { query: 'is_nsfw:true', result: 'Finds channels marked as NSFW.' },
    {
      query: 'is_closed:true',
      result: 'Finds channels that have been closed.'
    },
    {
      query: 'is_blocked:true',
      result:
        'Finds channels that have been added to our blocklist due to the claim of the copyright holder.'
    },
    { query: 'feeds:>1', result: 'Finds channels with more than 1 feed.' },
    { query: 'logos:0', result: 'Finds channels that do not have a logo.' },
    { query: 'streams:<2', result: 'Finds channels with less than 2 streams.' },
    { query: 'guides:>0', result: 'Finds channels that have guides.' }
  ]
</script>

<Card
  >{#snippet headerLeft()}
    <div class="text-l font-medium text-gray-800 dark:text-white inline-flex items-center">
      Search syntax
    </div>
  {/snippet}
  {#snippet headerRight()}
    <div>
      <CloseButton onClick={onClose} />
    </div>
  {/snippet}
  {#snippet body()}
    <div class="text-gray-800 dark:text-white pt-2.5 w-full">
      {#each examples as example (example.query)}
        <div
          class="border-t border-gray-200 dark:border-gray-700 py-5 w-full flex flex-col items-start gap-2 px-5"
        >
          <CodeBlock>{example.query}</CodeBlock>
          <div class="px-1">{example.result}</div>
        </div>
      {/each}
    </div>
  {/snippet}</Card
>

<script lang="ts">
  import type { Collection } from '@freearhey/core'
  import type { Stream } from '$lib/models'
  import * as StreamList from './'

  interface Props {
    streams: Collection<Stream>
  }

  const { streams }: Props = $props()
</script>

{#each streams.all() as stream (stream.uuid)}
  <StreamList.Item {stream} />
{/each}

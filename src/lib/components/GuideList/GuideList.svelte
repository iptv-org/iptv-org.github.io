<script lang="ts">
  import type { Collection } from '@freearhey/core'
  import type { Guide } from '$lib/models'
  import * as GuideList from './'

  interface Props {
    guides: Collection<Guide>
  }

  const { guides }: Props = $props()
</script>

{#each guides.all() as guide (guide.uuid)}
  <GuideList.Item {guide} />
{/each}

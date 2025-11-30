<script lang="ts">
  import type { Collection } from '@freearhey/core'
  import type { Logo } from '$lib/models'
  import * as LogoList from './'

  interface Props {
    logos: Collection<Logo>
  }

  const { logos }: Props = $props()
</script>

{#each logos.all() as logo (logo.uuid)}
  <LogoList.Item {logo} />
{/each}

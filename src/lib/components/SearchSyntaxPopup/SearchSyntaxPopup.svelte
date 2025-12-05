<script lang="ts">
  import { Popup, SearchSyntaxCard } from '$lib/components'
  import type { Context } from 'svelte-simple-modal'
  import { getContext } from 'svelte'

  const { close } = getContext<Context>('simple-modal')
</script>

<Popup onClose={close}>
  <SearchSyntaxCard onClose={close} />
</Popup>

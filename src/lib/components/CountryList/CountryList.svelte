<script lang="ts">
  import type { Country } from '$lib/models'
  import * as CountryList from './'

  interface Props {
    countries: Country[]
  }

  const { countries }: Props = $props()
</script>

{#each countries as country (country.code)}
  <CountryList.Item {country} />
{/each}

<script>
  import { onMount } from 'svelte'
  import CountryItem from '../components/CountryItem.svelte'
  import _ from 'lodash'

  let query = ''
  let normQuery = ''
  let regQuery = ''
  let isLoading = true
  let countries = []
  let channels = []
  let filtered = []

  $: grouped = _.groupBy(filtered, 'country')

  function search() {
    normQuery = query.replace(/\s/g, '').toLowerCase()
    regQuery = new RegExp(query)

    if (!normQuery) {
      filtered = channels
    }

    filtered = channels.filter(c => {
      const normResult = c.key.includes(normQuery)
      const regResult = regQuery ? regQuery.test(c.name) || regQuery.test(c.id) : false

      return normResult || regResult
    })
  }

  onMount(async () => {
    let guides = await fetch('https://iptv-org.github.io/api/guides.json')
      .then(response => response.json())
      .catch(console.log)
    guides = guides.length ? guides : []
    guides = _.groupBy(guides, 'channel')

    channels = await fetch('https://iptv-org.github.io/api/channels.json')
      .then(response => response.json())
      .then(arr =>
        arr.map(c => {
          c.key = `${c.id}_${c.name}`.replace(/\s/g, '').toLowerCase()
          c.guides = guides[c.id] || []
          return c
        })
      )
      .catch(err => {
        console.log(err)
        return []
      })

    const countriesJson = await fetch('https://iptv-org.github.io/api/countries.json')
      .then(response => response.json())
      .catch(console.log)

    countries = countriesJson.map(i => {
      i.expanded = false
      return i
    })

    filtered = channels

    isLoading = false
  })
</script>

<div class="section">
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-9">
        <form class="mb-5" on:submit|preventDefault="{search}">
          <div class="field-body">
            <div class="field is-expanded">
              <div class="field has-addons">
                <div class="control is-expanded">
                  <input
                    class="input"
                    type="search"
                    bind:value="{query}"
                    placeholder="Search by channel name..."
                  />
                </div>
                <div class="control">
                  <button class="button is-info" type="submit">
                    <span class="icon is-small is-right">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style="width: 1.25rem; height: 1.25rem"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="#ffffff"
                          d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              {#if !isLoading}
              <p class="help">Found { filtered.length.toLocaleString() } channels</p>
              {/if}
            </div>
          </div>
        </form>

        {#if isLoading}
        <div class="level">
          <div class="level-item">Loading...</div>
        </div>
        {/if} {#each countries as country}
        <CountryItem
          bind:country="{country}"
          bind:channels="{grouped[country.code]}"
          bind:normQuery="{normQuery}"
        ></CountryItem>
        {/each}
      </div>
    </div>
  </div>
</div>

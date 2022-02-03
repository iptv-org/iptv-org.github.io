const ChannelItem = {
  props: ['channel'],
  template: `
    <tr>
      <td class="is-vcentered" style="min-width: 150px; text-align: center">
        <img
          loading="lazy"
          referrerpolicy="no-referrer"
          v-show="channel.logo"
          :src="channel.logo"
          style="max-width: 100px; max-height: 50px; vertical-align: middle"
        />
      </td>
      <td class="is-vcentered" nowrap>
        <p v-text="channel.name"></p>
      </td>
      <td class="is-vcentered" nowrap>
        <code v-text="channel.id"></code>
      </td>
      <td class="is-vcentered">
        <p v-for="guide in channel.guides"><code style="white-space: nowrap" v-text="guide.url"></code></p>
      </td>
    </tr>
  `
}

const CountryItem = {
  components: {
    ChannelItem
  },
  props: ['channels', 'normQuery', 'regQuery', 'country'],
  template: `
    <div
      class="card mb-3 is-shadowless"
      style="border: 1px solid #dbdbdb"
      v-show="channels && channels.length > 0"
    >
      <div
        class="card-header is-shadowless is-clickable"
        @click="country.expanded = !country.expanded"
      >
        <span class="card-header-title">{{country.flag}}&nbsp;{{country.name}}</span>
        <button class="card-header-icon" aria-label="more options">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
              <path
                v-show="!country.expanded"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M112 184l144 144 144-144"
              />
              <path
                v-show="country.expanded"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M112 328l144-144 144 144"
              />
            </svg>
          </span>
        </button>
      </div>
      <div class="card-content" v-show="country.expanded || (channels && channels.length > 0 && normQuery.length)">
        <div class="table-container">
          <table class="table" style="min-width: 100%">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>TVG-ID</th>
                <th>EPG</th>
              </tr>
            </thead>
            <tbody>
              <channel-item v-for="channel in channels" :channel="channel"></channel-item>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
}

const App = {
  components: {
    CountryItem
  },
  data() {
    return {
      isLoading: true,
      query: '',
      normQuery: '',
      regQuery: null,
      countries: [],
      channels: []
    }
  },
  computed: {
    filtered() {
      if (!this.normQuery) return this.channels

      return this.channels.filter(c => {
        const normResult = c.key.includes(this.normQuery)
        const regResult = this.regQuery
          ? this.regQuery.test(c.name) || this.regQuery.test(c.id)
          : false

        return normResult || regResult
      })
    },
    grouped() {
      return _.groupBy(this.filtered, 'country')
    }
  },
  methods: {
    search() {
      this.normQuery = this.query.replace(/\s/g, '').toLowerCase()
      this.regQuery = new RegExp(this.query)
    }
  },
  async mounted() {
    let guides = await fetch('https://iptv-org.github.io/api/guides.json')
      .then(response => response.json())
      .catch(console.log)
    guides = guides.length ? guides : []
    guides = _.groupBy(guides, 'channel')

    this.channels = await fetch('https://iptv-org.github.io/api/channels.json')
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

    const countries = await fetch('https://iptv-org.github.io/api/countries.json')
      .then(response => response.json())
      .catch(console.log)

    this.countries = countries.map(i => {
      i.expanded = false
      return i
    })

    this.isLoading = false
  }
}

Vue.createApp(App).mount('#app')

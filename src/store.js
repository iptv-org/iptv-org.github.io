import {get, writable} from 'svelte/store'
import {transliterate} from 'transliteration'

export const query = writable('')
export const hasQuery = writable(false)
export const channels = writable([])
export const countries = writable({})
export const filteredChannels = writable([])

export function search(_query) {
	const parts = _query.toLowerCase().match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g) || []
	const filters = []
	for (let value of parts) {
		let field = '_key'
		if (value.includes(':')) {
			;[field, value] = value.split(':')
		}
		value = value.replace(/\"/g, '')

		if (field && value) {
			let numerical = ['streams', 'guides'].includes(field)
			filters.push({ field, numerical, value })
		}
	}

	if (!filters.length) {
		hasQuery.set(false)
		filteredChannels.set(get(channels))
		return
	}

	const filtered = get(channels).filter(c => {
		let results = []
		for (let f of filters) {
			if (!f.value) return false

			if (f.numerical) {
				if (f.value.startsWith('<')) {
					results.push(c._searchable[f.field] < parseInt(f.value.replace('<', '')))
				} else if (f.value.startsWith('>')) {
					results.push(c._searchable[f.field] > parseInt(f.value.replace('>', '')))
				} else {
					results.push(c._searchable[f.field] === parseInt(f.value))
				}
			} else {
				const regex = new RegExp(f.value.replaceAll(',', '|'), 'i')
				results.push(regex.test(c._searchable[f.field]))
			}
		}

		return results.every(Boolean)
	})

	filteredChannels.set(filtered)

	hasQuery.set(true)

	console.log('.')
}

export async function fetchChannels() {
	const api = await loadAPI()

	countries.set(api.countries)

	let _channels = api.channels.map(c => {
		c._raw = copy(c)
		c._streams = api.streams[c.id] || []
		c._guides = api.guides[c.id] || []
		c._country = api.countries[c.country]
		c._subdivision = api.subdivisions[c.subdivision]
		c._languages = c.languages.map(code => api.languages[code]).filter(i => i)
		c._categories = c.categories.map(id => api.categories[id]).filter(i => i)
		c._broadcast_area = c.broadcast_area.map(value => {
			const [type, code] = value.split('/')
			switch (type) {
				case 'c':
					return { type, ...api.countries[code] }
				case 'r':
					return { type, ...api.regions[code] }
				case 's':
					return { type, ...api.subdivisions[code] }
			}
		})
		c._searchable = generateSearchable(c)

		return c
	})

	channels.set(_channels)
	filteredChannels.set(_channels)
}

function generateSearchable(c) {
	const searchable = {}
	for (let key in c) {
		if (key.startsWith('_')) continue
		if (Array.isArray(c[key])) {
			searchable[key] = c[key].map(v => v.toString().toLowerCase()).join(',')
		} else {
			searchable[key] = c[key] ? c[key].toString().toLowerCase() : ''
		}
	}
	searchable.streams = c._streams.length
	searchable.guides = c._guides.length
	searchable.is = c.closed || c.replaced_by ? 'closed' : 'active'
	searchable._key = generateKey(c)

	return searchable
}

function generateKey(c) {
	const {id, name, alt_names, network, country, subdivision, city, broadcast_area, languages, categories, launched, closed, replaced_by} = c;
	const countries_arr = [{id, name, alt_names, network, country, subdivision, city, broadcast_area, languages, categories, launched, closed, replaced_by}];
	const translit = countries_arr.alt_names ? transliterate(countries_arr.alt_names) : null

	return [...countries_arr, translit]
		.map(v => v || '')
		.filter(v => v)
		.join('|')
		.toLowerCase()
}

function copy(value) {
	return JSON.parse(JSON.stringify(value))
}

export function setSearchParam(key, value) {
	if (window.history.pushState) {
		let query = key && value ? `?${key}=${value}` : ''
		query = query.replace(/\+/g, '%2B')
		const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}${query}`
		const state = {}
		state[key] = value
		window.history.pushState(state, '', url)
		setPageTitle(value)
	}
}

export function setPageTitle(value) {
	document.title = value ? `${value} · iptv-org` : 'iptv-org'
}

async function loadAPI() {
	const api = {}
	const keyBy = (data, key) => (data || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {})

	api.countries = await fetch('https://iptv-org.github.io/api/countries.json')
		.then(r => r.json())
		.then(data => (data.length ? data : []))
		.then(data => data.map(i => {i.expanded = false; return i}))
		.then(data => keyBy(data, 'code'))
		.catch(console.error)

	api.regions = await fetch('https://iptv-org.github.io/api/regions.json')
		.then(r => r.json())
		.then(data => (data.length ? data : []))
		.then(data => keyBy(data, 'code'))
		.catch(console.error)

	api.subdivisions = await fetch('https://iptv-org.github.io/api/subdivisions.json')
		.then(r => r.json())
		.then(data => (data.length ? data : []))
		.then(data => keyBy(data, 'code'))
		.catch(console.error)

	api.languages = await fetch('https://iptv-org.github.io/api/languages.json')
		.then(r => r.json())
		.then(data => (data.length ? data : []))
		.then(data => keyBy(data, 'code'))
		.catch(console.error)

	api.categories = await fetch('https://iptv-org.github.io/api/categories.json')
		.then(r => r.json())
		.then(data => (data.length ? data : []))
		.then(data => keyBy(data, 'code'))
		.catch(console.error)

	api.streams = await fetch('https://iptv-org.github.io/api/streams.json')
		.then(r => r.json())
		.then(data => (data.length ? data : []))
		.then(data => data.reduce((r, v, i, a, k = v.channel) => ((r[k] || (r[k] = [])).push(v), r), {}))
		.catch(console.error)

	api.guides = await fetch('https://iptv-org.github.io/api/guides.json')
		.then(r => r.json())
		.then(data => (data.length ? data : []))
		.then(data => data.reduce((r, v, i, a, k = v.channel) => ((r[k] || (r[k] = [])).push(v), r), {}))
		.catch(console.error)

	api.channels = await fetch('https://iptv-org.github.io/api/channels.json')
		.then(r => r.json())
		.catch(err => {
			console.error(err)
			return []
		})

	return api
}

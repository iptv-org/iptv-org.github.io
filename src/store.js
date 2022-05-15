import { writable, get } from 'svelte/store'
import { transliterate } from 'transliteration'
import _ from 'lodash'

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
			filters.push({ field, value })
		}
	}

	if (!filters.length) {
		hasQuery.set(false)
		filteredChannels.set(get(channels))
		return
	}

	const filtered = get(channels).filter(c => {
		for (let f of filters) {
			if (!f.value) return false
			const regex = new RegExp(f.value, 'i')
			if (!c._searchable[f.field] || !regex.test(c._searchable[f.field])) {
				return false
			}
		}
		return true
	})

	filteredChannels.set(filtered)

	hasQuery.set(true)

	console.log('.')
}

export async function fetchChannels() {
	let _countries = await fetch('https://iptv-org.github.io/api/countries.json')
		.then(r => r.json())
		.then(data => (data.length ? data : []))
		.then(data =>
			data.map(i => {
				i.expanded = false
				return i
			})
		)
		.then(data => _.keyBy(data, 'code'))
		.catch(console.error)
	countries.set(_countries)

	let _regions = await fetch('https://iptv-org.github.io/api/regions.json')
		.then(r => r.json())
		.then(data => (data.length ? data : []))
		.then(data => _.keyBy(data, 'code'))
		.catch(console.error)

	let _subdivisions = await fetch('https://iptv-org.github.io/api/subdivisions.json')
		.then(r => r.json())
		.then(data => (data.length ? data : []))
		.then(data => _.keyBy(data, 'code'))
		.catch(console.error)

	let _languages = await fetch('https://iptv-org.github.io/api/languages.json')
		.then(r => r.json())
		.then(data => (data.length ? data : []))
		.then(data => _.keyBy(data, 'code'))
		.catch(console.error)

	let _categories = await fetch('https://iptv-org.github.io/api/categories.json')
		.then(r => r.json())
		.then(data => (data.length ? data : []))
		.then(data => _.keyBy(data, 'id'))
		.catch(console.error)

	let _streams = await fetch('https://iptv-org.github.io/api/streams.json')
		.then(r => r.json())
		.then(data => (data.length ? data : []))
		.then(data => _.groupBy(data, 'channel'))
		.catch(console.error)

	let _guides = await fetch('https://iptv-org.github.io/api/guides.json')
		.then(r => r.json())
		.then(data => (data.length ? data : []))
		.then(data => _.groupBy(data, 'channel'))
		.catch(console.error)

	let _channels = await fetch('https://iptv-org.github.io/api/channels.json')
		.then(r => r.json())
		.then(arr =>
			arr.map(c => {
				c._raw = JSON.parse(JSON.stringify(c))
				c._streams = _streams[c.id] || []
				c._guides = _guides[c.id] || []

				for (let field in c) {
					switch (field) {
						case 'languages':
							c.languages = c.languages.map(code => _languages[code]).filter(i => i)
							break
						case 'broadcast_area':
							c.broadcast_area = c.broadcast_area
								.map(value => {
									const [type, code] = value.split('/')
									switch (type) {
										case 'c':
											return _countries[code]
										case 'r':
											return _regions[code]
										case 's':
											return _subdivisions[code]
									}
								})
								.filter(i => i)
							break
						case 'categories':
							c.categories = c.categories.map(id => _categories[id]).filter(i => i)
							break
						case 'country':
							c.country = _countries[c.country]
							break
						case 'subdivision':
							c.subdivision = _subdivisions[c.subdivision]
							break
					}
				}

				c._searchable = generateSearchable(c)

				return c
			})
		)
		.catch(err => {
			console.error(err)
			return []
		})

	channels.set(_channels)
	filteredChannels.set(_channels)
}

function generateSearchKey(c) {
	const translit = c.native_name ? transliterate(c.native_name) : null

	return [c.id, c.name, c.native_name, translit, c.network]
		.map(v => v || '')
		.filter(v => v)
		.join('|')
		.toLowerCase()
}

function generateSearchable(c) {
	const searchable = {}
	for (let key in c) {
		if (key.startsWith('_') || c[key] === null || c[key] === undefined) continue
		if (Array.isArray(c[key])) {
			searchable[key] = c[key]
				.map(v => (v.name ? v.name.toLowerCase() : null))
				.filter(v => v)
				.join(',')
		} else if (typeof c[key] === 'object' && c[key].name) {
			searchable[key] = c[key].name.toLowerCase()
		} else {
			searchable[key] = c[key].toString().toLowerCase()
		}
	}
	searchable._key = generateSearchKey(c)

	return searchable
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
	const title = value ? `${value} · iptv-org` : 'iptv-org'
	document.title = title
}

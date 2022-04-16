<script>
	import { onMount } from 'svelte'
	import { JsonView } from '@zerodevx/svelte-json-view'

	export let data
	let dark = false

	let fieldset = []
	for (let key in data) {
		if (key.startsWith('_')) continue
		fieldset.push({
			name: key,
			value: data[key]
		})
	}

	onMount(() => {
		if (
			localStorage.getItem('color-theme') === 'light' ||
			(!('color-theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			dark = false
		} else {
			dark = true
		}
	})
</script>

<style>
	:global(.value .val),
	:global(.value .key) {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
			'Courier New', monospace;
		font-size: 1em;
	}

	:global(.dark .value) {
		--leafDefaultColor: white;
		--leafStringColor: white;
		--leafNumberColor: white;
		--leafBooleanColor: white;
		--nodeColor: white;
	}

	:global(.value) {
		--nodeBorderLeft: 1px dotted #9ca3b0;
		--leafDefaultColor: #525a69;
		--leafStringColor: #525a69;
		--leafNumberColor: #525a69;
		--leafBooleanColor: #525a69;
		--nodeColor: #525a69;
	}

	:global(.value .key),
	:global(.value .comma) {
		color: #9ca3b0;
	}
</style>

<table class="table-fixed w-full dark:text-white">
	<tbody>
		{#each fieldset as field}
		<tr>
			<td
				class="w-[7rem] md:w-[11rem] px-4 py-1 text-sm text-gray-400 whitespace-nowrap dark:text-gray-400 align-top"
			>
				{field.name}
			</td>
			<td class="px-4 py-1 text-sm text-gray-600 dark:text-gray-100 align-top value break-words">
				{#if Array.isArray(field.value) && field.value.length}
				<JsonView json="{field.value}" />
				{:else}
				<code>{JSON.stringify(field.value)}</code>
				{/if}
			</td>
		</tr>
		{/each}
	</tbody>
</table>

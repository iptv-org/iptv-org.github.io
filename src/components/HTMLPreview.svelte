<script>
  import dayjs from 'dayjs'
  import { goto } from '$app/navigation'
  import { query, hasQuery, setSearchParam } from '~/store'

  export let data
  export let close = () => {}

  const fieldset = [
    { name: 'logo', type: 'image', value: data.logo },
    { name: 'id', type: 'string', value: data.id },
    { name: 'name', type: 'string', value: data.name },
    { name: 'alt_names', type: 'string', value: data.alt_names.join(', ') },
    {
      name: 'network',
      type: 'link',
      value: data.network ? { label: data.network, query: `network:${norm(data.network)}` } : null
    },
    {
      name: 'owners',
      type: 'link[]',
      value: data.owners.map(value => ({ label: value, query: `owners:${norm(value)}` }))
    },
    {
      name: 'country',
      type: 'link',
      value: { label: data._country.name, query: `country:${data._country.code}` }
    },
    {
      name: 'subdivision',
      type: 'link',
      value: data._subdivision
        ? { label: data._subdivision.name, query: `subdivision:${data._subdivision.code}` }
        : null
    },
    {
      name: 'city',
      type: 'link',
      value: data.city ? { label: data.city, query: `city:${norm(data.city)}` } : null
    },
    {
      name: 'broadcast_area',
      type: 'link[]',
      value: data._broadcast_area.map(v => ({
        label: v.name,
        query: `broadcast_area:${v.type}/${v.code}`
      }))
    },
    {
      name: 'languages',
      type: 'link[]',
      value: data._languages.map(v => ({ label: v.name, query: `languages:${v.code}` }))
    },
    {
      name: 'categories',
      type: 'link[]',
      value: data._categories.map(v => ({ label: v.name, query: `categories:${v.id}` }))
    },
    {
      name: 'is_nsfw',
      type: 'link',
      value: { label: data.is_nsfw.toString(), query: `is_nsfw:${data.is_nsfw.toString()}` }
    },
    {
      name: 'launched',
      type: 'date',
      value: data.launched ? dayjs(data.launched).format('D MMMM YYYY') : null
    },
    {
      name: 'closed',
      type: 'date',
      value: data.closed ? dayjs(data.closed).format('D MMMM YYYY') : null
    },
    {
      name: 'replaced_by',
      type: 'link',
      value: data.replaced_by ? { label: data.replaced_by, query: `id:${data.replaced_by}` } : null
    },
    { name: 'website', type: 'external_link', value: data.website }
  ].filter(f => (Array.isArray(f.value) ? f.value.length : f.value))

  function norm(value) {
    return value.includes(' ') ? `"${value}"` : value
  }
</script>

<table class="table-fixed">
  <tbody>
    {#each fieldset as field}
      <tr>
        <td class="align-top w-[11rem]">
          <div class="flex pr-4 pb-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
            {field.name}
          </div>
        </td>
        <td class="align-top">
          <div class="flex pb-3 text-sm text-gray-800 dark:text-gray-100 flex-wrap">
            {#if field.type === 'image'}
              <img
                src={field.value}
                alt={field.name}
                referrerpolicy="no-referrer"
                class="border rounded-sm overflow-hidden border-gray-200 bg-[#e6e6e6]"
              />
            {:else if field.type === 'link'}
              <a
                href="/?q={field.value.query}"
                on:click={() => close()}
                class="underline hover:text-blue-500"
              >
                {field.value.label}
              </a>
            {:else if field.type === 'link[]'}
              {#each field.value as value, i}
                {#if i > 0}<span>,&nbsp; </span>
                {/if}
                <a
                  href="/?q={value.query}"
                  on:click={() => close()}
                  class="underline hover:text-blue-500"
                >
                  {value.label}
                </a>
              {/each}
            {:else if field.type === 'external_link'}
              <a
                href={field.value}
                class="underline hover:text-blue-500 inline-flex align-middle whitespace-nowrap"
                target="_blank"
                rel="noopener noreferrer"
                >{field.value}<span
                  class="inline-flex items-center pl-1 text-sm font-semibold text-gray-400 rounded-full"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                </span></a
              >
            {:else}
              {field.value}
            {/if}
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

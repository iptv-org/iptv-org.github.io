<script lang="ts">
  import type { HTMLPreviewField } from '~/types/htmlPreviewField'

  export let fieldset: HTMLPreviewField[] = []
  export let onClick = () => {}
</script>

<table class="table-fixed w-full">
  <tbody>
    {#each fieldset as field}
      {#if field}
        <tr>
          <td class="align-top w-[135px] sm:w-[200px]">
            <div class="flex pr-5 pb-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
              {field.name}
            </div>
          </td>
          <td class="align-top w-full overflow-hidden">
            <div class="pb-3 text-sm text-gray-900 dark:text-gray-100">
              {#if field.type === 'image'}
                <img
                  src={field.value.src}
                  alt={field.value.alt}
                  title={field.value.title}
                  referrerpolicy="no-referrer"
                  class="border rounded-sm overflow-hidden border-gray-200 bg-[#e6e6e6]"
                />
              {:else if field.type === 'link'}
                <div class="truncate">
                  <a
                    href="/?q={field.value.query}"
                    onclick={onClick}
                    class="underline hover:text-blue-400"
                    title={field.value.label}
                  >
                    {field.value.label}
                  </a>
                </div>
              {:else if field.type === 'link[]'}
                <div class="overflow-hidden text-ellipsis">
                  {#each field.value as value, i}
                    {#if i > 0}<span>,&nbsp; </span>
                    {/if}
                    <a
                      href="/?q={value.query}"
                      onclick={onClick}
                      class="underline hover:text-blue-400"
                      title={value.label}
                    >
                      {value.label}
                    </a>
                  {/each}
                </div>
              {:else if field.type === 'external_link'}
                <div class="truncate">
                  <a
                    href={field.value.href}
                    class="underline hover:text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={field.value.title}>{field.value.label}</a
                  >
                </div>
              {:else if field.name === 'id'}
                <span class="break-all" title={field.value.text.toString()}>{field.value.text}</span
                >
              {:else if field.type === 'string[]'}
                <div class="overflow-hidden text-ellipsis">
                  {#each field.value as value, i}
                    {#if i > 0}<span>,&nbsp; </span>
                    {/if}
                    <span title={value.text.toString()}>{value.text}</span>
                  {/each}
                </div>
              {:else if field.type === 'string'}
                <span class="break-words" title={field.value.title}>{field.value.text}</span>
              {/if}
            </div>
          </td>
        </tr>
      {/if}
    {/each}
  </tbody>
</table>

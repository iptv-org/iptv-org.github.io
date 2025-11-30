<script lang="ts">
  import * as HTMLPreview from './'
  import type {
    HTMLPreviewExternalLink,
    HTMLPreviewString,
    HTMLPreviewLink,
    HTMLPreviewImage,
    HTMLPreviewField
  } from './types'

  interface Props {
    fieldset: HTMLPreviewField[]
    onClick?: () => void
  }

  const { fieldset, onClick }: Props = $props()
</script>

<table class="table-fixed w-full">
  <tbody>
    {#each fieldset as field (field.name)}
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
                <HTMLPreview.Image value={field.value as HTMLPreviewImage} />
              {:else if field.type === 'link'}
                <div class="truncate">
                  <HTMLPreview.Link value={field.value as HTMLPreviewLink} {onClick} />
                </div>
              {:else if field.type === 'link[]'}
                <div class="overflow-hidden text-ellipsis">
                  {#each field.value as HTMLPreviewLink[] as value, index (value)}
                    {#if index > 0}<span>,&nbsp; </span>
                    {/if}
                    <HTMLPreview.Link {value} {onClick} />
                  {/each}
                </div>
              {:else if field.type === 'external_link'}
                <div class="truncate">
                  <HTMLPreview.ExternalLink value={field.value as HTMLPreviewExternalLink} />
                </div>
              {:else if field.type === 'string[]'}
                <div class="overflow-hidden text-ellipsis">
                  {#each field.value as HTMLPreviewString[] as value, index (value)}
                    {#if index > 0}<span>,&nbsp; </span>
                    {/if}
                    <HTMLPreview.String {value} />
                  {/each}
                </div>
              {:else if field.type === 'string'}
                <HTMLPreview.String value={field.value as HTMLPreviewString} />
              {/if}
            </div>
          </td>
        </tr>
      {/if}
    {/each}
  </tbody>
</table>

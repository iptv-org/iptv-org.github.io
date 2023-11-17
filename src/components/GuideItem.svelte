<script>
  export let guide

  const url = `https://${guide.site}`
</script>

<div
  class="w-full inline-flex justify-between px-4 border-b-[1px] dark:border-gray-700 last:border-0"
>
  <div class="flex space-x-4 items-center w-full min-h-11 py-3">
    <div class="text-gray-400 w-8 text-sm">{guide.lang}</div>
    <a
      class="whitespace-nowrap text-sm text-gray-600 dark:text-gray-100 hover:text-blue-500 hover:underline inline-flex align-middle max-w-[50%] w-full"
      href={url}
      title={url}
      target="_blank"
      rel="noreferrer"
    >
      <span class="truncate">{guide.site}</span><span
        class="inline-flex items-center pl-1 font-semibold text-gray-500 rounded-full"
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
    <div class="text-right text-gray-400 text-sm w-full" title={guide.site_id}>
      {guide.site_name}
    </div>
  </div>
</div>

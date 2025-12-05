import type { HTMLPreviewField } from '~/types/htmlPreviewField'

export const fieldset: HTMLPreviewField[] = [
  { name: 'id', type: 'string', value: { text: 'AndorraTV.ad', title: 'AndorraTV.ad' } },
  { name: 'name', type: 'string', value: { text: 'Andorra TV', title: 'Andorra TV' } },
  {
    name: 'alt_names',
    type: 'string[]',
    value: [{ text: 'ATV', title: 'ATV' }]
  },
  {
    name: 'network',
    type: 'link',
    value: { label: 'Enlave', query: `network:Enlave` }
  },
  {
    name: 'owners',
    type: 'link[]',
    value: [
      {
        label: 'Disney',
        query: `owner:Disney`
      }
    ]
  },
  {
    name: 'country',
    type: 'link',
    value: { label: 'Andorra', query: `country:AD` }
  },
  {
    name: 'broadcast_area',
    type: 'link[]',
    value: [
      {
        label: 'Canillo',
        query: `broadcast_area:ct/ADCAN`
      }
    ]
  },
  {
    name: 'timezones',
    type: 'link[]',
    value: [
      {
        label: 'America/Port_of_Spain',
        query: `timezone:America/Port_of_Spain`
      }
    ]
  },
  {
    name: 'languages',
    type: 'link[]',
    value: [
      {
        label: 'Catalan',
        query: `language:cat`
      }
    ]
  },
  {
    name: 'categories',
    type: 'link[]',
    value: [
      {
        label: 'Animation',
        query: `category:animation`
      },
      {
        label: 'Kids',
        query: `category:kids`
      }
    ]
  },
  {
    name: 'is_nsfw',
    type: 'link',
    value: { label: 'false', query: `is_nsfw:false` }
  },
  {
    name: 'formats',
    type: 'link[]',
    value: [
      {
        label: '576i',
        query: `format:576i`
      }
    ]
  },
  {
    name: 'launched',
    type: 'string',
    value: {
      text: '1 September 2022',
      title: '2022-09-01'
    }
  },
  {
    name: 'closed',
    type: 'string',
    value: {
      text: '1 September 2025',
      title: '2025-09-01'
    }
  },
  {
    name: 'replaced_by',
    type: 'link',
    value: {
      label: 'BBCNews.uk',
      query: 'BBCNews.uk'
    }
  },
  {
    name: 'website',
    type: 'external_link',
    value: {
      href: 'https://www.andorradifusio.ad/',
      title: 'https://www.andorradifusio.ad/',
      label: 'https://www.andorradifusio.ad/'
    }
  }
]

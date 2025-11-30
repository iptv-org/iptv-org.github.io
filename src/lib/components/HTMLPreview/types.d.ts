export type HTMLPreviewImage = { src: string; alt: string; title: string }
export type HTMLPreviewLink = { label: string; query: string }
export type HTMLPreviewExternalLink = { label: string; title: string; href: string }
export type HTMLPreviewString = { text: string; title: string }
export type HTMLPreviewField = {
  name: string
  type: string
  value:
    | HTMLPreviewImage
    | HTMLPreviewLink
    | HTMLPreviewLink[]
    | HTMLPreviewExternalLink
    | HTMLPreviewString[]
    | HTMLPreviewString
}

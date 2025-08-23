export type SubdivisionSerializedData = {
  code: string
  name: string
  countryCode: string
  parentCode?: string
}

export type SubdivisionData = {
  code: string
  name: string
  country: string
  parent: string | null
}

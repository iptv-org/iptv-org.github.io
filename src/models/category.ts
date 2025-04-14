import type { CategoryData, CategorySerializedData } from '~/types/category'

export class Category {
  id: string
  name: string

  constructor(data?: CategoryData) {
    if (!data) return

    this.id = data.id
    this.name = data.name
  }

  serialize(): CategorySerializedData {
    return {
      id: this.id,
      name: this.name
    }
  }

  deserialize(data: CategorySerializedData): this {
    this.id = data.id
    this.name = data.name

    return this
  }
}

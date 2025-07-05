export function pluralize(number: number, word: string) {
  return number > 1 ? word + 's' : word
}

export function normalize(value: string) {
  value = value.includes(' ') ? `"${value}"` : value

  return encodeURIComponent(value)
}

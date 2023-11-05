export function sortAlpha<T>(key: keyof T, reverse: boolean = false) {
  if (reverse) return (a: T, b: T) => (a[key] as string).localeCompare(b[key] as string);
  return (a: T, b: T) => (b[key] as string).localeCompare(a[key] as string);
}

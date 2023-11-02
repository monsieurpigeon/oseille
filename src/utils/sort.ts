export function sortAlpha<T>(key: keyof T) {
  return (a: T, b: T) => (b[key] as string).localeCompare(a[key] as string);
}

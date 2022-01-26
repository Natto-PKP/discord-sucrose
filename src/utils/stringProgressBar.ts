/**
 * ? Create progress bar with string
 * @param value
 * @param total
 * @param size
 * @param full
 * @param empty
 * @returns
 * @example
 * stringProgressBar(30, 100) // ###-------
 */
export function stringProgressBar(value: number, total: number, size = 10, full = '⬢', empty = '⬡'): string {
  if (!total) return full.repeat(size);
  const pourcent = Math.ceil((value / total) * size);
  return full.repeat(pourcent).padEnd(size, empty);
}

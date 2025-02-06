export function getPluralEnding(num: number, str: string) {
  return num === 1 ? str : `${str}s`;
}

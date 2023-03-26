export const reverse = (string: string): string => string.split('').reverse().join('')

export const average = (array: number[]): number => {
  const reducer = (prev: number, next: number): number => prev + next

  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length
}

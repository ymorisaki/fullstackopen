const {reverse} = require('../util/for_test');

test('reverse of a', () => {
  const result = reverse('a')

  expect(result).toBe('a')
})

test('reverse of react', () => {
  expect(reverse('react')).toBe('tcaer')
})

test('reverse of releveler', () => {
  expect(reverse('releveler')).toBe('releveler')
})

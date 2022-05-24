const {average} = require('../util/for_test');

describe('average', () => {
  test('of one value', () => {
    expect(average([1])).toBe(1)
  })

  test('of many value', () => {
    expect(average([1,2,3,4,5,6])).toBe(3.5)
  })

  test('of empty', () => {
    expect(average([])).toBe(0)
  })
});
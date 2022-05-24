const reverse = string => string.split('').reverse().join('')
const average = array => {
  const reducer = (prev, current) => prev + current
  return array.length === 0
    ? 0
    : array.reduce(reducer, 0) / array.length
}

module.exports = {
  reverse,
  average
}

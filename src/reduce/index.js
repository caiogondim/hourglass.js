async function reduce(gen, reducer, initialValue) {
  let accumulator = initialValue
  for await (let value of gen) {
    accumulator = await reducer(accumulator, value)
  }
  return accumulator
}

module.exports = reduce

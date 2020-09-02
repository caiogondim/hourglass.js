const take = require('.')

/**
 * @yields {number}
 */
function* createNumbersGenerator() {
  let x = 1
  while (true) {
    yield x
    x += 1
  }
}

it('takes the first N values from a generator', () => {
  const numbersGenerator = take(createNumbersGenerator(), 5)
  const generatedValues = []
  for (let val of numbersGenerator) {
    generatedValues.push(val)
  }
  expect(generatedValues).toEqual([1, 2, 3, 4, 5])
})

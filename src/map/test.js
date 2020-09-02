const map = require('.')
const take = require('../take')

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

it('maps over values from generator passed as argument', async () => {
  const evenNumbersGenerator = map(
    take(createNumbersGenerator(), 5),
    (n) => n * 2
  )
  const generatedValues = []
  for (let val of evenNumbersGenerator) {
    generatedValues.push(val)
  }
  expect(generatedValues).toEqual([2, 4, 6, 8, 10])
})

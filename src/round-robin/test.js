const roundRobin = require('.')
const take = require('../take')
const compose = require('../compose')
const createNumbersGenerator = require('../_shared/create-numbers-generator')
const consume = require('../consume')
const skip = require('../skip')

it('reads values from generators passed as arguments in a round-robin fashion', async () => {
  const evensGenerator = compose(createNumbersGenerator(), take(5))
  const oddsGenerator = compose(createNumbersGenerator(), skip(5), take(5))
  const output = await consume(roundRobin(evensGenerator, oddsGenerator))
  expect(output).toEqual([0, 5, 1, 6, 2, 7, 3, 8, 4, 9])
})

it('works with generators of different sizes', async () => {
  const generators = []
  generators.push(compose(createNumbersGenerator(), take(1)))
  generators.push(compose(createNumbersGenerator(), skip(1), take(2)))
  generators.push(compose(createNumbersGenerator(), skip(3), take(5)))

  const output = await consume(roundRobin(...generators))
  expect(output).toEqual([0, 1, 3, 4, 2, 5, 6, 7])
})

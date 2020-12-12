const concat = require('.')
const createNumbersGenerator = require('../../shared/create-numbers-generator')
const take = require('../take')
const skip = require('../skip')
const consume = require('../consume')
const compose = require('../compose')

it('concatenates all generators passed as argument', async () => {
  const gen1 = compose(createNumbersGenerator(), take(5))
  const gen2 = compose(createNumbersGenerator(), skip(5), take(5))
  const concated = concat(gen1, gen2)
  const generated = await consume(concated)
  expect(generated).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
})

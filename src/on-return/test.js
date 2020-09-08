const onReturn = require('.')
const consume = require('../consume')
const compose = require('../compose')
const take = require('../take')
const createNumbersGenerator = require('../_shared/create-numbers-generator')

it('executes `callback` after generator is finished', async () => {
  const callback = jest.fn(() => {})
  const composed = onReturn(callback, take(5, createNumbersGenerator()))
  await consume(composed)
  expect(callback).toHaveBeenCalled()
})

it('is composable', async () => {
  const callback = jest.fn(() => {})
  const composed = compose(
    createNumbersGenerator(),
    take(5),
    onReturn(callback)
  )
  await consume(composed)
  expect(callback).toHaveBeenCalled()
})

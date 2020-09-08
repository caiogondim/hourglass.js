const tap = require('.')
const compose = require('../compose')
const createNumbersGenerator = require('../_shared/create-numbers-generator')
const take = require('../take')
const consume = require('../consume')

it('callback is called for every generated value by generator', async () => {
  const callback = jest.fn(() => {})
  const composed = tap(callback, take(5, createNumbersGenerator()))
  const output = await consume(composed)
  expect(output).toEqual([0, 1, 2, 3, 4])
  expect(callback).toHaveBeenCalledTimes(5)
})

it('does not transform generated values', async () => {
  const tapped = compose(
    createNumbersGenerator(),
    take(5),
    tap(() => {})
  )
  const untapped = compose(createNumbersGenerator(), take(5))

  expect(await consume(tapped)).toEqual(await consume(untapped))
})

it('is composable', async () => {
  const callback = jest.fn(() => {})
  const composed = compose(createNumbersGenerator(), take(5), tap(callback))
  const output = await consume(composed)
  expect(output).toEqual([0, 1, 2, 3, 4])
  expect(callback).toHaveBeenCalledTimes(5)
})

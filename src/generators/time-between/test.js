const timeBetween = require('.')
const take = require('../take')
const compose = require('../compose')
const createNumbersGenerator = require('../../_shared/create-numbers-generator')

it('sleeps between each item generated', async () => {
  const timeBetweenMs = 20
  const takeNumber = 5
  const composed = compose(
    createNumbersGenerator(),
    timeBetween(timeBetweenMs),
    take(takeNumber)
  )
  let firstCall = Date.now()
  let lastCall = Date.now()

  for await (let value of composed) {
    expect(Date.now() - lastCall).toBeGreaterThanOrEqual(timeBetweenMs)
    expect(typeof value).toBe('number')

    lastCall = Date.now()
  }

  // Execution time should be equal to Math.min(delay, timeBetween) * 4
  expect(Date.now() - firstCall).toBeGreaterThanOrEqual(
    timeBetweenMs * (takeNumber - 1)
  )
  expect(Date.now() - firstCall).toBeLessThanOrEqual(
    timeBetweenMs * (takeNumber - 1) + 100
  )
})

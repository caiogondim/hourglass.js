const take = require('../take')
const {
  async: createNumberGenerator,
} = require('../_shared/create-numbers-generator')
const compose = require('../compose')
const delay = require('../delay')
const onIdle = require('.')

const idle = Symbol()

it('works as a pass-through higher-order generators in case time between generated values are smaller than `ms`', async () => {
  const output = []
  const composed = compose(
    createNumberGenerator(),
    take(5),
    delay(1),
    onIdle(10, () => idle)
  )

  for await (let val of composed) {
    output.push(val)
  }

  expect(output).toEqual([1, 2, 3, 4, 5])
})

it('executes callback after X ms from last generated value by generator', async () => {
  let wasCallbackExecuted = false
  const composed = compose(
    createNumberGenerator(),
    take(5),
    delay(10),
    onIdle(5, () => {
      wasCallbackExecuted = true
    })
  )

  for await (let val of composed) {
  }

  expect(wasCallbackExecuted).toBe(true)
})

it('inserts returned value from callback into generator', async () => {
  const output = []
  const composed = compose(
    createNumberGenerator(),
    take(5),
    delay(100),
    onIdle(10, () => idle)
  )

  for await (let val of composed) {
    output.push(val)
  }

  expect(output).toEqual([1, idle, 2, idle, 3, idle, 4, idle, 5])
})

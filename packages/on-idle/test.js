import { take } from '@hourglass/take'
import { compose } from '@hourglass/compose'
import { consume } from '@hourglass/consume'
import { delay } from '@hourglass/delay'
import { onIdle } from '.'

async function* createNumbersGenerator() {
  let index = 0
  while (true) {
    yield index
    index += 1
  }
}

const idle = Symbol()

it('works as a pass-through higher-order generators in case time between generated values are smaller than `ms`', async () => {
  const output = []
  const composed = compose(
    createNumbersGenerator,
    (gen) => take(5, gen),
    (gen) => delay(1, gen),
    (gen) => onIdle(10, () => idle, gen)
  )

  for await (let value of composed()) {
    output.push(value)
  }

  expect(output).toEqual([0, 1, 2, 3, 4])
})

it('executes callback after X ms from last generated value by generator', async () => {
  let wasCallbackExecuted = false
  const composed = compose(
    createNumbersGenerator,
    (gen) => take(5, gen),
    (gen) => delay(10, gen),
    (gen) =>
      onIdle(
        5,
        () => {
          wasCallbackExecuted = true
        },
        gen
      )
  )

  await consume(composed)

  expect(wasCallbackExecuted).toBe(true)
})

it('inserts returned value from callback into generator', async () => {
  const output = []
  const composed = compose(
    createNumbersGenerator,
    (gen) => take(5, gen),
    (gen) => delay(100, gen),
    (gen) => onIdle(10, () => idle, gen)
  )

  for await (let value of composed()) {
    output.push(value)
  }

  expect(output).toEqual([0, idle, 1, idle, 2, idle, 3, idle, 4])
})

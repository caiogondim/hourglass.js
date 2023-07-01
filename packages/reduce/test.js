import { take } from '../take'
import { reduce } from '.'

async function* createNumbersGenerator() {
  const nextTick = Promise.resolve()
  let index = 0

  for (;;) {
    await nextTick
    yield index
    index += 1
  }
}

it('consumes the whole generator, applys the `reducer` function for each value, returns "reduced" value', async () => {
  const composed = take(5, createNumbersGenerator())
  const reduced = await reduce(
    composed,
    (accumulator = 0, current) => accumulator + current
  )
  expect(reduced).toBe(10)
})

it('accepts a third optional argument `initialValue` that server as the initial value for `accumulator`', async () => {
  const composed = take(5, createNumbersGenerator())
  const reduced = await reduce(
    composed,
    (accumulator, current) => accumulator + current,
    10
  )
  expect(reduced).toBe(20)
})

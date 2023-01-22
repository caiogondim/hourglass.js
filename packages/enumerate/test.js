import { take } from '../take'
import { enumerate } from '.'

async function* createNumbersGenerator() {
  const nextTick = Promise.resolve()
  let index = 0
  for (;;) {
    yield index
    index += 1
    await nextTick
  }
}

it('returns current iteration count and val from generator', async () => {
  const gen = take(3, enumerate(createNumbersGenerator()))
  const output = []

  for await (let [index, value] of gen) {
    output.push([index, value])
  }

  expect(output).toEqual([
    [0, 0],
    [1, 1],
    [2, 2],
  ])
})

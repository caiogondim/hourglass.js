import { it, expect } from '@jest/globals'
import { take } from '../take'
import { consume } from '../consume'
import { skip } from '../skip/index.js'
import { concat } from '.'

async function* createNumbersGenerator() {
  const nextTick = Promise.resolve()
  let index = 0
  for (;;) {
    yield index
    index += 1
    await nextTick
  }
}

it('concatenates all generators passed as argument', async () => {
  const gen1 = take(5, createNumbersGenerator())
  const gen2 = take(5, skip(5, createNumbersGenerator()))
  const concated = concat(gen1, gen2)
  const generated = await consume(concated)
  expect(generated).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
})

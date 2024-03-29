import { consume } from '../consume'
import { range } from '.'

async function* createNumbersGenerator() {
  const nextTick = Promise.resolve()
  let index = 0
  for (;;) {
    yield index
    index += 1
    await nextTick
  }
}

it('skip all nth values smaller than `begin` and ends the generator when n is greater than `end`', async () => {
  const output = await consume(range(5, 10, createNumbersGenerator()))
  expect(output).toEqual([5, 6, 7, 8, 9])
})

it('throws error if begin or end is not an integer number', async () => {
  await expect(() =>
    consume(range(5, 10.2, createNumbersGenerator()))
  ).rejects.toThrow(TypeError)
  await expect(() =>
    consume(range(3.14, 7, createNumbersGenerator()))
  ).rejects.toThrow(TypeError)
})

it('throws error if begin is greater than end', async () => {
  await expect(() =>
    consume(range(10, 2, createNumbersGenerator()))
  ).rejects.toThrow(RangeError)
})

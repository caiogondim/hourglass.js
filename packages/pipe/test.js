import { map } from '../map'
import { consume } from '../consume'
import { take } from '../take'
import { pipe } from '.'

async function* generateNumbers() {
  let currentNumber = 0
  const nextTick = Promise.resolve()
  for (;;) {
    await nextTick
    yield currentNumber
    currentNumber += 1
  }
}

it('composes generators from left to right', async () => {
  const piped = pipe(
    (x) => map((y) => Promise.resolve(y * y), x),
    (x) => map((y) => Promise.resolve(y * 2), x),
    (x) => take(5, x)
  )

  const output = await consume(piped(generateNumbers()))
  expect(output).toMatchInlineSnapshot(`
    [
      0,
      4,
      8,
      12,
      16,
    ]
  `)
})

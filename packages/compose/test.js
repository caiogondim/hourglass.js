import { map } from '../map'
import { consume } from '../consume'
import { take } from '../take'
import { compose } from '.'

async function* generateNumbers() {
  let currentNumber = 0
  const nextTick = Promise.resolve()
  for (;;) {
    await nextTick
    yield currentNumber
    currentNumber += 1
  }
}

it('composes generators', async () => {
  const composed = compose(
    (x) => take(5, x),
    (x) => map((y) => y * y, x),
    (x) => map((y) => y * 2, x)
  )

  const output = await consume(composed(generateNumbers()))
  expect(output).toMatchInlineSnapshot(`
    [
      0,
      1,
      16,
      81,
      256,
    ]
  `)
})

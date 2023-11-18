import { take } from '../take'
import { compose } from '../compose'
import { consume } from '../consume'
import { drop } from '.'

async function* generateNumbers() {
  const nextTick = Promise.resolve()
  let index = 0

  for (;;) {
    yield index
    index += 1
    await nextTick
  }
}

it('drops the first N values from a generator', async () => {
  const composed = compose(
    (x) => drop(5, x),
    (x) => take(5, x)
  )

  const output = await consume(composed(generateNumbers()))
  expect(output).toMatchInlineSnapshot(`
    [
      5,
      6,
      7,
      8,
      9,
    ]
  `)
})

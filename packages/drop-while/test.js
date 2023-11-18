import { take } from '../take'
import { consume } from '../consume'
import { compose } from '../compose'
import { dropWhile } from '.'

async function* generateNumbers() {
  const nextTick = Promise.resolve()
  let index = 0

  for (;;) {
    yield index
    index += 1
    await nextTick
  }
}

it('drops generated values while predicate returns `true`', async () => {
  const composed = compose(
    (x) => dropWhile((y) => y < 10, x),
    (x) => take(5, x)
  )
  const output = await consume(composed(generateNumbers()))
  expect(output).toMatchInlineSnapshot(`
    [
      10,
      11,
      12,
      13,
      14,
    ]
  `)
})

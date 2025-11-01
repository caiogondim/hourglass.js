// TODO: change API to receive gen as first param

import { compose } from '../compose'
import { take } from '../take'
import { filter } from '../filter'

import { every } from '.'

async function* generateNumbers() {
  const nextTick = Promise.resolve()
  let index = 0
  for (;;) {
    yield index
    index += 1
    await nextTick
  }
}

it('returns `true` if the predicate returns `true` for all generated value', async () => {
  const composed = compose(
    (x) => filter(x, (y) => y % 2 === 0),
    (x) => take(5, x)
  )
  const output = await every(composed(generateNumbers()), (y) => y % 2 === 0)
  expect(output).toEqual(true)
})

it('returns `false` if the predicate returns `false` for any generated value', async () => {
  const composed = compose(
    (x) => filter(x, (y) => y % 2 === 0),
    (x) => take(5, x)
  )
  const output = await every(composed(generateNumbers()), (y) => y % 2 !== 0)
  expect(output).toEqual(false)
})

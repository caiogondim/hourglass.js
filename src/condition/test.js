const condition = require('.')
const inspectable = require('../inspectable')

it('returns a promise that is resolved only when `predicate` returns `true`', async () => {
  let i = 0
  function predicate() {
    return i <= 0
  }

  const inspectableCondition = inspectable(condition(predicate))
  expect(inspectableCondition.inspect().state).toBe('pending')
  i += 1
  await inspectableCondition
  expect(inspectableCondition.inspect().state).toBe('fulfilled')
})

it('awaits `interval` miliseconds between calls to `predicate`', async () => {
  let i = 0
  const past = Date.now()
  await condition(
    () => {
      i += 1
      return i > 4
    },
    { interval: 10 }
  )
  expect(Date.now() - past).toBeGreaterThanOrEqual(40)
})

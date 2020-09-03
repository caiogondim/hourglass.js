const sleep = require('./index')

it('returns a promise that is resolved after X miliseconds', async () => {
  const before = Date.now()
  await sleep(1000)
  expect(Date.now() - before).toBeGreaterThanOrEqual(1000)
  expect(Date.now() - before).toBeLessThan(1100)
})

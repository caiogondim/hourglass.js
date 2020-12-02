const { createBackoff } = require('.')

jest.setTimeout(30000)

it('increments the previous back off time by multiplying by 2', async () => {
  const acceptanceRange = 100
  const backoff = createBackoff()

  let before = Date.now()
  await backoff()
  expect(Date.now() - before).toBeGreaterThanOrEqual(1000 - acceptanceRange)
  expect(Date.now() - before).toBeLessThan(1000 + acceptanceRange)

  before = Date.now()
  await backoff()
  expect(Date.now() - before).toBeGreaterThanOrEqual(2000 - acceptanceRange)
  expect(Date.now() - before).toBeLessThan(2000 + acceptanceRange)

  before = Date.now()
  await backoff()
  expect(Date.now() - before).toBeGreaterThanOrEqual(4000 - acceptanceRange)
  expect(Date.now() - before).toBeLessThan(4000 + acceptanceRange)
})

it('never backs off for more than `max` ms', async () => {
  const acceptanceRange = 1000
  const backoff = createBackoff({ max: 2000 })

  let before = Date.now()
  await backoff()
  expect(Date.now() - before).toBeGreaterThanOrEqual(1000 - acceptanceRange)
  expect(Date.now() - before).toBeLessThan(1000 + acceptanceRange)

  before = Date.now()
  await backoff()
  expect(Date.now() - before).toBeGreaterThanOrEqual(2000 - acceptanceRange)
  expect(Date.now() - before).toBeLessThan(2000 + acceptanceRange)

  before = Date.now()
  await backoff()
  expect(Date.now() - before).toBeGreaterThanOrEqual(2000 - acceptanceRange)
  expect(Date.now() - before).toBeLessThan(2000 + acceptanceRange)
})

it('accepts `initial` as the initial back off time', async () => {
  const acceptanceRange = 5
  const backoff = createBackoff({ initial: 10 })

  let before = Date.now()
  await backoff()
  expect(Date.now() - before).toBeGreaterThanOrEqual(10 - acceptanceRange)
  expect(Date.now() - before).toBeLessThanOrEqual(10 + acceptanceRange)

  before = Date.now()
  await backoff()
  expect(Date.now() - before).toBeGreaterThanOrEqual(20 - acceptanceRange)
  expect(Date.now() - before).toBeLessThanOrEqual(20 + acceptanceRange)

  before = Date.now()
  await backoff()
  expect(Date.now() - before).toBeGreaterThanOrEqual(40 - acceptanceRange)
  expect(Date.now() - before).toBeLessThanOrEqual(40 + acceptanceRange)
})

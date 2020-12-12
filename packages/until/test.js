const until = require('.')

it('throws an error if argument is not a Date instance', async () => {
  expect(() => until(1)).toThrow(TypeError)
  expect(() => until({})).toThrow(TypeError)
  expect(() => until(null)).toThrow(TypeError)
  expect(() => until(false)).toThrow(TypeError)
  expect(() => until('Date')).toThrow(TypeError)
  expect(() => until(new Date())).not.toThrow('TypeError')
})

it('throws an error if argument date is in the past', async () => {
  expect(() => until(new Date('December 21, 2015'))).toThrow(RangeError)
  expect(() => until(new Date('December 21, 2025'))).not.toThrow(RangeError)
})

it('resolves on the date passed as argument', async () => {
  const acceptanceRange = 100
  const date1 = new Date(Date.now())
  const date2 = new Date(date1.getTime() + 1000)
  await until(date2)
  const now = Date.now()
  expect(now).toBeGreaterThanOrEqual(date2.getTime() - acceptanceRange)
  expect(now).toBeLessThanOrEqual(date2.getTime() + acceptanceRange)
})

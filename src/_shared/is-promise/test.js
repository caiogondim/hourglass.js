const isPromise = require('.')

it('returns true if argument is a promise', () => {
  expect(isPromise(Promise.resolve())).toBe(true)
})

it('returns false if argument is not a promise', () => {
  expect(isPromise(null)).toBe(false)
  expect(isPromise(false)).toBe(false)
  expect(isPromise(true)).toBe(false)
  expect(isPromise({})).toBe(false)
  expect(isPromise(42)).toBe(false)
  expect(isPromise(-42)).toBe(false)
  expect(isPromise('')).toBe(false)
  expect(isPromise('then')).toBe(false)
  expect(isPromise({then: true})).toBe(false)
  expect(isPromise([true])).toBe(false)
})

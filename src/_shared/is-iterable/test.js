const isIterable = require('.')

it('returns true for iterable objects', () => {
  expect(isIterable([1, 2])).toBe(true)
  expect(isIterable(new Set([1, 2]))).toBe(true)
  expect(isIterable(new Set([1, 2]))).toBe(true)
  expect(isIterable({ *[Symbol.iterator]() {
    yield 1;
    yield 2;
  }})).toBe(true)
})

it('returns false for non-iterable objects', () => {
  expect(isIterable(0)).toBe(false)
  expect(isIterable(1)).toBe(false)
  expect(isIterable({})).toBe(false)
  expect(isIterable(null)).toBe(false)
  expect(isIterable(undefined)).toBe(false)
  expect(isIterable(false)).toBe(false)
  expect(isIterable(true)).toBe(false)
})
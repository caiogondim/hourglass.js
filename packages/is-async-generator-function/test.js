const isAsyncGeneratorFunction = require('.')

async function* foo() {
  yield
}

it('returns true if argument is a generator', () => {
  expect(isAsyncGeneratorFunction(foo)).toBe(true)
})

it('returns false if argument is not a generator', () => {
  expect(isAsyncGeneratorFunction({})).toBe(false)
  expect(isAsyncGeneratorFunction(1)).toBe(false)
  expect(isAsyncGeneratorFunction('foo')).toBe(false)
  expect(isAsyncGeneratorFunction(false)).toBe(false)
  expect(isAsyncGeneratorFunction(null)).toBe(false)
  expect(isAsyncGeneratorFunction()).toBe(false)
  expect(isAsyncGeneratorFunction(() => {})).toBe(false)
})

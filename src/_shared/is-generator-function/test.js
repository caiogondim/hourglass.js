const isGeneratorFunction = require('.')

it('returns true if argument is a generator', () => {
  function* foo() {
    yield
  }
  expect(isGeneratorFunction(foo)).toBe(true)
})

it('returns false if argument is not a generator', () => {
  expect(isGeneratorFunction({})).toBe(false)
  expect(isGeneratorFunction(1)).toBe(false)
  expect(isGeneratorFunction('foo')).toBe(false)
  expect(isGeneratorFunction(false)).toBe(false)
  expect(isGeneratorFunction(null)).toBe(false)
  expect(isGeneratorFunction(undefined)).toBe(false)
  expect(isGeneratorFunction(() => {})).toBe(false)
})

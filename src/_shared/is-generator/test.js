const isGenerator = require('.')

it('returns true if argument is a generator', () => {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  function* foo() {
    yield
  }
  expect(isGenerator(foo())).toBe(true)
})

it('returns false if argument is not a generator', () => {
  expect(isGenerator({})).toBe(false)
  expect(isGenerator(1)).toBe(false)
  expect(isGenerator('foo')).toBe(false)
  expect(isGenerator(false)).toBe(false)
  expect(isGenerator(null)).toBe(false)
  expect(isGenerator()).toBe(false)
  expect(isGenerator(() => {})).toBe(false)
})

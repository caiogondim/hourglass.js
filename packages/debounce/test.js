const debounce = require('.')
const compose = require('../compose')
const createNumbersGenerator = require('../../shared/create-numbers-generator')
const delay = require('../delay')
const take = require('../take')

it('debounces', async () => {
  const acceptanceInterval = 20
  const debounceTime = 50
  const composed = compose(
    createNumbersGenerator(),
    delay(20),
    debounce(debounceTime),
    take(10)
  )

  let lastGeneratedValueDate = Date.now()
  for await (let value of composed) {
    expect(Date.now() - lastGeneratedValueDate).toBeGreaterThanOrEqual(
      debounceTime - acceptanceInterval
    )
    expect(Date.now() - lastGeneratedValueDate).toBeLessThanOrEqual(
      debounceTime + acceptanceInterval
    )
    expect(typeof value).toBe('number')

    lastGeneratedValueDate = Date.now()
  }
})

it('ignores debounced values', async () => {
  const debounceTime = 50
  const composed = compose(
    createNumbersGenerator(),
    delay(25),
    debounce(debounceTime),
    take(5)
  )

  const allValues = []
  // All generated values are expected to be unique
  for await (const value of composed) {
    expect(allValues.includes(value)).toBe(false)
    allValues.push(value)
  }
})

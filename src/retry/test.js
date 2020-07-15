const assert = require('uvu/assert')
const { test } = require('uvu')
const retry = require('./index')

function createFailUntilNthCall(n, { output = 7 } = {}) {
  let callsCount = 0

  return async () => {
    console.log('qqqqq')
    callsCount += 1
    if (callsCount <= n) {
      throw new Error()
    }
    return output
  }
}

test('retry', async () => {
  const failUntilThree = createFailUntilNthCall(2, { output: 7 })
  assert.is(await retry(failUntilThree), 7)
})

test('max attempts', async () => {
  let didThrow = false
  const failUntilThree = createFailUntilNthCall(3)
  try {
    await retry(failUntilThree, { attempts: 2 })
  } catch (error) {
    didThrow = true
  }
  assert.ok(didThrow)
})

test.run()

const defer = require('../../async/defer')
const consume = require('../consume')
const tap = require('../tap')
const onReturn = require('../on-return')
const compose = require('../compose')
const sleep = require('../../timing/sleep')

function debounce(ms, gen) {
  let lastValue
  let isDone = false
  let [promise, resolve] = defer()

  const tapCallback = (n) => {
    lastValue = n
    resolve()
  }

  const onReturnCallback = () => {
    isDone = true
    resolve()
  }

  consume(compose(gen, tap(tapCallback), onReturn(onReturnCallback)))

  async function* loop() {
    for (;;) {
      const sleepPromise = sleep(ms)
      await Promise.allSettled([promise, sleepPromise])

      if (isDone) {
        return
      }

      [promise, resolve] = defer()
      yield lastValue
    }
  }

  return loop()
}

function composable(ms) {
  return async function* composableDebounce(gen) {
    yield* debounce(ms, gen)
  }
}

function main(ms, gen) {
  if (!gen) {
    return composable(ms)
  } else {
    return debounce(ms, gen)
  }
}

module.exports = main

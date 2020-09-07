function toAsyncGenerator(genFn) {
  return async function* () {
    for (let value of genFn()) {
      yield value
    }
  }
}

module.exports = toAsyncGenerator

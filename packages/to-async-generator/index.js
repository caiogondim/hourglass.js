function toAsyncGenerator(genFn) {
  return async function* () {
    for await (let value of genFn()) {
      yield value
    }
  }
}

module.exports = toAsyncGenerator

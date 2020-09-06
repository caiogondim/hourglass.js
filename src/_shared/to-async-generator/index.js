function toAsyncGenerator(genFn) {
  return async function* () {
    for (let val of genFn()) {
      yield val
    }
  }
}

module.exports = toAsyncGenerator

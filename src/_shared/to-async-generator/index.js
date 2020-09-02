function toAsyncGenerator(gen) {
  return async function* () {
    for (let val of gen()) {
      yield val
    }
  }
}

module.exports = toAsyncGenerator
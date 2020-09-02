const toAsyncGenerator = require('../to-async-generator')

/**
 * @yields {number}
 */
function* createNumbersGenerator() {
  let x = 1
  while (true) {
    yield x
    x += 1
  }
}

module.exports = {
  sync: createNumbersGenerator,
  async: toAsyncGenerator(createNumbersGenerator)
}
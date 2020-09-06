function* createNumbersGenerator() {
  let x = 1
  while (true) {
    yield x
    x += 1
  }
}

module.exports = createNumbersGenerator

function* createNumbersGenerator() {
  let x = 0
  for (;;) {
    yield x
    x += 1
  }
}

module.exports = createNumbersGenerator

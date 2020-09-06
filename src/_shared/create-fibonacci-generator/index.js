function* createFibonacciGenerator() {
  let a = 0
  let b = 1

  while (true) {
    yield b
    let tmp = a
    a = b
    b = tmp + b
  }
}

module.exports = createFibonacciGenerator

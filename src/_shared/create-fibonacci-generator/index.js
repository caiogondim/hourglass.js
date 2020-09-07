function* createFibonacciGenerator() {
  let a = 0
  let b = 1

  while (true) {
    yield b
    let temporary = a
    a = b
    b = temporary + b
  }
}

module.exports = createFibonacciGenerator

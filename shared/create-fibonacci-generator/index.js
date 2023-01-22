function* createFibonacciGenerator() {
  let a = 0
  let b = 1

  for (;;) {
    yield b
    let temporary = a
    a = b
    b = temporary + b
  }
}

module.exports = {createFibonacciGenerator}

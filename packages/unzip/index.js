// References:
// - Rust lang: https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.unzip

function unzip(zipped) {
  const zippedQueue1 = []
  const zippedQueue2 = []

  async function* unziped1() {
    // Check if there are generated values on the queue before consuming the ziped generator.
    while (zippedQueue1.length > 0) {
      yield zippedQueue1.shift()
    }

    for await (const [value1, value2] of zipped) {
      // Check if there are generated values on the queue before `yield`-ing from ziped generator.
      while (zippedQueue1.length > 0) {
        yield zippedQueue1.shift()
      }

      zippedQueue2.push(value2)
      yield value1

      // Check if there are generated value on the queue before iterating over the ziped generator.
      while (zippedQueue1.length > 0) {
        yield zippedQueue1.shift()
      }
    }
  }

  async function* unziped2() {
    while (zippedQueue2.length > 0) {
      yield zippedQueue2.shift()
    }

    for await (const [value1, value2] of zipped) {
      while (zippedQueue2.length > 0) {
        yield zippedQueue2.shift()
      }

      zippedQueue1.push(value1)
      yield value2

      while (zippedQueue2.length > 0) {
        yield zippedQueue2.shift()
      }
    }
  }

  return [unziped1(), unziped2()]
}

export { unzip }

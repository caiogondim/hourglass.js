// References:
// - Rust lang: https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.unzip

function unzip(zipped) {
  const zippedQueue1 = []
  const zippedQueue2 = []

  async function* unziped1() {
    for await (const [value1, value2] of zipped) {
      zippedQueue1.push(value1)
      zippedQueue2.push(value2)

      while (zippedQueue1.length > 0) {
        yield zippedQueue1.shift()
      }
    }

    while (zippedQueue1.length > 0) {
      yield zippedQueue1.shift()
    }
  }

  async function* unziped2() {
    for await (const [value1, value2] of zipped) {
      zippedQueue1.push(value1)
      zippedQueue2.push(value2)

      while (zippedQueue2.length > 0) {
        yield zippedQueue2.shift()
      }
    }

    while (zippedQueue2.length > 0) {
      yield zippedQueue2.shift()
    }
  }

  return [unziped1(), unziped2()]
}

export { unzip }

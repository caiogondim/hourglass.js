// References:
// - Rust lang: https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.zip
// - Python lang: https://docs.python.org/3.3/library/functions.html#zip

/**
 * @param {{ done?: boolean }[]} generatedValues
 * @returns {boolean}
 */
function isAnyGeneratorDone(generatedValues) {
  for (const currentGeneratedValue of generatedValues) {
    if (currentGeneratedValue.done) {
      return true
    }
  }

  return false
}

/**
 * @template T
 * @param {AsyncIterator<T>} gen1
 * @param {AsyncIterator<T>} gen2
 * @yields {[T, T]}
 @returns {AsyncIterable<[T, T]>}
 */
async function* zip(gen1, gen2) {
  for (;;) {
    const promises = [gen1.next(), gen2.next()]
    const generatedValues = await Promise.all(promises)
    if (isAnyGeneratorDone(generatedValues)) {
      return
    }
    yield [generatedValues[0].value, generatedValues[1].value]
  }
}

export { zip }

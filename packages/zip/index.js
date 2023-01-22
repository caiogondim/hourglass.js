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
 * @param {AsyncGenerator<T>[]} generators
 * @yields {T[]}
 */
async function* zip(...generators) {
  for (;;) {
    /** @type {Promise<{ done?: boolean, value: T}>[]} */
    const promises = []
    for (const currentGenerator of generators) {
      const currentAsyncIteration = currentGenerator.next()
      promises.push(currentAsyncIteration)
    }

    const generatedValues = await Promise.all(promises)
    if (isAnyGeneratorDone(generatedValues)) {
      return
    }
    yield generatedValues.map((currentValue) => currentValue.value)
  }
}

export { zip }

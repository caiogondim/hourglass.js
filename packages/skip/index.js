import { enumerate } from '../enumerate'

/**
 * @template T
 * @param {number} n
 * @param {AsyncIterable<T>} gen
 * @yields {T}
 */
async function* skip(n, gen) {
  for await (const [currentIndex, currentValue] of enumerate(gen)) {
    if (currentIndex < n) {
      continue
    }
    yield currentValue
  }
}

export { skip }

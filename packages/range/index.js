import { enumerate } from '../enumerate'

/**
 * @template T
 * @param {number} begin
 * @param {number} end
 * @param {AsyncIterable<T>} iterable
 * @yield {T}
 */
async function* range(begin, end, iterable) {
  if (!Number.isInteger(begin)) {
    throw new TypeError('begin must be an integer number')
  }

  if (!Number.isInteger(end)) {
    throw new TypeError('end must be an integer number')
  }

  if (begin > end) {
    throw new RangeError('end must be greater than begin')
  }

  for await (let [index, value] of enumerate(iterable)) {
    if (index < begin) {
      continue
    }

    if (index >= end) {
      return
    }

    yield value
  }
}

export { range }

import { isIterable } from '@hourglass/is-iterable'

/**
 * @template T
 * @param {(arg0: T) => Promise<T>} mapper
 * @param {AsyncIterable<T>} gen
 * @yields {T}
 */
async function* flatMap(mapper, gen) {
  for await (let value of gen) {
    /** @type {Awaited<T> | Awaited<T>[]} */
    let output = await mapper(value)
    if (!isIterable(output)) {
      output = [output]
    }
    for (let outputItem of output) {
      yield outputItem
    }
  }
}

export { flatMap }

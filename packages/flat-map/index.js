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
    let mapperOutput = await mapper(value)
    if (!isIterable(mapperOutput)) {
      mapperOutput = [mapperOutput]
    }
    for (let outputItem of mapperOutput) {
      yield outputItem
    }
  }
}

export { flatMap }

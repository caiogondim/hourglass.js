import { isIterable } from '@hourglass/is-iterable'

/**
 * @template T
 * @param {(arg0: T) => Promise<T> | Promise<Iterable<T>>} mapper
 * @param {AsyncIterable<T>} gen
 * @yields {T}
 */
async function* flatMap(mapper, gen) {
  for await (let value of gen) {
    const mapperOutput = await mapper(value)

    const mapperOutputIterable = /** @type {Iterable<T>} */ (
      (() => {
        if (!isIterable(mapperOutput)) {
          return [mapperOutput]
        }
        return mapperOutput
      })()
    )

    for (let outputItem of mapperOutputIterable) {
      yield outputItem
    }
  }
}

export { flatMap }

/**
 * @template T
 * @param {((x: T) => Promise<T>)} mapper
 * @param {AsyncIterable<T>} gen
 * @yield {T}
 */
async function* map(mapper, gen) {
  for await (let value of gen) {
    yield await mapper(value)
  }
}

export { map }

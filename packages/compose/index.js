/**
 * @template T
 * @param {...(arg0: AsyncIterable<T>) => AsyncIterable<T>} gens
 */
function compose(...gens) {

  /**
   * @param {AsyncGenerator<T>} gen
   * @yields {T}
   */
  return async function* composed(gen) {
    let outerGenerator = gens[0](gen)

    for (let index = 1; index < gens.length; index += 1) {
      const currentGen = gens[1]
      outerGenerator = currentGen(outerGenerator)
    }

    for await (let value of outerGenerator) {
      yield value
    }
  }
}

export { compose }

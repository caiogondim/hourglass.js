/**
 * @param {...AsyncIterable} gens
 * @returns {AsyncIterable}
 */
function roundRobin(...gens) {
  let index = 0
  let currentGen = gens[0]

  return {
    [Symbol.asyncIterator]() {
      return this
    },
    async next() {
      for (;;) {
        const generatorOutput = await currentGen[Symbol.asyncIterator]().next()
        if (generatorOutput.done) {
          gens = gens.filter((gen) => gen !== currentGen)
        }

        if (gens.length <= 0) {
          return {
            done: true,
          }
        }

        index = (index + 1) % gens.length
        currentGen = gens[index]

        if (generatorOutput.done) {
          continue
        }

        return {
          value: generatorOutput.value,
          done: false,
        }
      }
    },
  }
}

export { roundRobin }

function roundRobin(...gens) {
  let i = 0
  let currentGen = gens[0]

  return {
    [Symbol.asyncIterator]() {
      return this
    },
    async next() {
      for(;;) {
        const generatorOutput = await currentGen[Symbol.asyncIterator]().next()
        if (generatorOutput.done) {
          gens = gens.filter((gen) => gen !== currentGen)
        }

        if (gens.length <= 0) {
          return {
            done: true,
          }
        }

        i = (i + 1) % gens.length
        currentGen = gens[i]

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

module.exports = roundRobin

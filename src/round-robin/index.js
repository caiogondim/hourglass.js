function roundRobin(...gens) {
  let i = 0
  let curGen = gens[0]

  return {
    [Symbol.asyncIterator]() {
      return this
    },
    async next() {
      while (true) {
        const generatorOutput = await curGen[Symbol.asyncIterator]().next()
        if (generatorOutput.done) {
          gens = gens.filter((gen) => gen !== curGen)
        }

        if (gens.length <= 0) {
          return {
            done: true,
          }
        }

        i = (i + 1) % gens.length
        curGen = gens[i]

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

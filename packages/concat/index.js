function concat(...gens) {
  return {
    [Symbol.asyncIterator]() {
      return this
    },
    async next() {
      if (gens.length === 0) {
        return {
          done: true,
        }
      }

      for (;;) {
        if (gens.length === 0) {
          return {
            done: true,
          }
        }

        let gen = gens[0]

        const generatorResult = await gen[Symbol.asyncIterator]().next()

        if (generatorResult.done) {
          gens.shift()
          continue
        }

        return generatorResult
      }
    },
  }
}

module.exports = concat

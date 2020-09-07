const isGenerator = require('../_shared/is-generator')
const isAsyncGeneratorFunction = require('../_shared/is-async-generator-function')
const isGeneratorFunction = require('../_shared/is-generator-function')

function validateGenerators(...gens) {
  if (!gens || gens.length < 2) {
    throw new TypeError('Must have at least 2 generators')
  }

  for (const [i, gen] of gens.entries()) {
    if (i === 0) {
      if (
        !isAsyncGeneratorFunction(gen) &&
        !isGeneratorFunction(gen) &&
        !isGenerator(gen)
      ) {
        throw new TypeError(
          `Only AsyncGeneratorFunction, GeneratorFunction, or generator instances are accepted as first argument.`
        )
      }
    } else {
      if (!isAsyncGeneratorFunction(gen)) {
        throw new TypeError(
          `Only AsyncGeneratorFunction are accepted past the first argument.`
        )
      }
    }
  }
}

async function* compose(...gens) {
  validateGenerators(...gens)

  // Transforms foo -> bar -> qux into qux(bar(foo()))
  let composed = isGenerator(gens[0]) ? gens[0] : gens[0]()
  for (let i = 1; i < gens.length; i += 1) {
    const currentGen = gens[i]
    composed = currentGen(composed)
  }

  for await (let value of composed) {
    yield value
  }
}

module.exports = compose

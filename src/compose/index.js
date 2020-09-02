const isGenerator = require('../_shared/is-generator')
const isPromise = require('../_shared/is-promise')

function validateGenerators(gens) {
  if (!gens || gens.length <= 2) {
    throw new TypeError('Must have at least 2 generators')
  }

  for (let gen of gens) {
    if (
      typeof gen !== 'function' ||
      gen.constructor.name !== 'AsyncGeneratorFunction'
    ) {
      throw new TypeError(
        `Only AsyncGeneratorFunction is accepted. Got ${gen.constructor.name}`
      )
    }
  }
}

async function* compose(...gens) {
  validateGenerators(gens)

  // Transforms foo -> bar -> qux into qux(bar(foo()))
  let composed = gens[0]()
  for (let i = 1; i < gens.length; i += 1) {
    const curGen = gens[i]
    composed = curGen(composed)
  }

  for await (let val of composed) {
    yield val
  }
}

module.exports = compose

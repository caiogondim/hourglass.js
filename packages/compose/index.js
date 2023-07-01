function compose(...gens) {
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

// const {isGenerator} = require('../is-generator')
// const {isAsyncGeneratorFunction} = require('../is-async-generator-function')
// const {isGeneratorFunction} = require('../is-generator-function')

// function validateGenerators(...gens) {
//   if (!gens || gens.length < 2) {
//     throw new TypeError('Must have at least 2 generators')
//   }

//   for (const [index, gen] of gens.entries()) {
//     if (index === 0) {
//       if (
//         !isAsyncGeneratorFunction(gen) &&
//         !isGeneratorFunction(gen) &&
//         !isGenerator(gen)
//       ) {
//         throw new TypeError(
//           `Only AsyncGeneratorFunction, GeneratorFunction, or generator instances are accepted as first argument.`
//         )
//       }
//     } else {
//       if (!isAsyncGeneratorFunction(gen)) {
//         throw new TypeError(
//           `Only AsyncGeneratorFunction are accepted past the first argument.`
//         )
//       }
//     }
//   }
// }

// async function* compose(...gens) {
//   // validateGenerators(...gens)

//   // Transforms foo -> bar -> qux into qux(bar(foo()))
//   let composed = gens[0]()
//   for (let index = 1; index < gens.length; index += 1) {
//     const currentGen = gens[index]
//     composed = currentGen(composed)
//   }

//   for await (let value of composed) {
//     yield value
//   }
// }

// module.exports = { compose }

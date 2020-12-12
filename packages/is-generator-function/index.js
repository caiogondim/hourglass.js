function isGeneratorFunction(x) {
  return Boolean(
    x && typeof x === 'function' && x.constructor.name === 'GeneratorFunction'
  )
}

module.exports = isGeneratorFunction

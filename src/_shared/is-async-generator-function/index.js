function isAsyncGeneratorFunction(x) {
  return Boolean(
    x &&
      typeof x === 'function' &&
      x.constructor.name === 'AsyncGeneratorFunction'
  )
}

module.exports = isAsyncGeneratorFunction

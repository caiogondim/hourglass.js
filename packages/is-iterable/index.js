function isIterable(object) {
  if (!object) {
    return false
  }
  return typeof object[Symbol.iterator] === 'function'
}

module.exports = isIterable

function isIterable(obj) {
  if (!obj) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

module.exports = isIterable

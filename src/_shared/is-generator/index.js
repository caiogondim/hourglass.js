function isGenerator(x) {
  return Boolean(
    x && typeof x.next === 'function' && typeof x.throw === 'function'
  )
}

module.exports = isGenerator

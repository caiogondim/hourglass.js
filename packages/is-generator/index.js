/**
 * @param {any} x
 * @returns {boolean}
 */
function isGenerator(x) {
  return Boolean(
    x && typeof x.next === 'function' && typeof x.throw === 'function'
  )
}

export { isGenerator }

const defer = require('../defer')

function fromCallback() {
  let [promise, resolve, reject] = defer()

  function callback(val) {
    resolve(val)
  }

  async function* generator() {
    while (true) {
      ;[promise, resolve, reject] = defer()
      yield await promise
    }
  }
  return [generator(), callback]
}

module.exports = fromCallback

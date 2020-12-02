const defer = require('../../async/defer')

function fromCallback() {
  const queue = [defer()]

  function callback(value) {
    const [, resolve] = queue[queue.length - 1]
    resolve(value)
    queue.push(defer())
  }

  async function* generator() {
    for (;;) {
      const promise = queue[0][0]
      yield await promise
      queue.shift()
    }
  }
  return [generator(), callback]
}

module.exports = fromCallback

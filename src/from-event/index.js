const defer = require('../defer')

async function* fromEvent(eventName, emitter) {
  let queue = [defer()]

  // $TODO: support addEventListener APi
  emitter.on(eventName, (...args) => {
    const [, resolve] = queue[queue.length - 1]
    resolve(...args)
    queue.push(defer())
  })

  while (true) {
    const promise = queue[0][0]
    yield await promise
    queue.shift()
  }
}

module.exports = fromEvent

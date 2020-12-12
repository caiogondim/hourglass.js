const defer = require('@hourglass/defer')

async function* fromEvent(eventName, emitter) {
  if (
    !emitter ||
    (typeof emitter.on !== 'function' &&
      typeof emitter.addEventListener !== 'function')
  ) {
    throw new TypeError(
      'emitter must implement EventTarget or EventEmitter interface'
    )
  }

  let queue = [defer()]

  const eventCallback = (...arguments_) => {
    const [, resolve] = queue[queue.length - 1]
    resolve(...arguments_)
    queue.push(defer())
  }

  if (typeof emitter.on === 'function') {
    emitter.on(eventName, eventCallback)
  } else {
    emitter.addEventListener(eventName, eventCallback)
  }

  for (;;) {
    const promise = queue[0][0]
    yield await promise
    queue.shift()
  }
}

module.exports = fromEvent

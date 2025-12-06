import { defer } from '@hourglass/defer'

/**
 * @param {Function} function_
 * @returns {Function}
 */
function queued(function_) {
  if (typeof function_ !== 'function') {
    throw new TypeError('Provided argument is not a function')
  }

  const promiseQueue = []

  return async function (...arguments_) {
    const [promise, resolve, reject] = defer()
    promiseQueue.push({ promise, resolve, reject, args: arguments_ })
    if (promiseQueue.length === 1) {
      try {
        const arguments_ = promiseQueue[0].args
        const output = await function_(...arguments_)
        promiseQueue.shift()
        resolve(output)
      } catch (error) {
        promiseQueue.shift()
        reject(error)
      }
    } else {
      promiseQueue[promiseQueue.length - 2].promise.then(async () => {
        try {
          const arguments_ = promiseQueue[0].args
          const output = await function_(...arguments_)
          promiseQueue.shift()
          resolve(output)
        } catch (error) {
          promiseQueue.shift()
          reject(error)
        }
      })
    }

    return promise
  }
}

export { queued }

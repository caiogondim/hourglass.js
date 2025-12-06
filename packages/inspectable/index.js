// Implements https://github.com/jamiebuilds/proposal-promise-prototype-inspect

import { defer } from '@hourglass/defer'

/**
 * @param {Promise} originalPromise
 * @returns {Promise}
 */
function inspectable(originalPromise) {
  if (typeof originalPromise.inspect === 'function') {
    return originalPromise
  }

  let internal = {
    state: 'pending',
  }

  const [proxyPromise, resolveProxy, rejectProxy] = defer()

  proxyPromise.inspect = () => {
    return internal
  }

  originalPromise.then(
    (value) => {
      internal = {
        state: 'fulfilled',
        value,
      }

      resolveProxy(value)
    },
    (error) => {
      internal = {
        state: 'rejected',
        reason: error,
      }

      rejectProxy(error)
    }
  )

  return proxyPromise
}

export { inspectable }

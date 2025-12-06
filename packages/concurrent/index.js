import { defer } from '@hourglass/defer'

/**
 * @param {Function[]} thunks
 * @param {Object} options
 * @param {number} options.limit
 * @returns {Promise}
 */
function concurrent(thunks, { limit = Number.POSITIVE_INFINITY } = {}) {
  if (thunks.length <= 0) {
    throw new TypeError('"thunks" array is empty')
  }

  const output = Array.from({length: thunks.length})

  let pending = thunks.length
  let fulfilled = 0
  let running = 0

  let headIndex = -1
  const [promise, resolve] = defer()

  async function loop() {
    if (pending === 0) {
      resolve(output)
      return
    }

    if (running >= limit) {
      return
    }

    if (thunks.length <= 0) {
      return
    }

    const thunk = thunks.shift()
    headIndex += 1
    const index = headIndex
    running += 1
    const result = await thunk()
    running -= 1
    output[index] = result
    fulfilled += 1
    pending -= 1

    loop()
  }

  //
  for (let index = 0; index < limit && index < pending; index += 1) {
    loop()
  }

  Object.defineProperty(promise, 'pending', {
    get() {
      return pending
    },
    set() {
      throw new TypeError('"pending" is read-only')
    },
  })
  Object.defineProperty(promise, 'fulfilled', {
    get() {
      return fulfilled
    },
    set() {
      throw new TypeError('"fulfilled" is read-only')
    },
  })

  return promise
}

export { concurrent }

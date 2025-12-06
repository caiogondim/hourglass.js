/**
 * Like Promise.allSettled but for concurrent thunks with concurrency limit
 * Returns an array of outcome objects with status and value/reason
 *
 * @param {Function[]} thunks - Array of async functions to execute
 * @param {Object} options - Options object
 * @param {number} options.limit - Maximum number of concurrent executions
 * @returns {Promise<Array>} Array of outcome objects
 */
async function allSettledConcurrent(
  thunks,
  { limit = Number.POSITIVE_INFINITY } = {},
) {
  if (thunks.length <= 0) {
    return []
  }

  const results = Array.from({ length: thunks.length })
  let index = 0
  let running = 0

  return new Promise((resolve) => {
    async function run() {
      if (index >= thunks.length) {
        if (running === 0) {
          resolve(results)
        }
        return
      }

      const currentIndex = index
      const thunk = thunks[currentIndex]
      index += 1
      running += 1

      try {
        const value = await thunk()
        results[currentIndex] = { status: 'fulfilled', value }
      } catch (error) {
        results[currentIndex] = { status: 'rejected', reason: error }
      } finally {
        running -= 1
        run()
      }
    }

    // Start initial batch
    const initialCount = Math.min(limit, thunks.length)
    for (let i = 0; i < initialCount; i += 1) {
      run()
    }
  })
}

export { allSettledConcurrent }

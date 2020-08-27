/**
 * @param {function(): Promise<any>} asyncThunk
 * @param {Object} options
 * @param {Number} [options.maxAttempts]
 * @param {function(any): boolean} [options.shouldRetry]
 * @param {function(): void} [options.onRetry]
 * @returns {ReturnType<asyncThunk>}
 */
async function retry(
  asyncThunk,
  { maxAttempts = 3, shouldRetry = () => false, onRetry = () => {} } = {}
) {
  let response;

  for (let attempts = 0; attempts < maxAttempts; attempts += 1) {
    try {
      response = await asyncThunk();
      if (!shouldRetry(response)) {
        return response;
      }
      onRetry();
    } catch (error) {
      if (attempts === maxAttempts - 1) {
        throw error;
      } else {
        onRetry();
      }
    }
  }

  return response;
}

module.exports = retry;

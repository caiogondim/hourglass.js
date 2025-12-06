/**
 * @param {Function} callback
 * @param {AsyncIterable} gen
 * @returns {AsyncGenerator}
 */
async function* onReturn(callback, gen) {
  yield* gen
  await callback()
}

export { onReturn }

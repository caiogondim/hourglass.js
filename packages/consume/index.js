/**
 * @template T
 * @param {AsyncIterable<T>} gen
 * @return {Promise<T[]>}
 */
async function consume(gen) {
  const output = []
  for await (let value of gen) {
    output.push(value)
  }
  return output
}

export { consume }

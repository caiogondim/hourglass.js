/**
 * @param {any} input
 * @param {...[Function]} steps
 * @returns {Promise<any>}
 */
async function pipe(input, ...steps) {
  let output = input
  for (let step of steps) {
    output = await step(output)
  }

  return output
}

module.exports = pipe

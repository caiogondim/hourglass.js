// TODO: change signature
// const pipe = createPipeline(transfornm1, transfrme2, ...)
// const ouptu = await pipeline(asyncGenerator)

/**
 * @param {...Function} pipes
 * @returns {Function}
 */
function pipeline(...pipes) {
  return async function* (iterable) {
    let headGenerator = null

    for (let index = pipes.length - 1; index >= 0; index -= 1) {
      const currentPipe = pipes[index]
      headGenerator = headGenerator === null ? currentPipe(iterable) : currentPipe(headGenerator);
    }
    yield* headGenerator
  }
}

export { pipeline }

// const fiveNumbersGenerator = pipeline((x) => skip(5, x), (x) => take(5, x))
// afor await (const value of fiveNumbersGenerator(numbers)) {

// }

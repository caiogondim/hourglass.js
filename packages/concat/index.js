/**
 * @template T
 * @param {...AsyncIterable<T>} gens
 * @yields {T}
 */
async function* concat(...gens) {
  for await (const gen of gens) {
    yield* gen
  }
}

export { concat }

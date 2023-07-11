import { compose } from '@hourglass/compose'

/**
 * @template T
 * @param {...(arg0: AsyncIterable<T>) => AsyncIterable<T>} gens
 */
function pipe(...gens) {
  const pipeReversed = gens.reverse()
  return compose(...pipeReversed)
}

export { pipe }

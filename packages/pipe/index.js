import { compose } from '@hourglass/compose'

function pipe(...gens) {
	const pipeReversed = gens.reverse()
	return compose(...pipeReversed)
}

export { pipe }

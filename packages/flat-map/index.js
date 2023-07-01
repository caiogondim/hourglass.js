import { isIterable } from '@hourglass/is-iterable'

async function* flatMap(mapper, gen) {
  for await (let value of gen) {
    let output = await mapper(value)
    if (!isIterable(output)) {
      output = [output]
    }
    for (let outputItem of output) {
      yield outputItem
    }
  }
}

export { flatMap }

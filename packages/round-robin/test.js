import { take } from '@hourglass/take'
import { compose } from '@hourglass/compose'
import { consume } from '@hourglass/consume'
import { skip } from '@hourglass/skip'
import { roundRobin } from '.'

async function* createNumbersGenerator() {
  let index = 0
  while (true) {
    yield index
    index += 1
  }
}

it('reads values from generators passed as arguments in a round-robin fashion', async () => {
  const evensGenerator = compose(createNumbersGenerator, (gen) => take(5, gen))
  const oddsGenerator = compose(createNumbersGenerator, (gen) => skip(5, gen), (gen) => take(5, gen))
  const output = await consume(roundRobin(evensGenerator(), oddsGenerator()))
  expect(output).toEqual([0, 5, 1, 6, 2, 7, 3, 8, 4, 9])
})

it('works with generators of different sizes', async () => {
  const generators = []
  generators.push(compose(createNumbersGenerator, (gen) => take(1, gen))())
  generators.push(compose(createNumbersGenerator, (gen) => skip(1, gen), (gen) => take(2, gen))())
  generators.push(compose(createNumbersGenerator, (gen) => skip(3, gen), (gen) => take(5, gen))())

  const output = await consume(roundRobin(...generators))
  expect(output).toEqual([0, 1, 3, 4, 2, 5, 6, 7])
})

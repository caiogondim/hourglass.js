import { map } from '@hourglass/map'
import { take } from '@hourglass/take'
import { interval } from '@hourglass/interval'
import { consume } from '@hourglass/consume'
import { pipeline } from '.'

async function* createNumbersGenerator() {
  let index = 0
  while (true) {
    yield index
    index += 1
  }
}

describe('input', () => {
  it.todo('accepts N functions that returns a sync generator')

  it.todo('accepts N functions that returns an async generator')

  it.todo('accepts N functions that returns a sync iterable')

  it.todo('accepts N functions that returns an async iterable')

  it.todo(
    'throws a `TypeError` in case one of the inputs doesnt returns an iterable or async iterable object'
  )

  it.todo('throws a `TypeError` if number of pipes are smaller than 2')

  it.todo('arguments passed on order a, b, c are applied like a(b(c()))')
})

describe('output', () => {
  it('is a function that returns an async generator', () => {})

  it('accepts a sync generator as input', async () => {
    const pipe = pipeline(
      (x) => map((y) => 2 * y, x),
      (x) => take(5, x)
    )
    const numsGen = createNumbersGenerator()
    const pipeOutput = await consume(pipe(numsGen))
    expect(pipeOutput).toEqual([0, 2, 4, 6, 8])
  })

  it('accepts an async generator as input', async () => {
    const pipe = pipeline(
      (x) => map((y) => 2 * y, x),
      (x) => take(5, x)
    )
    const asyncNumsGen = interval(100, createNumbersGenerator())
    const pipeOutput = await consume(pipe(asyncNumsGen))
    expect(pipeOutput).toEqual([0, 2, 4, 6, 8])
  })

  it('accepts an iterable as input', async () => {
    const pipe = pipeline(
      (x) => map((y) => 3 * y, x),
      (x) => take(5, x)
    )
    const pipeOutput = await consume(pipe([0, 1, 2, 3, 4]))
    expect(pipeOutput).toEqual([0, 3, 6, 9, 12])
  })

  it.todo('accepts an async iterable as input')
})

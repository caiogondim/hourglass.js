import { map } from '../map'
import { take } from '../take/index.js'
import { consume } from '../consume/index.js'
import { zip } from '../zip'
import { unzip } from './index.js'

async function* generateNumbers() {
  const nextTick = Promise.resolve()
  let index = 0
  for (;;) {
    yield index
    index += 1
    await nextTick
  }
}

const generateEvenNumbers = () =>
  take(
    5,
    map(async (x) => x * 2, generateNumbers())
  )
const generateOddNumbers = () =>
  take(
    5,
    map(async (x) => x * 2 + 1, generateNumbers())
  )

it('is symmetric with `zip`', async () => {
  const zipped = zip(generateEvenNumbers(), generateOddNumbers())
  const consumedZipped = await consume(zipped)
  expect(consumedZipped).toEqual([
    [0, 1],
    [2, 3],
    [4, 5],
    [6, 7],
    [8, 9],
  ])

  const [unzippedEvenNumbers, unzippedOddNumbers] = unzip(
    zip(generateEvenNumbers(), generateOddNumbers())
  )
  const consumedUnzippedEvenNumbers = await consume(unzippedEvenNumbers)
  const consumedUnzippedOddNumbers = await consume(unzippedOddNumbers)

  expect(consumedUnzippedEvenNumbers).toEqual([0, 2, 4, 6, 8])
  expect(consumedUnzippedOddNumbers).toEqual([1, 3, 5, 7, 9])
})

it('unzips a zipped pair of async generators', async () => {
  

  const zipped = zip(generateEvenNumbers(), generateOddNumbers())
  const [unzippedEvenNumbers, unzippedOddNumbers] = unzip(zipped)

  const consumedUnzippedEvenNumbers = await consume(unzippedEvenNumbers)
  const consumedUnzippedOddNumbers = await consume(unzippedOddNumbers)

  expect(consumedUnzippedEvenNumbers).toEqual([0, 2, 4, 6, 8])
  expect(consumedUnzippedOddNumbers).toEqual([1, 3, 5, 7, 9])
})

it('returns a pair of async generators that can be consumed independently', async () => {

  const zipped = zip(generateEvenNumbers(), generateOddNumbers())
  const [unzippedEvenNumbers, unzippedOddNumbers] = unzip(zipped)

  const consumedUnzippedEvenNumbers = await consume(unzippedEvenNumbers)
  expect(consumedUnzippedEvenNumbers).toEqual([0, 2, 4, 6, 8])

  const consumedUnzippedOddNumbers = await consume(unzippedOddNumbers)
  expect(consumedUnzippedOddNumbers).toEqual([1, 3, 5, 7, 9])
})

it('returns a pair of async generators that can be consumed independently', async () => {

  const zipped = zip(generateEvenNumbers(), generateOddNumbers())
  const [unzippedEvenNumbers, unzippedOddNumbers] = unzip(zipped)

  const consumedUnzippedOddNumbers = await consume(unzippedOddNumbers)
  expect(consumedUnzippedOddNumbers).toEqual([1, 3, 5, 7, 9])

  const consumedUnzippedEvenNumbers = await consume(unzippedEvenNumbers)
  expect(consumedUnzippedEvenNumbers).toEqual([0, 2, 4, 6, 8])
})
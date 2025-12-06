import { sleep } from '@hourglass/sleep'
import { allSettledConcurrent } from '.'

it('returns empty array for empty input', async () => {
  const result = await allSettledConcurrent([])
  expect(result).toEqual([])
})

it('returns outcome objects with fulfilled status', async () => {
  const thunks = [
    async () => 1,
    async () => 2,
    async () => 3
  ]

  const results = await allSettledConcurrent(thunks)

  expect(results).toEqual([
    { status: 'fulfilled', value: 1 },
    { status: 'fulfilled', value: 2 },
    { status: 'fulfilled', value: 3 }
  ])
})

it('returns outcome objects with rejected status for errors', async () => {
  const error = new Error('test error')
  const thunks = [
    async () => 1,
    async () => { throw error },
    async () => 3
  ]

  const results = await allSettledConcurrent(thunks)

  expect(results).toEqual([
    { status: 'fulfilled', value: 1 },
    { status: 'rejected', reason: error },
    { status: 'fulfilled', value: 3 }
  ])
})

it('respects concurrency limit', async () => {
  let concurrent = 0
  let maxConcurrent = 0

  const thunks = Array.from({ length: 10 }, (_, i) => async () => {
    concurrent += 1
    maxConcurrent = Math.max(maxConcurrent, concurrent)
    await sleep(10)
    concurrent -= 1
    return i
  })

  await allSettledConcurrent(thunks, { limit: 3 })

  expect(maxConcurrent).toBe(3)
})

it('maintains result order regardless of completion order', async () => {
  const thunks = [
    async () => { await sleep(30); return 'slow' },
    async () => { await sleep(10); return 'fast' },
    async () => { await sleep(20); return 'medium' }
  ]

  const results = await allSettledConcurrent(thunks)

  expect(results.map((r) => r.value)).toEqual(['slow', 'fast', 'medium'])
})

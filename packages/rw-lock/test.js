import { sleep } from '@hourglass/sleep'
import { RWLock } from '.'

it('allows multiple concurrent readers', async () => {
  const rwLock = new RWLock()
  const results = []

  async function reader(id) {
    const release = await rwLock.acquireRead()
    results.push(`reader-${id}-start`)
    await sleep(10)
    results.push(`reader-${id}-end`)
    release()
  }

  await Promise.all([reader(1), reader(2), reader(3)])

  // All readers should overlap
  expect(results).toContain('reader-1-start')
  expect(results).toContain('reader-2-start')
  expect(results).toContain('reader-3-start')
  expect(results.filter((r) => r.includes('start'))).toHaveLength(3)
})

it('blocks writer when readers are active', async () => {
  const rwLock = new RWLock()
  const results = []

  const releaseRead = await rwLock.acquireRead()
  results.push('reader-acquired')

  const writerPromise = rwLock.acquireWrite().then((release) => {
    results.push('writer-acquired')
    release()
  })

  await sleep(10)
  expect(results).toEqual(['reader-acquired'])

  releaseRead()
  await writerPromise
  expect(results).toEqual(['reader-acquired', 'writer-acquired'])
})

it('blocks readers when writer is active', async () => {
  const rwLock = new RWLock()
  const results = []

  const releaseWrite = await rwLock.acquireWrite()
  results.push('writer-acquired')

  const readerPromise = rwLock.acquireRead().then((release) => {
    results.push('reader-acquired')
    release()
  })

  await sleep(10)
  expect(results).toEqual(['writer-acquired'])

  releaseWrite()
  await readerPromise
  expect(results).toEqual(['writer-acquired', 'reader-acquired'])
})

it('tracks reader count correctly', async () => {
  const rwLock = new RWLock()

  expect(rwLock.readers).toBe(0)

  const release1 = await rwLock.acquireRead()
  expect(rwLock.readers).toBe(1)

  const release2 = await rwLock.acquireRead()
  expect(rwLock.readers).toBe(2)

  release1()
  expect(rwLock.readers).toBe(1)

  release2()
  expect(rwLock.readers).toBe(0)
})

it('tracks writer status correctly', async () => {
  const rwLock = new RWLock()

  expect(rwLock.hasWriter).toBe(false)

  const release = await rwLock.acquireWrite()
  expect(rwLock.hasWriter).toBe(true)

  release()
  await sleep(0)
  expect(rwLock.hasWriter).toBe(false)
})

it('prioritizes writers over readers', async () => {
  const rwLock = new RWLock()
  const order = []

  const releaseRead1 = await rwLock.acquireRead()

  // Queue a writer
  const writerPromise = rwLock.acquireWrite().then((release) => {
    order.push('writer')
    release()
  })

  // Queue a reader (should wait for writer)
  const readerPromise = rwLock.acquireRead().then((release) => {
    order.push('reader')
    release()
  })

  await sleep(5)
  releaseRead1()

  await Promise.all([writerPromise, readerPromise])
  expect(order).toEqual(['writer', 'reader'])
})

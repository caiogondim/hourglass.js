const Mutex = require('./')

it('asd', async () => {
  class Counter {
    constructor() {
      this._mutex = new Mutex()
      this._count = 0
    }

    get count() {
      return this._count
    }

    async add(x) {
      const unlock = await this._mutex.lock()
      this._count += x
      unlock()
    }
  }

  const counter = new Counter()
  setTimeout(async () => {
    await counter.add(3)
    expect(counter.count).toBe(3)
  }, 1)
  setTimeout(async () => {
    await counter.add(4)
    expect(counter.count).toBe(7)
  }, 2)
  setTimeout(async () => {
    await counter.add(5)
    expect(counter.count).toBe(11)
  }, 3)
})

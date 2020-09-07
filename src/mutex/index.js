// const mutex = new Mutex()
// const unlock = await mutex.lock()
// ...
// await unlock()

class Mutex {
  constructor() {
    this._queue = []
  }

  async lock() {
    return new Promise((resolve) => {
      // eslint-disable-next-line unicorn/consistent-function-scoping
      function unlock() {
        if (this._queue.length > 0) {
          const thunk = this._queue.shift()
          thunk()
        }
      }

      this._queue.push(() => resolve(unlock))

      if (this._queue.length === 1) {
        const thunk = this._queue.shift()
        thunk()
      }
    })
  }
}

module.exports = Mutex

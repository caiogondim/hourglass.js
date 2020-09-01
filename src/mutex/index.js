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

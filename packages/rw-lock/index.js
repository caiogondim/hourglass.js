/**
 * Read-Write Lock implementation
 * Allows multiple concurrent readers OR one exclusive writer
 * @example
 * const rwLock = new RWLock()
 * const releaseRead = await rwLock.acquireRead()
 * // ... read operation ...
 * releaseRead()
 *
 * const releaseWrite = await rwLock.acquireWrite()
 * // ... write operation ...
 * releaseWrite()
 */
class RWLock {
  constructor() {
    this._readers = 0
    this._writer = false
    this._readQueue = []
    this._writeQueue = []
  }

  /**
   * Acquire a read lock (multiple readers allowed)
   * @returns {Promise<Function>} Returns a function to release the read lock
   */
  async acquireRead() {
    return new Promise((resolve) => {
      const tryAcquire = () => {
        if (!this._writer && this._writeQueue.length === 0) {
          this._readers += 1
          resolve(() => this._releaseRead())
        } else {
          this._readQueue.push(tryAcquire)
        }
      }
      tryAcquire()
    })
  }

  /**
   * Acquire a write lock (exclusive access)
   * @returns {Promise<Function>} Returns a function to release the write lock
   */
  async acquireWrite() {
    return new Promise((resolve) => {
      const tryAcquire = () => {
        if (!this._writer && this._readers === 0) {
          this._writer = true
          resolve(() => this._releaseWrite())
        } else {
          this._writeQueue.push(tryAcquire)
        }
      }
      tryAcquire()
    })
  }

  _releaseRead() {
    this._readers -= 1
    if (this._readers === 0 && this._writeQueue.length > 0) {
      const next = this._writeQueue.shift()
      next()
    }
  }

  _releaseWrite() {
    this._writer = false
    // Prioritize waiting writers
    if (this._writeQueue.length > 0) {
      const next = this._writeQueue.shift()
      next()
    } else {
      // Allow all waiting readers
      while (this._readQueue.length > 0) {
        const next = this._readQueue.shift()
        next()
      }
    }
  }

  /**
   * Get number of active readers
   * @returns {number}
   */
  get readers() {
    return this._readers
  }

  /**
   * Check if a writer is active
   * @returns {boolean}
   */
  get hasWriter() {
    return this._writer
  }
}

export { RWLock }

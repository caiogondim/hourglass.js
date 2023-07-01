import { defer } from '../defer'

const finalizationToken = Symbol()

function fromCallback() {
  const queue = [defer()]

  /**
   * @param {unknown} value
   * @returns {void}
   */
  function callback(value) {
    const [, resolve] = queue[queue.length - 1]
    resolve(value)
    queue.push(defer())
  }

  async function* generator() {
    for (;;) {
      const promise = queue[0][0]
      const value = await promise

      if (value === finalizationToken) {
        return
      }

      yield value
      queue.shift()
    }
  }

  return { callback, generator: generator() }
}

export { fromCallback, finalizationToken }

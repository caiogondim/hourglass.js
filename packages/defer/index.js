/**
 * @returns {[Promise<any>, (value: any) => void, (reason?: any) => void]}
 */
function defer() {
  /** @type {unknown} */
  let resolve

  /** @type {unknown} */
  let reject

  const promise = new Promise((resolve_, reject_) => {
    resolve = resolve_
    reject = reject_
  })

  return [
    promise,
    /** @type {(value: any) => void} */ (resolve),
    /** @type {(reason?: any) => void} */ (reject),
  ]
}

export { defer }

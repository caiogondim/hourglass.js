async function* onIdle(ms, callback, gen) {
  let wasIdle = false
  let timeout = null
  let callbackReturn = undefined

  for await (let val of gen) {
    if (callbackReturn !== undefined) {
      yield callbackReturn
      callbackReturn = undefined
    }

    clearTimeout(timeout)
    timeout = setTimeout(async () => {
      callbackReturn = await callback()
    }, ms)

    yield val
  }
}

function composable(ms, callback) {
  return async function* (gen) {
    yield* onIdle(ms, callback, gen)
  }
}

function main(ms, callback, gen) {
  if (!gen) {
    return composable(ms, callback)
  } else {
    return onIdle(ms, callback, gen)
  }
}

module.exports = main

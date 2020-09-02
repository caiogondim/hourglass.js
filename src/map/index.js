async function* map(gen, fn) {
  for await (let val of gen) {
    yield await fn(val)
  }
}

module.exports = map

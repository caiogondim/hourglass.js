async function* filter(gen, predicate) {
  for await (let val of gen) {
    if (!predicate(val)) continue
    yield val
  }
}

module.exports = filter

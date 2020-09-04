async function* enumerate(gen) {
  let count = 0
  for await (let val of gen) {
    yield [count, val]
    count += 1
  }
}

module.exports = enumerate

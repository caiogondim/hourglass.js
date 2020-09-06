async function consume(gen) {
  const output = []
  for await (let val of gen) {
    output.push(val)
  }
  return output
}

module.exports = consume

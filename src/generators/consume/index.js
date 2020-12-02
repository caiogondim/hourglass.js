async function consume(gen) {
  const output = []
  for await (let value of gen) {
    output.push(value)
  }
  return output
}

module.exports = consume

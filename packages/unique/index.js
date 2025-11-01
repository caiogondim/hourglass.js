/**
 * @template T
 * @param {AsyncIterable<T>} gen
 */
function unique(gen) {
  const seen = new Set()
  
  return (async function* () {
    for await (const item of gen) {
      // TODO: dont serialize item
      const key = JSON.stringify(item)
      if (!seen.has(key)) {
        seen.add(key)
        yield item
      }
    }
  })()
}

export { unique }

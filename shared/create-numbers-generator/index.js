const nextTick = Promise.resolve()

async function* createNumbersGenerator() {
  let x = 0
  for (;;) {
    yield x
    x += 1
    await nextTick
  }
}

module.exports = {createNumbersGenerator}

async function retry(thunk, { attempts =  3 }= {}) {
  let attemptsCount = 1
  while (true) {
    try {
      return await thunk()
    } catch (error) {
      if (attemptsCount >= attempts) {
        throw error
      } 
    } finally {
      attemptsCount += 1
    }
  }
}

module.exports = retry

// Jest custom matcher API: https://jestjs.io/docs/en/expect#custom-matchers-api

expect.extend({
  toBeNear(received, expected, { delta = 1 }) {
    const failMsg = `${received} is not in the range of ${
      expected - delta
    } and ${expected + delta}`

    if (expected + delta < received) {
      return {
        pass: false,
        message: () => failMsg,
      }
    }

    if (expected - delta > received) {
      return {
        pass: false,
        message: () => failMsg,
      }
    }

    return {
      pass: true,
      message: () => failMsg,
    }
  },
})

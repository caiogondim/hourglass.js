const sleep = require("../sleep");

const defaultOptions = {
  initialDelay: 1000,
  maxDelay: 30000,
  maxAttempts: Infinity,
  jitter: false,
  intervalGenerator: () => {},
};

async function backoff(thunk, options = {}) {
  options = {
    ...defaultOptions,
    ...options,
  };
  let curAttempt = 0;
  let delay = options.initialDelay;
  while (true) {
    try {
      if (curAttempt > 0) {
        await sleep(delay);
      }
      return await thunk();
    } catch (error) {
      if (curAttempt > 0) {
        delay = delay * 2;
      }
      curAttempt += 1;
    }
  }
}

module.exports = backoff;

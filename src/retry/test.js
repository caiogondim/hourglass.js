const retry = require('.');

/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

/**
 * @param {number} n
 * @returns {function(): Promise<string>}
 */
function createThrowUntilN(n) {
  let callCount = 0;
  return async () => {
    callCount += 1;
    await sleep(100);
    if (callCount < n) {
      throw new Error();
    } else {
      return 'lorem';
    }
  };
}

it('retries if thunk throws error', async () => {
  //
  // Test behavior without `retry`
  //

  const throwUntil3 = createThrowUntilN(3);
  await expect(throwUntil3()).rejects.toThrow(Error);
  await expect(throwUntil3()).rejects.toThrow(Error);
  await expect(throwUntil3()).resolves.toEqual('lorem');

  //
  // Test behavior with `retry`
  //

  await expect(retry(createThrowUntilN(3))).resolves.toEqual('lorem');
});

it('retries up to `maxAttempts`', async () => {
  await expect(retry(createThrowUntilN(3), { maxAttempts: 2 })).rejects.toThrow(Error);
});

it('retries in case `shouldRetry` returns true', async () => {
  function createNumberGenerator() {
    let num = 0;
    return async () => {
      num += 1;
      await sleep(100);
      return num;
    };
  }
  const numberGenerator = createNumberGenerator();

  /**
   * @param {number} num
   * @returns {boolean}
   */
  function shouldRetry(num) {
    return num < 2;
  }

  await expect(retry(numberGenerator, { shouldRetry })).resolves.toBe(2);
});

it('executes `onRetry` on each retry', async () => {
  const maxAttempts = 3;
  let onRetryCalls = 0;
  function onRetry() {
    onRetryCalls += 1;
  }
  const throwUntil3 = createThrowUntilN(3);
  await retry(throwUntil3, { onRetry, maxAttempts });
  expect(onRetryCalls).toBe(maxAttempts - 1);
});

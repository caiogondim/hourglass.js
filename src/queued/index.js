const defer = require("../defer");

function queued(fn) {
  if (typeof fn !== "function") {
    throw new TypeError("Provided argument is not a function");
  }

  const promiseQueue = [];

  return async function (...args) {
    const [promise, resolve, reject] = defer();
    promiseQueue.push({ promise, resolve, reject, args });
    if (promiseQueue.length === 1) {
      try {
        const args = promiseQueue[0].args;
        const output = await fn(...args);
        promiseQueue.shift();
        resolve(output);
      } catch (error) {
        promiseQueue.shift();
        reject(error);
      }
    } else {
      promiseQueue[promiseQueue.length - 2].promise.then(async () => {
        try {
          const args = promiseQueue[0].args;
          const output = await fn(...args);
          promiseQueue.shift();
          resolve(output);
        } catch (error) {
          promiseQueue.shift();
          reject(error);
        }
      });
    }

    return promise;
  };
}

module.exports = queued;

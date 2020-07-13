const backoff = require("./index");
const { test } = require("uvu");
const assert = require("uvu/assert");

function createThunkFailUntilNthCall(n) {
  let curN = 0;
  return () => {
    return new Promise((resolve, reject) => {
      if (curN < n) {
        curN += 1;
        return reject();
      }
      resolve();
    });
  };
}

test("", async () => {
  const failBeforeThirdAttempt = createThunkFailUntilNthCall(3);
  const past = Date.now();
  await backoff(failBeforeThirdAttempt);
  const deltaTime = Date.now() - past;
  assert.ok(deltaTime >= 7000); // 1 + 2 + 4 = 7
  assert.ok(deltaTime < 8000);
});

test.run();

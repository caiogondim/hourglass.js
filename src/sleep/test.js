const { test } = require("uvu");
const assert = require("uvu/assert");
const sleep = require("./index");

test("it returns a promise that is resolved after X miliseconds", async () => {
  const past = Date.now();
  await sleep(1000);
  assert.ok(Date.now() - past >= 1000);
});

test.run();

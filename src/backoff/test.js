const { createBackoff } = require('.');

jest.setTimeout(30000);

const delta = 100;

it('increments the previous back off time by multiplying by 2', async () => {
  const backoff = createBackoff();

  let before = Date.now();
  await backoff();
  expect(Date.now() - before).toBeNear(1000, { delta })

  before = Date.now();
  await backoff();
  expect(Date.now() - before).toBeNear(2000, { delta });

  before = Date.now();
  await backoff();
  expect(Date.now() - before).toBeNear(4000, { delta });
});

it('never backs off for more than `max` ms', async () => {
  const backoff = createBackoff({ max: 2000 });

  let before = Date.now();
  await backoff();
  expect(Date.now() - before).toBeNear(1000, {delta});

  before = Date.now();
  await backoff();
  expect(Date.now() - before).toBeNear(2000, { delta });

  before = Date.now();
  await backoff();
  expect(Date.now() - before).toBeNear(2000, { delta });
});

it('accepts `initial` as the initial back off time', async () => {
  const backoff = createBackoff({ initial: 10 });

  let before = Date.now();
  await backoff();
  expect(Date.now() - before).toBeNear(10, { delta: 10 });

  before = Date.now();
  await backoff();
  expect(Date.now() - before).toBeNear(20, { delta: 10});

  before = Date.now();
  await backoff();
  expect(Date.now() - before).toBeNear(40, { delta: 10 });
});

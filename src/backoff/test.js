const { createBackoff } = require('.');

jest.setTimeout(30000);

it('increments the previous back off time by multiplying by 2', async () => {
  const backoff = createBackoff();

  let before = Date.now();
  await backoff();
  expect(Date.now() - before).toBeGreaterThanOrEqual(1000);
  expect(Date.now() - before).toBeLessThan(1100);

  before = Date.now();
  await backoff();
  expect(Date.now() - before).toBeGreaterThanOrEqual(2000);
  expect(Date.now() - before).toBeLessThan(2100);

  before = Date.now();
  await backoff();
  expect(Date.now() - before).toBeGreaterThanOrEqual(4000);
  expect(Date.now() - before).toBeLessThan(4100);
});

it('never backs off for more than `max` ms', async () => {
  const backoff = createBackoff({ max: 2000 });

  let before = Date.now();
  await backoff();
  expect(Date.now() - before).toBeGreaterThanOrEqual(1000);
  expect(Date.now() - before).toBeLessThan(1100);

  before = Date.now();
  await backoff();
  expect(Date.now() - before).toBeGreaterThanOrEqual(2000);
  expect(Date.now() - before).toBeLessThan(2100);

  before = Date.now();
  await backoff();
  expect(Date.now() - before).toBeGreaterThanOrEqual(2000);
  expect(Date.now() - before).toBeLessThan(2100);
});

it('accepts `initial` as the initial back off time', async () => {
  const backoff = createBackoff({ initial: 10 });

  let before = Date.now();
  await backoff();
  expect(Date.now() - before).toBeGreaterThanOrEqual(10);
  expect(Date.now() - before).toBeLessThan(20);

  before = Date.now();
  await backoff();
  expect(Date.now() - before).toBeGreaterThanOrEqual(20);
  expect(Date.now() - before).toBeLessThan(30);

  before = Date.now();
  await backoff();
  expect(Date.now() - before).toBeGreaterThanOrEqual(40);
  expect(Date.now() - before).toBeLessThan(50);
});

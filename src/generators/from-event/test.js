const EventEmitter = require('events')
const fromEvent = require('.')
const take = require('../take')
const sleep = require('../../timing/sleep')
const compose = require('../compose')
const consume = require('../consume')

class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter()

async function emitEvents() {
  emitter.emit('foo', 1)
  emitter.emit('foo', 2)
  emitter.emit('foo', 3)
}

it('returns a generator that generates a new value for every listened event', async () => {
  const gen = take(2, fromEvent('foo', emitter))
  let output = []

  async function consumeEvents() {
    output = await consume(gen)
  }

  await Promise.all([consumeEvents(), emitEvents()])

  expect(output).toEqual([1, 2])
})

it('is composable', async () => {
  const gen = compose(fromEvent('foo', emitter), take(2))
  let output = []

  async function consumeEvents() {
    output = await consume(gen)
  }

  await Promise.all([consumeEvents(), emitEvents()])

  expect(output).toEqual([1, 2])
})

it('works with a generator faster than consumer', async () => {
  const gen = compose(fromEvent('foo', emitter), take(2))
  const output = []

  async function emitEvents() {
    emitter.emit('foo', 1)
    await sleep(1)
    emitter.emit('foo', 2)
    await sleep(1)
    emitter.emit('foo', 3)
  }

  async function consumeEvents() {
    for await (let event of gen) {
      await sleep(2)
      output.push(event)
    }
  }

  await Promise.all([consumeEvents(), emitEvents()])

  expect(output).toEqual([1, 2])
})

it('works with a generator slower than consumer', async () => {
  const gen = compose(fromEvent('foo', emitter), take(2))
  const output = []

  async function emitEvents() {
    emitter.emit('foo', 1)
    await sleep(2)
    emitter.emit('foo', 2)
    await sleep(2)
    emitter.emit('foo', 3)
  }

  async function consumeEvents() {
    for await (let event of gen) {
      await sleep(1)
      output.push(event)
    }
  }

  await Promise.all([consumeEvents(), emitEvents()])

  expect(output).toEqual([1, 2])
})

it('throws TypeError if emitter does not implement EventTarget interface', async () => {
  await expect(fromEvent('foo', {}).next()).rejects.toThrow(TypeError)
  await expect(fromEvent('foo', null).next()).rejects.toThrow(TypeError)
  await expect(fromEvent('foo', 1).next()).rejects.toThrow(TypeError)

  expect(fromEvent('foo', { on() {} }).next()).toBeInstanceOf(Promise)
  expect(fromEvent('foo', { addEventListener() {} }).next()).toBeInstanceOf(
    Promise
  )
})

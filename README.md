![hourglass.js logo](https://raw.githubusercontent.com/caiogondim/hourglass.js/master/media/banner-minimal-dark-mode.svg#gh-dark-mode-only)
![hourglass.js logo](https://raw.githubusercontent.com/caiogondim/hourglass.js/master/media/banner-minimal-light-mode.svg#gh-light-mode-only)

# hourglass.js

## Table of Contents

### Async

- until
- inspectable
- retry
- delay
<!-- - cancelable 🚧 -->
- lazy
- promisify
- estimatedTimeOfArrival
- speedBump
- timeWindow
- frequency
<!-- - ? mutex 🚧 -->
- timeout
- concurrent
- backoff

<!-- - slowStart 🚧 -->
<!-- - inverted backoff -->

  <!-- - promiseWithResolvers -->
<!--   - polyfill from TC39 proposal -->

<!-- ### Iterables (Generators, Arrays, ...) -->
<!---->
<!-- - distinct 🚧 -->
<!--   - use hash as key -->
<!--   - must be serializable -->
<!-- - tee 🚧 -->
<!-- - delay 🚧 -->
<!-- - observe 🚧 -->
<!-- - playback 🚧 -->
<!-- - tap 🚧 -->
<!-- - roundRobin 🚧 -->
<!--     - interleave https://more-itertools.readthedocs.io/en/stable/api.html#more_itertools.interleave -->
<!-- - unique (distinct) 🚧 -->
<!-- - zip 🚧 -->
<!-- - collect 🚧 -->
<!-- - observe 🚧 -->
<!-- - drop -->
<!-- - dropWhile -->
<!-- - takeWhile -->
<!-- - chunk -->
<!-- - count -->
<!-- - slidingWindow -->
<!--     - https://more-itertools.readthedocs.io/en/stable/api.html#more_itertools.sliding_window -->
<!-- - distribute -->
<!--     - https://more-itertools.readthedocs.io/en/stable/api.html#more_itertools.distribute -->
<!--     - distribute into other generators -->
<!-- - padStart -->
<!-- - padEnd -->
<!-- - unique -->
<!-- - flatten -->
<!-- - min -->
<!-- - max -->
<!-- - first -->
<!-- - last -->
<!-- - nth -->
<!-- - sieve -->

### Async Iterables (Streams, Web Streams, Async Generators, ...)

<!-- - intoAsyncGenerator 🚧 -->

<!-- - distinct 🚧 -->
  <!-- - accepts a serializer argument -->

- filter
- map
- reduce
- delay
<!-- - remember -->
- pipe
- some
<!-- - find -->
- every
- flatMap
- drop
- dropWhile
- take
- enumerate
- item
- last
- roundRobin
- unique
- zip
- collect
- first
- throttle
- debounce
- merge
- skip
- chain
- catch

<!-- - periodic -->
<!-- https://github.com/staltz/xstream?tab=readme-ov-file#periodic -->

## Async

### `until`

Returns a promise that is resolved once the `predicate` function returns a truthy value, or is rejected if `predicate` don't reuturn a truthy value before `timeout`.

#### Arguments

- `predicate: () => boolean`
- `options`
  - `options.timeout: number`
  - `options.interval: number`

#### Returns

`Promise<void>`

#### Example

```js
async function isElementMounted(selector) {
  return Boolean(document.querySelector(selector))
}

await until(isElementMounted)
```

### `inspectable`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

### `retry`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

### `delay`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

### `lazy`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

### `promisify`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

### `estimatedTimeOfArrival`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

### `speedBump`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

### `timeWindow`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

### `frequency`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

### `timeout`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

### `concurrent`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

### `backoff`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### `reduce`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

```
a:         🔴 --> 🟠 --> 🟡 --> 🟢 --> 🔵 --> 🟣 --> 🏁

reduce(a): ---------------------------------> ⚪ --> 🏁
```

### Async Iterables

<!-- #### `remember` -->

<!-- Reference: https://github.com/staltz/xstream#-remember -->

#### `filter`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### `map`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### `reduce`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### `delay`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### `some`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### `every`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### `flatMap`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### `drop`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### `dropWhile`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### `enumerate`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### `item`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### `last`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### `roundRobin`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### `unique`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### `collect`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### `first`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### `throttle`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### `debounce`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### `merge`

```
a:           🔴 ----------------> 🟠 ---------> 🟡 --> 🏁

b:           -----> 🟢 --> 🔵 ---------> 🟣 ---------> 🏁

merge(a, b): 🔴 --> 🟢 --> 🔵 --> 🟠 --> 🟣 --> 🟡 --> 🏁
```

Example:

```js
const merged = merge(a, b)
await collect(merged) // => ['🔴', '🟢', '🔵', '🟠', '🟣', '🟡']
```

#### `zip`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

```
a:          🔴 ---------> 🟠 ---------> 🟡 --> 🏁

b:          🟢 ---------> 🔵 ---------> 🟣 --> 🏁

zip(a, b):  🔴 ---------> 🟠 ---------> 🟡 --> 🏁
            🟢            🔵            🟣
```

#### `take`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

```
a:           🔴 --> 🟠 --> 🟡 --> 🟢 --> 🔵 --> 🟣 --> 🏁

take(3, a):  🔴 --> 🟠 --> 🟡 --> 🏁
```

#### `skip`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

```
a:           🔴 --> 🟠 --> 🟡 --> 🟢 --> 🔵 --> 🟣 --> 🏁

skip(2, a):  ------------> 🟡 --> 🟢 --> 🔵 --> 🟣 --> 🏁
```

#### `chain`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

```
a:            🔴 --> 🟠 --> 🟡 --> 🏁

b:            🟢 --> 🔵 --> 🟣 --> 🏁

chain(a, b):  🔴 --> 🟠 --> 🟡 --> 🟢 --> 🔵 --> 🟣 --> 🏁
```

#### `pipe`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

```js
const pipeline = pipe(
  (gen) => filter((x) => x % 2 === 0, gen),
  (gen) => map((x) => x * 2, gen),
)
await collect(pipeline(integers)) // => [2, 6, 10, 14]
```

#### `catch`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

<!---->
<!-- ## Reference -->
<!---->
<!-- - https://docs.rs/futures/0.1.31/futures/stream/trait.Stream.html#method.zip -->
<!---->
<!-- Design reference -->
<!---->
<!-- - https://medium.com/@jshvarts/read-marble-diagrams-like-a-pro-3d72934d3ef5 -->

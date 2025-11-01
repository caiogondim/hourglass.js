# @hourglass/every

Tests whether all elements in an async iterable pass the test implemented by the provided predicate function.

## Installation

```bash
npm install @hourglass/every
```

## Usage

```js
import { every } from '@hourglass/every'

async function* generateNumbers() {
  yield 2
  yield 4
  yield 6
  yield 8
}

// Check if all numbers are even
const allEven = await every(generateNumbers(), (n) => n % 2 === 0)
console.log(allEven) // => true

// Check if all numbers are greater than 5
const allGreaterThan5 = await every(generateNumbers(), (n) => n > 5)
console.log(allGreaterThan5) // => false
```

## API

### `every(gen, predicate)`

Tests whether all elements in the async iterable pass the test implemented by the provided predicate function.

#### Parameters

- `gen: AsyncIterable<T>` - An async iterable to test
- `predicate: (value: T) => boolean` - A function to test each element. Returns `true` to indicate the element passes the test, `false` otherwise.

#### Returns

`Promise<boolean>` - A promise that resolves to `true` if the predicate returns `true` for all elements, `false` otherwise.

#### Behavior

- The function iterates through the async iterable and tests each value with the predicate
- Returns `false` immediately when the predicate returns `false` for any element (short-circuits)
- Returns `true` if all elements pass the test or if the iterable is empty

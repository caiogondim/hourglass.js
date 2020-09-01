const pipe = require('./')

it('passes previous step output as current step input', async () => {
  function filterEven(numbers) {
    return numbers.filter((number) => number % 2 !== 0)
  }

  function filterMultipleOfThree(numbers) {
    return numbers.filter((number) => number % 3 !== 0)
  }

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const output = await pipe(numbers, filterEven, filterMultipleOfThree)

  expect(output).toEqual([1, 5, 7])
})

it('consumes generator before passing it to next step', async () => {})

it('works with async steps', async () => {})

it('works as a generator if all steps are generators', async () => {})

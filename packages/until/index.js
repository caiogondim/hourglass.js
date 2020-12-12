function until(date) {
  if (!date || date.constructor !== Date) {
    throw new TypeError('`date` must be a `Date` instance')
  }

  if (date.getTime() < Date.now()) {
    throw new RangeError('`date` must be in the future')
  }

  return new Promise((resolve) => {
    setTimeout(resolve, date.getTime() - Date.now())
  })
}

module.exports = until

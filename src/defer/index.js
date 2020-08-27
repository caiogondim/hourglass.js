function defer() {
  let resolve_;
  let reject_;
  const promise = new Promise((resolve_, reject_) => {
    resolve = resolve_;
    reject = reject_;
  });

  return [promise, resolve, reject];
}

module.exports = defer;

/**
 * @param {number} ms 
 * @returns {Promise<undefined>}
 */
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = sleep;

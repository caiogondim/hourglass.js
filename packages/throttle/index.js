// class TokenBucket {
//   constructor({ capacity, fillInterval }) {
//     this._capacity = capacity
//     this._tokens = capacity
//     this._fillInterval = fillInterval
//     this._interval = null
//   }

//   _refill() {
//     this._tokens = this._capacity
//   }

//   init() {
//     if (this._interval !== null) {
//       throw new TypeError('TokenBucket was already initialized')
//     }

//     this._interval = setInterval(() => {
//       this._refill()
//     }, this._fillInterval)
//   }

//   async take(tokens) {
//     if (tokens > this._capacity) {
//       throw new TypeError(`Can't get more tokens than max capacity of bucket`)
//     }

//   }
// }

// async function* throttle(gen, bps) {

// }

// module.exports = throttle

const array = [1, 2, 3, 'lorem', 4, 5, 'ipsum']
const arraySerialized = JSON.stringify(array)
const buffer = Buffer.from(arraySerialized)
console.log(JSON.parse(buffer.toString('utf8')))

// serialize -> throttle (bps) -> unserialize
// when unserialize, keep buffering until an end symbol is received
// when it's received, buffer to string, json parse

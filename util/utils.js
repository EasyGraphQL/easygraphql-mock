const Chance = require('chance')

const chance = new Chance(12)

function randomNumber(min, max) {
  return chance.integer({ min, max })
}

module.exports = { randomNumber }

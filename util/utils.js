const Chance = require("chance");

const chance = new Chance(123);

function randomNumber(min, max) {
  return chance.integer({ min, max });
}

module.exports = { randomNumber };

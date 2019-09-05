const chance = require("./chance");

function randomNumber(min, max) {
  return chance.integer({ min, max });
}

module.exports = { randomNumber };

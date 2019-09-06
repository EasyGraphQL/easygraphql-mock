const settings = require('../lib/settings')

const Chance = require('chance')

const chance = settings.seed ? new Chance(settings.seed) : new Chance()

module.exports = chance

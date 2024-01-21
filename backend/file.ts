const Decimal = require('decimal.js');

const originalLevel = new Decimal(12.23);
const roundedLevel = originalLevel.toDecimalPlaces(2);
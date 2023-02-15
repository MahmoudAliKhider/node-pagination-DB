const { faker } = require("@faker-js/faker");

module.exports = new function generateFakerColors() {
    const size = [];
    for (var f = 1; f <= 3; f++) {
      size.push({
        sizes:faker.helpers.arrayElement(['small','medium', 'large', 'X-large']),
      });
    }
    return size;
  }
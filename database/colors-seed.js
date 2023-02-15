const { faker } = require("@faker-js/faker");

module.exports = new function generateFakerColors() {
    const color = [];
    for (var f = 1; f <= 5; f++) {
      color.push({
        colors:faker.color.human(),
      });
    }
    return color;
  }
const { faker } = require("@faker-js/faker");
const color = require("./colors-seed");
const size = require("./size-seed");
module.exports = new (function generateFakerProducts() {
  const products = [];
  for (var f = 1; f <= 1000; f++) {
    products.push({
      title: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      colors: color,
      sizes : size
    });
  }
  return products;
})();

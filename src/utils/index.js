/**
 * This function calculates the total price of a new order
 * @param {Array} products cartProduct: Array of products
 * @returns {Number} total: Total price of all products
 */
const totalPrice = (products) => {
  let total = 0;
  products.forEach((product) => (total += product.price));
  return total;
};

export { totalPrice };
